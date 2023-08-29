<template>

    <el-row>
      <el-col
        :span="8"
        :offset="2"
      >
        <el-card :body-style="{ padding: '0px', height: '70vh' ,display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}">
          
          <div style="padding: 14px">
            <span>请注意以下目标</span>
          </div>
          <img v-for="(image, index) in images" :key="index" :src="image" :style="getStyle1(index)" class="img1"/>
        </el-card>
      </el-col>

      <el-col
        :span="8"
        :offset="4"
      >
        <el-card :body-style="{ padding: '0px', height: '70vh' ,display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}">
          
          <div style="padding: 14px">
            <span>刺激呈现区</span>
          </div>
          <a-statistic-countdown
            title="Countdown"
            :value="deadline"
            :style="{display: countdown_flag === true? 'block': 'none'}"
            @finish="onCountdownFinish"
          />
          <img v-for="(image, index) in images" :key="index" :src="image" :style="getStyle2(index)" class="img2"/>
        </el-card>
      </el-col>
    </el-row>


</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';

import { useStore } from 'vuex';

const store = useStore()

const images = ref([]);

const getImg = async ()=>{
  for (let i=0;i<1000;i++){
    images.value.push(new URL(`/src/assets/images/rsvp/${i}.jpg`, import.meta.url).href)
  }
}


let targetIndex = ref(0);
let currentIndex = ref(2);
let rsvp_show = ref(false)
let deadline = Date.now() + 1000 * 10;
let countdown_flag = ref(false)


const onCountdownFinish = () =>{
  countdown_flag.value = false
}
const startSession = async(session)=>{
  deadline = Date.now() + 1000 * 10;
  countdown_flag.value = true;

  while(countdown_flag.value){
    await new Promise((resolve)=>setTimeout(resolve,10))
  }

  rsvp_show.value = true;

  for (let i = 0; i < 200 * (session+1); i++) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    currentIndex.value++;
    if(stimulusStartFlag.value === false){
      return
    }
  }

  rsvp_show.value = false;
}
const startExperiment = async()=>{
  for(let session = 0;session < 5;++session){
    console.log('session:',session)
    if(stimulusStartFlag.value === false){
      targetIndex.value = 0
      currentIndex.value = 0
      countdown_flag.value = false
      rsvp_show.value = false

      return
    }
    await startSession(session)
    targetIndex.value += 199
  }
  currentIndex.value = 0
  // 因为识别和验证都有可能打开脑电，所以都关一下
  store.commit('closeRecordPredict')
  store.commit('closeRecordValid')
}
const stimulusStartFlag = computed(()=>{
  return store.state.recordStartFlag || store.state.recordValidStartFlag || store.state.recordPredictStartFlag
})

watch(stimulusStartFlag, (newstatus) =>{
  if(newstatus === true){
    startExperiment()
  }
}
)
const getStyle1 = (index) => {
  return {
    display: index === targetIndex.value? 'block' : 'none',
  };
};

const getStyle2 = (index) => {
  return {
    display: ((index === currentIndex.value) && rsvp_show.value) ? 'block' : 'none',
  };
};

onMounted(async () => {
  await getImg()
})
</script>


<style>
.img1{
  width: 70%;
  height: 85%;
}
.img2{
  width: 70%;
  height: 85%;
}
</style>