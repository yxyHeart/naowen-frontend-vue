<template>
  <RelaxStatus v-if="relaxStartFlag" />
  <MixStimulus :mixStimulusMultiTrialsStartFlag="mixStimulusMultiTrialsStartFlag" />
</template>

<script lang="ts" setup>
import MixStimulus from "@/components/Stimulus/MixStimulus/MixStimulus.vue";
import RelaxStatus from "@/components/Stimulus/RelaxStatus.vue";

import { Ref, ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const mixStimulusMultiTrialsStartFlag: Ref<boolean> = ref(false);
const relaxStartFlag: Ref<boolean> = ref(false);

const stimulusStartFlag: Ref<boolean> = computed(() => {
  return (store.state.recordStartFlag || store.state.recordPredictStartFlag || store.state.recordValidStartFlag) && store.state.paradigm === "mixStimulus";
});


const checkIsExperimentStop = (flag: Ref<boolean>, delayTime: number) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (!flag.value) {
        clearInterval(interval);
        reject(new Error("实验已被手动关闭！"));
      }
    }, 100); // 每100ms检查一次
    setTimeout(() => {
      clearInterval(interval); // 清除 interval
      resolve("success");
    }, delayTime); // 3000ms后自动 resolve
  });
};
const mixTrials: Ref<number> = computed(() => {
  return store.state.mixStimulusAllTrials;
});
const mixStimulusOneTrialTime: Ref<number> = computed(() => {
  return store.getters.mixStimulusOneTrialTime;
});

const startExperiment = async () => {

  for (let i = 0; i < mixTrials.value; i++) {
    if (i !== 0) {
      // 休息10s
      relaxStartFlag.value = true;
      try {
        await Promise.race([
          new Promise((resolve) => {
            setTimeout(resolve, 10000);
          }),
          checkIsExperimentStop(stimulusStartFlag, 10000),
        ]);
      } catch (error) {
        relaxStartFlag.value = false;
        console.log(error);
        if (!stimulusStartFlag.value) {
          return;
        }
      }
      relaxStartFlag.value = false;
    }

    //  mixStimulus 开始
    mixStimulusMultiTrialsStartFlag.value = true;

    try {
      await Promise.race([
        new Promise((resolve) => {
          setTimeout(resolve, mixStimulusOneTrialTime.value);
        }),
        checkIsExperimentStop(stimulusStartFlag, mixStimulusOneTrialTime.value),
      ]);
    } catch (error) {
      mixStimulusMultiTrialsStartFlag.value = false;
      console.log(error);
      if (!stimulusStartFlag.value) {
        return;
      }
    }

    mixStimulusMultiTrialsStartFlag.value = false;
  }
};
watch(stimulusStartFlag, (newStatus) => {
  if (newStatus === true) {
    startExperiment();
  }
});
</script>
