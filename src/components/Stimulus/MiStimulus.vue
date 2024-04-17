<template>
	<div class="mx-auto mt-[10vh]" v-if="stimulusStartFlag">
		<el-row>
			<el-col :span="5" :offset="1">
				<el-card
					:body-style="{
						padding: '0px',
						height: '70vh',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}"
				>
					<div
						style="padding: 14px"
						v-if="mi_show && stimulusStartFlag && currentIndex === 0"
					>
						<span>请想象左手</span>
					</div>
					<img
						:src="leftHand"
						v-if="currentIndex == 0 && mi_show"
						class="img0"
					/>
				</el-card>
			</el-col>

			<el-col :span="6" :offset="3">
				<el-card
					:body-style="{
						padding: '0px',
						height: '70vh',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}"
				>
					<div
						style="padding: 14px"
						v-if="
							!mi_show &&
							stimulusStartFlag &&
							!imageFlag &&
							!countdownRelaxTimeBetweenSessionsFlag
						"
					>
						<span>休息2s</span>
					</div>
					<a-statistic-countdown
						:value="relaxTimeBetweenTrials"
						:style="{
							display:
								countdownRelaxTimeBetweenTrialsFlag === true ? 'block' : 'none'
						}"
						@finish="onCountdownFinish"
					/>

					<a-statistic-countdown
						:title="`请休息${10}s`"
						:value="relaxTimeBetweenSessions"
						:style="{
							display:
								countdownRelaxTimeBetweenSessionsFlag === true
									? 'block'
									: 'none'
						}"
						@finish="onCountdownRelaxTimeBetweenSessionsFinish"
					/>

					<img
						:src="ten"
						v-if="!mi_show && stimulusStartFlag && imageFlag"
						class="img2"
					/>
				</el-card>
			</el-col>

			<el-col :span="5" :offset="3">
				<el-card
					:body-style="{
						padding: '0px',
						height: '70vh',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}"
				>
					<div
						style="padding: 14px"
						v-if="mi_show && stimulusStartFlag && currentIndex === 1"
					>
						<span>请想象右手</span>
					</div>

					<img
						:src="rightHand"
						v-if="currentIndex === 1 && mi_show"
						class="img1"
					/>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';

import { useStore } from 'vuex';
import leftHand from '@/assets/images/mi/left.png';
import rightHand from '@/assets/images/mi/right.png';
import ten from '@/assets/images/mi/ten.png';
const store = useStore();

// 0 or 1
const currentIndex = ref(1);
const mi_show = ref(false);
const relaxTimeBetweenTrials = ref(Date.now());
const relaxTimeBetweenSessions = ref(Date.now());
const countdownRelaxTimeBetweenTrialsFlag = ref(false);
const countdownRelaxTimeBetweenSessionsFlag = ref(false);
const imageFlag = ref(false);

const onCountdownRelaxTimeBetweenSessionsFinish = () => {
	countdownRelaxTimeBetweenSessionsFlag.value = false;
};
const onCountdownFinish = () => {
	countdownRelaxTimeBetweenTrialsFlag.value = false;
};

const miSessions = computed(() => {
	return store.state.miSessions;
});
const miTrials = computed(() => {
	return store.state.miTrials;
});
const miTaskPromptTime = computed(() => {
	return store.state.miTaskPromptTime;
});
const miMotorImageryTime = computed(() => {
	return store.state.miMotorImageryTime;
});
const miRelaxTime = computed(() => {
	return store.state.miRelaxTime;
});

const startSession = async (session: number) => {
	relaxTimeBetweenSessions.value = Date.now() + 1000 * 10;
	countdownRelaxTimeBetweenSessionsFlag.value = true;

	while (countdownRelaxTimeBetweenSessionsFlag.value) {
		await new Promise((resolve) => setTimeout(resolve, 10));
	}

	for (let i = 0; i < miTrials.value; i++) {
		console.log(session, i);
		// 任务提示 2s
		currentIndex.value = Math.round(Math.random());
		mi_show.value = true;
		await new Promise((resolve) =>
			setTimeout(resolve, miTaskPromptTime.value * 1000)
		);
		mi_show.value = false;

		// 运动想象 4s
		imageFlag.value = true;
		await new Promise((resolve) =>
			setTimeout(resolve, miMotorImageryTime.value * 1000)
		);
		imageFlag.value = false;

		if (i !== miTrials.value - 1) {
			// 休息两秒
			relaxTimeBetweenTrials.value = Date.now() + miRelaxTime.value * 1000;
			countdownRelaxTimeBetweenTrialsFlag.value = true;
		}

		while (countdownRelaxTimeBetweenTrialsFlag.value) {
			await new Promise((resolve) => setTimeout(resolve, 10));
		}

		// 如果实验停止了
		if (stimulusStartFlag.value === false) {
			return;
		}
	}

	mi_show.value = false;
};
const startExperiment = async () => {
	for (let session = 0; session < miSessions.value; ++session) {
		console.log('session:', session);
		if (stimulusStartFlag.value === false) {
			currentIndex.value = 0;
			countdownRelaxTimeBetweenTrialsFlag.value = false;
			mi_show.value = false;

			return;
		}
		await startSession(session);
	}
	// 因为识别和验证都有可能打开脑电，所以都关一下
};
const stimulusStartFlag = computed(() => {
	return (
		store.state.recordStartFlag ||
		store.state.recordValidStartFlag ||
		store.state.recordPredictStartFlag
	);
});

watch(stimulusStartFlag, (newstatus) => {
	if (newstatus === true) {
		startExperiment();
	}
});
</script>

<style scoped>
.img0 {
	width: 70%;
	height: 85%;
}
.img1 {
	width: 70%;
	height: 85%;
}
.img2 {
	width: 70%;
	height: 85%;
}
</style>
