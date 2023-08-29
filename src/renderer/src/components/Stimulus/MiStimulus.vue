<template>

    <el-row>
      <el-col
        :span="5"
        :offset="1"
      >
        <el-card :body-style="{ padding: '0px', height: '70vh' ,display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}">
          
          <div style="padding: 14px" v-if="mi_show && stimulusStartFlag && currentIndex === 0">
            <span>请想象左手</span>
          </div>
          <img  :src="leftHand" v-if="currentIndex==0 && mi_show"  class="img0"/>
        </el-card>
      </el-col>

      <el-col
        :span="6"
        :offset="3"
      >
        <el-card :body-style="{ padding: '0px', height: '70vh' ,display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}">
          
          <div style="padding: 14px" v-if="!mi_show && stimulusStartFlag && !imageine_flag">
            <span>休息2s</span>
          </div>
          <a-statistic-countdown
            title="Countdown"
            :value="deadline"
            :style="{display: countdown_flag === true? 'block': 'none'}"
            @finish="onCountdownFinish"
          />
          
          <img :src="ten" v-if="!mi_show && stimulusStartFlag && imageine_flag" class="img2"/>
        </el-card>
      </el-col>

      <el-col
        :span="5"
        :offset="3"
      >
        <el-card :body-style="{ padding: '0px', height: '70vh' ,display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}">
          
          <div style="padding: 14px" v-if="mi_show && stimulusStartFlag && currentIndex === 1">
            <span>请想象右手</span>
          </div>

          <img :src="rightHand" v-if="currentIndex===1 && mi_show" class="img1"/>
        </el-card>
      </el-col>
    </el-row>


</template>

<script setup>
import { ref, watch, computed } from 'vue';

import { useStore } from 'vuex';
import leftHand from '@/assets/images/mi/left.png'
import rightHand from '@/assets/images/mi/right.png'
import ten from '@/assets/images/mi/ten.png'
const store = useStore()


// 0 or 1
let currentIndex = ref(1);
let mi_show = ref(false)
let deadline = ref(Date.now() + 1000 * 10);
let countdown_flag = ref(false)
let imageine_flag = ref(false)

const onCountdownFinish = () =>{
  countdown_flag.value = false
}
const startSession = async(session)=>{


  for (let i = 0; i < 30 * (session+1); i++) {
    // 任务提示 2s
    currentIndex.value = Math.round(Math.random());
    mi_show.value = true
    await new Promise((resolve)=>setTimeout(resolve,2000))
    mi_show.value = false

    // 运动想象 4s
    imageine_flag.value = true
    await new Promise((resolve)=>setTimeout(resolve,4000))
    imageine_flag.value = false

    // 休息两秒
    deadline.value = Date.now() + 1000 * 2;
    countdown_flag.value = true;

    while(countdown_flag.value){
        await new Promise((resolve)=>setTimeout(resolve,10))
    }


    // 如果实验停止了
    if(stimulusStartFlag.value === false){
      return
    }
  }

  mi_show.value = false;
}
const startExperiment = async()=>{
  for(let session = 0;session < 5;++session){
    console.log('session:',session)
    if(stimulusStartFlag.value === false){
      currentIndex.value = 0
      countdown_flag.value = false
      mi_show.value = false

      return
    }
    await startSession(session)
  }
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


</script>


<style>
.img0{
  width: 70%;
  height: 85%;
}
.img1{
  width: 70%;
  height: 85%;
}
.img2{
  width: 70%;
  height: 85%;
}
</style>