<template>
	<RelaxStatus v-if="relaxStartFlag" :relaxTime="relaxTime" />
	<MixStimulus
		:mixStimulusMultiTrialsStartFlag="mixStimulusMultiTrialsStartFlag"
	/>
</template>

<script lang="ts" setup>
import MixStimulus from '@/components/Stimulus/MixStimulus/MixStimulus.vue';
import RelaxStatus from '@/components/Stimulus/RelaxStatus.vue';

import { Ref, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const mixStimulusMultiTrialsStartFlag: Ref<boolean> = ref(false);
const relaxStartFlag: Ref<boolean> = ref(false);

const stimulusStartFlag: Ref<boolean> = computed(() => {
	return (
		store.state.recordStartFlag && store.state.curParadigm === 'mixStimulus'
	);
});

const mixStimulusAllTrials: Ref<number> = computed(() => {
	return store.state.mixStimulusAllTrials;
});
const mixStimulusOneTrialTime: Ref<number> = computed(() => {
	return store.getters.mixStimulusOneTrialTime;
});

const relaxTime = ref<number>(10);
const startExperiment = async () => {
	for (let i = 0; i < mixStimulusAllTrials.value; i++) {
		if (i !== 0) {
			// 休息10s
			relaxTime.value = 10;
			relaxStartFlag.value = true;

			await new Promise((resolve) => {
				setTimeout(resolve, 10000);
			});

			relaxStartFlag.value = false;
		}

		//  mixStimulus 开始
		mixStimulusMultiTrialsStartFlag.value = true;

		await new Promise((resolve) => {
			setTimeout(resolve, mixStimulusOneTrialTime.value);
		});

		mixStimulusMultiTrialsStartFlag.value = false;
	}
};
watch(stimulusStartFlag, (newStatus) => {
	if (newStatus === true) {
		startExperiment();
	}
});
</script>
