<template>
  <el-card class="card">
    <!-- <div ref="chart" class="mychart ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500  ml-[1vw]"></div> -->
    <div ref="chart" class="mychart"></div>
  </el-card>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { getBciWaveDataApi } from '@/api/bciwave'
import { ref, Ref, watch, onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const exclude_channels = ["X1", "X2", "X3", "CM", "A1", "A2"];
const channels =
  "P3,C3,F3,Fz,F4,C4,P4,Cz,CM,A1,Fp1,Fp2,T3,T5,O1,O2,X3,X2,F7,F8,X1,A2,T6,T4"
    .split(",")
    .filter((channel) => {
      return !exclude_channels.includes(channel);
    });
const chart = ref(null);

const signals = ref();

const stopFlag = ref(false);
const end = ref(0);
const windowWidth = ref((window.innerWidth * 0.7).toString() + "px");
const windowHeight = ref((window.innerHeight * 0.66).toString() + "px");

let myChart: any = null;
let getData: any = null;

const signalLength = 500;

const initChart = () => {
  const chartDom = chart.value;

  myChart = echarts.init(chartDom);

  signals.value = [];
  for (let i = 0; i < channels.length; i++) {
    signals.value.push([]);
  }

  // data=[1,0,-1,1,2,6]
  for (let i = 0; i < signalLength; i++) {
    for (let j = 0; j < channels.length; j++) {
      signals.value[j].push(0.5 + j * 1);
    }
  }

  let series = [];
  for (let i = 0; i < channels.length; i++) {
    series.push({
      name: channels[i],
      type: "line",
      showSymbol: false,
      hoverAnimation: false,
      data: signals.value[i],
      tooltip: { trigger: "item" },
    });
  }

  let option = {
    grid: {
      top: 10,
      bottom: 10,
      left: 50,
      right: 50,
    },
    tooltip: {},
    xAxis: {
      show: false,
      type: "category",
      min: 0,
      max: signalLength,
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      show: true,
      type: "value",
      min: -0.5,
      max: channels.length * 1 + 1,
      interval: 1,
      axisLabel: {
        formatter: function (value: string, index: number) {
          let texts = [];
          if (index >= 1) {
            texts.push(channels[index - 1]);
          }
          return texts;
        }.bind(this),
        fontSize: 20,
        color: "#fff",
      },
      splitLine: {
        show: false,
      },
    },
    series: series,
  };
  myChart.setOption(option);
};
const waitExperimentStart = async () => {
  while (!isExperimentStartFrontend) {
    console.log("实验还未开始");
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  startBCI();
};

const getD = async () => {
  getBciWaveDataApi().then((data)=>{

    const brainData = data.data;
    // console.log(brainData)
    const update_len = brainData[0].length;
    if (update_len <= 1) {
      throw new Error("no data received!");
    }
    for (let j = 0; j < channels.length; j++) {
      signals.value[j] = signals.value[j].slice(update_len, signalLength);
      signals.value[j] = signals.value[j].concat(brainData[j]);
    }
    end.value += brainData[0].length;
    let series = [];
    for (let j = 0; j < channels.length; j++) {
      series.push({
        name: channels[j],
        type: "line",
        showSymbol: false,
        hoverAnimation: false,
        data: signals.value[j],
        tooltip: { trigger: "item" },
      });
    }
    myChart.setOption({
      series: series,
    });
  }).catch((error)=>{
    console.log(error);
  })
};
const startBCI = () => {
  getData = setInterval(() => {
    getD();
  }, 500);
};
const stopBCI = () => {
  clearInterval(getData);
};

watch(stopFlag, (newFlag, oldFlag) => {
  if (newFlag === true && oldFlag === false) {
    stopBCI();
  } else if (newFlag === false && oldFlag === true) {
    startBCI();
  }
});

const isExperimentStartFrontend = computed(() => {
  return store.state.experimentStartFlag;
});
onMounted(() => {
  initChart();
  waitExperimentStart();
  window.addEventListener("resize", () => {
    windowWidth.value = (window.innerWidth * 0.66).toString() + "px";
    windowHeight.value = (window.innerHeight * 0.7).toString() + "px";
    myChart.resize();
  });
});
</script>

<style scoped>
.mychart {
  height: 70vh;
  width: 55vw;
}
.card {
  background-color: transparent;
  width: 60vw;
}
</style>
