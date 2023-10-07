<template>
  <div
    class="container ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500 w-[80%] flex justify-around items-center mx-auto my-[2%]"
    v-show="!recordStartFlag"
  >
    <ParadigmSelector />
    <StimulusParamSetter />
    <el-button type="primary" round>
      <router-link class="text-black" to="/brainprintrecord2" target="_blank"
        >开启脑电界面</router-link
      >
    </el-button>
    <div>
      <div class="text-white">开始实验</div>
      <el-switch
        :disabled="curParadigm === ''"
        v-model="start"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      />
    </div>

    <!-- <a-statistic-countdown
      :value="deadline"
      style="margin-left: 50px"
      @finish="onFinish"
      :value-style="{ color: '#3f8600' }"
    /> -->
  </div>

  <a-statistic-countdown
    :value="startRecordDeadline"
    class="ml-[45vw] mr-[45vw] mt-[25vh] scale-[2.5]"
    @finish="onRecordCountdownFinish"
    :value-style="{ color: '#3f8600' }"
    v-show="startRecordCountDownShowFlag"
  />


  <RsvpStimulus v-if="curParadigm === 'rsvp'" />
  <MiStimulus v-if="curParadigm === 'mi'" />
  <SSVEPStimulusWithRelax v-if="curParadigm === 'ssvep'" />
  <MixStimulusWithRelax v-if="curParadigm === 'mixStimulus'" />
  <RelaxStimulus v-if="curParadigm === 'relax'" />
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { ElMessage, ElLoading } from "element-plus";
import RsvpStimulus from "@/components/Stimulus/RsvpStimulus.vue";
import MiStimulus from "@/components/Stimulus/MiStimulus.vue";
// import SSVEPStimulus from '@/components/Stimulus/SSVEPStimulus40.vue';
import SSVEPStimulusWithRelax from "@/components/Stimulus/SSVEPStimulusWithRelax.vue";
import ParadigmSelector from "@/components/ParadigmSelector.vue";
import { startRecordApi,stopRecordApi,bcigoApi } from "@/api/experiment";
import MixStimulusWithRelax from "@/components/Stimulus/MixStimulus/MixStimulusWithRelax.vue";
import StimulusParamSetter from "@/components/Stimulus/StimulusParamSetter.vue";
import RelaxStimulus from "@/components/Stimulus/RelaxStimulus.vue";
const store = useStore();

const stimulusTime = computed(() => {
  let duration: number = 5 * 60 * 1000;
  if (curParadigm.value === "rsvp") {
    duration = store.getters.rsvpAllTime;
  } else if (curParadigm.value === "ssvep") {
    duration = store.getters.ssvepAllTime;
  } else if (curParadigm.value === "mi") {
    duration = store.getters.miAllTime;
  } else if (curParadigm.value === 'mixStimulus'){
    duration = store.getters.mixStimulusAllTime
  } else if (curParadigm.value === 'relax'){  
    duration = store.getters.relaxAllTime
  }

  return duration;
});

const curParadigm = computed(() => {
  return store.state.paradigm;
});

const recordStartFlag = computed(() => {
  return store.state.recordStartFlag 
});

// const stimulusTime = computed(() => {
//   let duration: number = 5 * 60 * 1000;
//   if (curParadigm.value === "rsvp") {
//     duration = store.getters.rsvpAllTime;
//   } else if (curParadigm.value === "ssvep") {
//     duration = store.getters.ssvepAllTime;
//   } else if (curParadigm.value === "mi") {
//     duration = store.getters.miAllTime;
//   } else if (curParadigm.value === 'mixStimulus'){
//     duration = store.getters.mixStimulusAllTime
//   } else if (curParadigm.value === 'relax'){
//     duration = store.getters.relaxAllTime
//   }

//   return duration;
// });

const start = ref(false);

// const onFinish = () => {
//   console.log("finish");
// };
// const deadline = ref(Date.now() + 1000 * 0);

const startRecordDeadline = ref(Date.now() + 1000 * 0)
const startRecordCountDownShowFlag = ref(false)

const onRecordCountdownFinish = ()=>{
  startRecordCountDownShowFlag.value = false
}

const startRecord = async() => {

  const waitExperimentStartTime = 5 * 1000
  startRecordCountDownShowFlag.value = true
  startRecordDeadline.value = Date.now() + waitExperimentStartTime
  
  await new Promise((res)=>{
    setTimeout(res,waitExperimentStartTime)
  })
  
  startRecordApi()
  .then((res)=>{
    ElMessage({
      message: "开始采集脑电数据",
      type: "success",
    });
  })
  .catch(function (error: any) {
    ElMessage({
      message: error,
      type: "error",
    });
  });
    
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });

  setTimeout(() => {
    loading.close();
  }, 200);

  
  bcigoApi()

  store.commit("startRecord");
  setTimeout(()=>{
    store.commit("stopRecord");
  },stimulusTime.value)
};

watch(start, async (newstatus, oldstatus) => {
  if (oldstatus === false && newstatus === true) {
    startRecord();
    start.value = true;
  } else if (oldstatus === true && newstatus === false) {
    localStorage.clear();
    sessionStorage.clear();
    store.commit("stopRecord");
    start.value = false;
  }
});

watch(
  recordStartFlag,
  async (newStstus) => {
    if (!newStstus) {
      start.value = false;
      // const closeDeviceUrl = "/api/closeBCI";
      // await http
      //   .get(closeDeviceUrl)

      stopRecordApi()
      .then((res)=>{
        const loading = ElLoading.service({
          lock: true,
          text: "正在保存脑纹数据，请休息！",
          background: "rgba(0, 0, 0, 0.7)",
        });

        setTimeout(() => {
          loading.close();
        }, 10000);
      })
      .catch((error)=>{
        console.log(error)
      })

    }
  },
);
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
