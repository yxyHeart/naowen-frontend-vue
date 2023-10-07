<template>
  <RelaxStatus v-if="relaxStartFlag" />
  <SSVEPStimulus v-if="ssvepStartFlag" />
  <TeethStimulus v-if="teethStartFlag" />
  <EyeStimulus v-if="eyeStartFlag" />
  <RsvpStimulus v-if="rsvpStartFlag" />
</template>

<script lang="ts" setup>
import RsvpStimulus from "@/components/Stimulus/RsvpStimulusShort.vue";
// import RsvpStimulus from "@/components/Stimulus/P300Speller.vue";
import SSVEPStimulus from "@/components/Stimulus/SSVEPStimulus9.vue";
import RelaxStatus from "@/components/Stimulus/RelaxStatus.vue";
import TeethStimulus from "./TeethStimulus.vue";
import EyeStimulus from "./EyeStimulus.vue";
import { Ref, ref, computed, watch, toRef } from "vue";
import { useStore } from "vuex";

const props = defineProps(["mixStimulusMultiTrialsStartFlag"]);
const mixStimulusMultiTrialsStartFlag = toRef(props, "mixStimulusMultiTrialsStartFlag");

const store = useStore();
const ssvepStartFlag: Ref<boolean> = ref(false);
const teethStartFlag: Ref<boolean> = ref(false);
const eyeStartFlag: Ref<boolean> = ref(false);
const rsvpStartFlag: Ref<boolean> = ref(false);
const relaxStartFlag: Ref<boolean> = ref(false);



const stimulusStartFlag: Ref<boolean> = computed(() => {
  return mixStimulusMultiTrialsStartFlag.value;
});

const checkIsExperimentStop = (flag: Ref<boolean>, delayTime: number) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (!flag.value) {
        clearInterval(interval);
        reject(new Error("实验已关闭！"));
      }
    }, 100); // 每100ms检查一次
    setTimeout(() => {
      clearInterval(interval); // 清除 interval
      resolve("success");
    }, delayTime); // 3000ms后自动 resolve
  });
};
const startExperiment = async () => {
  const n_trial = store.state.mixStimulusSsvepTrials;
  for (let i = 0; i < n_trial; i++) {
    // 休息1s
    // relaxStartFlag.value = true
    // try{
    //     await Promise.race([
    //                     new Promise((resolve)=>{setTimeout(resolve, 1000)}),
    //                     checkIsExperimentStop(stimulusStartFlag,1000)
    //                 ]
    //     )
    // }catch(error){
    //     relaxStartFlag.value = false
    //     console.log(error)
    //     return
    // }
    // relaxStartFlag.value = false

    // ssvep 开始
    ssvepStartFlag.value = true;
    
    try {
      await Promise.race([
        new Promise((resolve) => {
          setTimeout(resolve, 3000);
        }),
        checkIsExperimentStop(stimulusStartFlag, 3000),
      ]);
    } catch (error) {
      ssvepStartFlag.value = false;
      console.log(error);
      return;
    }

    ssvepStartFlag.value = false;
  }
  
    // 休息1s
  relaxStartFlag.value = true;
  try {
    await Promise.race([
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      }),
      checkIsExperimentStop(stimulusStartFlag, 1000),
    ]);
  } catch (error) {
    relaxStartFlag.value = false;
    console.log(error);
    return;
  }
  relaxStartFlag.value = false;

  // 咬牙开始
  for(let iter = 0;iter<3;++iter){
    teethStartFlag.value = true;
    try {
      await Promise.race([
        new Promise((resolve) => {
          setTimeout(resolve, 500);
        }),
        checkIsExperimentStop(stimulusStartFlag, 500),
      ]);
    } catch (error) {
      teethStartFlag.value = false;
      console.log(error);
      return;
    }
    teethStartFlag.value = false;
    if(iter!==2){
      
    }
    await new Promise((res)=>{
      setTimeout(res,500)
    })
  }


  // 眨眼开始
  // eyeStartFlag.value = true;
  // try {
  //   await Promise.race([
  //     new Promise((resolve) => {
  //       setTimeout(resolve, 1000);
  //     }),
  //     checkIsExperimentStop(stimulusStartFlag, 1000),
  //   ]);
  // } catch (error) {
  //   eyeStartFlag.value = false;
  //   console.log(error);
  //   return;
  // }
  // eyeStartFlag.value = false;

  // rsvp开始
  for(let iter=0;iter<2;++iter){

    rsvpStartFlag.value = true;
    try {
      await Promise.race([
        new Promise((resolve) => {
          setTimeout(resolve, 1250);
        }),
        checkIsExperimentStop(stimulusStartFlag, 1250),
      ]);
    } catch (error) {
      rsvpStartFlag.value = false;
      console.log(error);
      return;
    }
    rsvpStartFlag.value = false;

    if(iter==0){
      await new Promise((res)=>{
      setTimeout(res,500)
    })
    }
  }


  // if (recordValidStartFlag.value === true) {
  //   store.commit("closeRecordValid");
  // }
  // if (validStartFlag.value === true) {
  //   store.commit("stopValid");
  // }
};

watch(stimulusStartFlag, (newStatus) => {
  if (newStatus === true) {
    startExperiment();
  }
});
</script>
