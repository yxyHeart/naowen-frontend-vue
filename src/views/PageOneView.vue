<template>
	<div
		class="container ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500 w-[80%] flex justify-around items-center mx-auto my-[2%]"
		v-show="!recordStartFlag"
	>
		<ParadigmSelector />
		<StimulusParamSetter />
		<el-button type="primary" round>
			<router-link class="text-black" to="/predict2" target="_blank"
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
		:value="countDownDeadline"
		class="ml-[47vw] mr-[45vw] mt-[25vh] scale-[2.5]"
		@finish="onRecordCountdownFinish"
		:value-style="{ color: '#3f8600' }"
		v-show="countDownShowFlag"
	/>

	<RsvpStimulus v-if="curParadigm === 'rsvp'" />
	<MiStimulus v-if="curParadigm === 'mi'" />
	<SSVEPStimulusWithRelax v-if="curParadigm === 'ssvep'" />
	<MixStimulusWithRelax v-if="curParadigm === 'mixStimulus'" />
	<RelaxStimulus v-if="curParadigm === 'relax'" />
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from 'vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ElMessage, ElLoading } from 'element-plus';
import RsvpStimulus from '@/components/Stimulus/RsvpStimulus.vue';
import MiStimulus from '@/components/Stimulus/MiStimulus.vue';
import SSVEPStimulusWithRelax from '@/components/Stimulus/SSVEPStimulusWithRelax.vue';
import ParadigmSelector from '@/components/ParadigmSelector.vue';
import StimulusParamSetter from '@/components/Stimulus/StimulusParamSetter.vue';
import RelaxStimulus from '@/components/Stimulus/RelaxStimulus.vue';
import MixStimulusWithRelax from '@/components/Stimulus/MixStimulus/MixStimulusWithRelax.vue';
import { bcigoApi, startPredictApi } from '@/api/experiment';

const store = useStore();

const curParadigm = computed(() => {
	return store.state.curParadigm;
});

const recordStartFlag = computed(() => {
	return store.state.recordStartFlag;
});

const allTrialsTime = computed(() => {
	return store.getters.getAllTrialsTimeByParadigm(curParadigm.value);
});

const start = ref(false);

const countDownDeadline = ref(Date.now() + 1000 * 0);
const countDownShowFlag = ref(false);

const onRecordCountdownFinish = () => {
	countDownShowFlag.value = false;
};

const startRecord = async () => {
	const waitExperimentStartTime = 5 * 1000;
	countDownShowFlag.value = true;
	countDownDeadline.value = Date.now() + waitExperimentStartTime;
	bcigoApi();
	await new Promise(res => {
		setTimeout(res, waitExperimentStartTime);
	});
	startPredictApi();

	store.commit('startRecord');

	setTimeout(() => {
		store.commit('stopRecord');
	}, allTrialsTime.value);
};

watch(start, async (newStatus, oldStatus) => {
	if (oldStatus === false && newStatus === true) {
		startRecord();
		start.value = true;
		// 手动关实验
	} else if (
		oldStatus === true &&
		newStatus === false &&
		recordStartFlag.value
	) {
		localStorage.clear();
		sessionStorage.clear();
		store.commit('closeRecordPreict');
		start.value = false;
	}
});

watch(recordStartFlag, async newStatus => {
	if (!newStatus) {
		start.value = false;
		const loading = ElLoading.service({
			lock: true,
			text: '正在保存脑纹数据，请休息！',
			background: 'rgba(0, 0, 0, 0.7)'
		});

		setTimeout(() => {
			loading.close();
		}, 20000);
	}
});
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
