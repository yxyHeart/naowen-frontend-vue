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

          <img v-for="(image, index) in images" :key="index" :src="image" :style="getStyle2(index)" class="img2"/>
        </el-card>
      </el-col>
    </el-row>


</template>

<script lang="ts" setup>

import { ref, watch, computed, onMounted, Ref,} from 'vue';

import { useStore } from 'vuex';

const store = useStore()

const images:Ref<string []> = ref([]);

const getImg = async ()=>{
  for (let i=0;i<1000;i++){
    images.value.push(new URL(`/src/assets/images/rsvp/${i}.jpg`, import.meta.url).href)
  }
}


const targetIndex = ref(0);
const currentIndex = ref(200);



const startExperiment = async()=>{
    const duration = (1 / store.state.mixStimulusRsvpFrequency) * 1000 
    let iterTimes = 3 * 1000 / duration
    console.log(duration,iterTimes)
    while(iterTimes>0){
        await new Promise((resolve)=>{
            setTimeout(resolve,duration)
        })
        currentIndex.value ++
        iterTimes --
    }
  
    // 因为识别和验证都有可能打开脑电，所以都关一下
    store.commit('closeRecordPredict')
    store.commit('closeRecordValid')
}


const getStyle1 = (index:number) => {
  return {
    display: index === targetIndex.value? 'block' : 'none',
  };
};

const getStyle2 = (index:number) => {
  return {
    display: index === currentIndex.value ? 'block' : 'none',
  };
};

onMounted(async () => {
    console.log(1)
  await getImg()
  startExperiment()
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