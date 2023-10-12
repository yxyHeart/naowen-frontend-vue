<template>
  <RelaxStatus v-if="relaxStartFlag" :relaxTime="relaxTime"/>
  <SSVEPStimulus v-if="ssvepStartFlag" />
  <TeethStimulus v-if="teethStartFlag" />
  <EyeStimulus v-if="eyeStartFlag" />
  <RsvpStimulus v-if="rsvpStartFlag" />
</template>

<script lang="ts" setup>
import RsvpStimulus from "@/components/Stimulus/RsvpStimulusShort.vue";
// import RsvpStimulus from "@/components/Stimulus/P300Speller.vue";
// import SSVEPStimulus from "@/components/Stimulus/SSVEPStimulus9.vue";
import SSVEPStimulus from "@/components/Stimulus/SSVEPStimulus4.vue";
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

const mixStimulusSsvepTrials = computed(()=>{
  return store.state.mixStimulusSsvepTrials
})
const mixStimulusTeethTrials = computed(()=>{
  return store.state.mixStimulusTeethTrials
})
const mixStimulusTeethDuration = computed(()=>{
  return store.state.mixStimulusTeethDuration
})
const mixStimulusRsvpTrials = computed(()=>{
  return store.state.mixStimulusRsvpTrials
})
const mixStimulusRsvpDuration = computed(()=>{
  return store.state.mixStimulusRsvpDuration
})

const relaxTime = ref<number>(1)
const startExperiment = async () => {
  for (let i = 0; i < mixStimulusSsvepTrials.value; i++) {
    // console.log(i)
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

    if(i===mixStimulusSsvepTrials.value-1) continue
    // 休息1s
    relaxTime.value = 1
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
  }
  
    // 休息1s
  relaxTime.value = 1
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
  for(let iter = 0;iter<mixStimulusTeethTrials.value;++iter){
    console.log(iter)
    teethStartFlag.value = true;
    try {
      await Promise.race([
        new Promise((resolve) => {
          setTimeout(resolve, mixStimulusTeethDuration.value * 1000);
        }),
        checkIsExperimentStop(stimulusStartFlag, mixStimulusTeethDuration.value * 1000),
      ]);
    } catch (error) {
      teethStartFlag.value = false;
      console.log(error);
      return;
    }
    teethStartFlag.value = false;

    if(iter === mixStimulusTeethTrials.value - 1) continue
    // 休息1s
    relaxTime.value = 1
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
  for(let iter=0;iter<mixStimulusRsvpTrials.value;++iter){

    rsvpStartFlag.value = true;
    try {
      await Promise.race([
        new Promise((resolve) => {
          setTimeout(resolve, mixStimulusRsvpDuration.value * 1000);
        }),
        checkIsExperimentStop(stimulusStartFlag, mixStimulusRsvpDuration.value * 1000),
      ]);
    } catch (error) {
      rsvpStartFlag.value = false;
      console.log(error);
      return;
    }
    rsvpStartFlag.value = false;

    // if(iter==0){
    //   await new Promise((res)=>{
    //   setTimeout(res,500)
    // })
    // }
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
