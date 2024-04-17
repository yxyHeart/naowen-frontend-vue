<template>
	<RelaxStatus v-if="relaxStartFlag" :relaxTime="relaxTime" />
	<SSVEPStimulus v-if="ssvepStartFlag" />
</template>

<script lang="ts" setup>
import SSVEPStimulus from '@/components/Stimulus/SSVEPStimulus9.vue';
import RelaxStatus from '@/components/Stimulus/RelaxStatus.vue';

import { Ref, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import sleep from '@/utils/sleep';

const store = useStore();
const ssvepStartFlag: Ref<boolean> = ref(false);
const relaxStartFlag: Ref<boolean> = ref(false);

const stimulusStartFlag: Ref<boolean> = computed(() => {
	return store.state.recordStartFlag && store.state.curParadigm === 'ssvep';
});

const checkIsExperimentStop = (flag: Ref<boolean>, delayTime: number) => {
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			if (!flag.value) {
				clearInterval(interval);
				reject(new Error('实验已被手动关闭！'));
			}
		}, 100); // 每100ms检查一次
		setTimeout(() => {
			clearInterval(interval); // 清除 interval
			resolve('success');
		}, delayTime); // 3000ms后自动 resolve
	});
};
const ssvepTrials: Ref<number> = computed(() => {
	return store.state.ssvepTrials;
});
const ssvepTrialsDuration: Ref<number> = computed(() => {
	return store.state.ssvepTrialsDuration;
});
const relaxTime = ref<number>(10);
const startExperiment = async () => {
	for (let i = 0; i < ssvepTrials.value; i++) {
		// ssvep 开始
		ssvepStartFlag.value = true;
		try {
			await Promise.race([
				sleep(ssvepTrialsDuration.value * 1000),

				checkIsExperimentStop(
					stimulusStartFlag,
					ssvepTrialsDuration.value * 1000
				)
			]);
		} catch (error) {
			ssvepStartFlag.value = false;
			console.log(error);
			return;
		}
		ssvepStartFlag.value = false;

		// 休息10s
		relaxStartFlag.value = true;
		try {
			await Promise.race([
				sleep(10000),
				checkIsExperimentStop(stimulusStartFlag, 10000)
			]);
		} catch (error) {
			relaxStartFlag.value = false;
			console.log(error);
			return;
		}
		relaxStartFlag.value = false;
	}
};
watch(stimulusStartFlag, (newStatus) => {
	if (newStatus === true) {
		startExperiment();
	}
});
</script>
