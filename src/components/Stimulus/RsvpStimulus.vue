<template>
	<div class="mx-auto mt-[10vh]" v-if="stimulusStartFlag">
		<el-row>
			<el-col :span="7" :offset="3">
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
					<div style="padding: 14px">
						<span>请注意以下目标</span>
					</div>
					<img
						v-for="(image, index) in images"
						:key="index"
						:src="image"
						:style="getStyle1(index)"
						class="img1"
					/>
				</el-card>
			</el-col>

			<el-col :span="7" :offset="4">
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
					<div style="padding: 14px">
						<span>刺激呈现区</span>
					</div>
					<a-statistic-countdown
						:value="deadline"
						:style="{ display: countdown_flag === true ? 'block' : 'none' }"
						@finish="onCountdownFinish"
					/>
					<img
						v-for="(image, index) in images"
						:key="index"
						:src="image"
						:style="getStyle2(index)"
						class="img2"
					/>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import { collapseItemProps } from 'element-plus';
import { ref, watch, computed, onMounted, Ref } from 'vue';

import { useStore } from 'vuex';

const store = useStore();

const images: Ref<any> = ref([]);

const getImg = async () => {
	for (let i = 0; i < 1000; i++) {
		images.value.push(
			new URL(`/src/assets/images/rsvp/${i}.jpg`, import.meta.url).href
		);
	}
};

let targetIndex = ref(0);
let currentIndex = ref(2);
let rsvp_show = ref(false);
let deadline = Date.now() + 1000 * 10;
let countdown_flag = ref(false);

const rsvpFrequency = computed(() => {
	return store.state.rsvpFrequency;
});
const rsvpSessions = computed(() => {
	return store.state.rsvpSessions;
});

const onCountdownFinish = () => {
	countdown_flag.value = false;
};
const startSession = async (session: number) => {
	deadline = Date.now() + 1000 * 10;
	countdown_flag.value = true;

	while (countdown_flag.value) {
		await new Promise((resolve) => setTimeout(resolve, 10));
	}

	rsvp_show.value = true;

	for (let i = 0; i < 200; i++) {
		console.log(session, i);
		const duration = (1 / rsvpFrequency.value) * 1000;
		await new Promise((resolve) => setTimeout(resolve, duration));
		currentIndex.value = Math.floor(Math.random() * 1000);
		if (stimulusStartFlag.value === false) {
			return;
		}
	}

	rsvp_show.value = false;
};
const startExperiment = async () => {
	for (let session = 0; session < rsvpSessions.value; ++session) {
		console.log('session:', session);
		if (stimulusStartFlag.value === false) {
			targetIndex.value = 0;
			currentIndex.value = 0;
			countdown_flag.value = false;
			rsvp_show.value = false;

			return;
		}
		await startSession(session);
		targetIndex.value += 199;
	}
	currentIndex.value = 0;
	targetIndex.value = 0;
	countdown_flag.value = false;
	rsvp_show.value = false;
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
const getStyle1 = (index: number) => {
	return {
		display: index === targetIndex.value ? 'block' : 'none'
	};
};

const getStyle2 = (index: number) => {
	return {
		display: index === currentIndex.value && rsvp_show.value ? 'block' : 'none'
	};
};

onMounted(async () => {
	await getImg();
});
</script>

<style scoped>
.img1 {
	width: 70%;
	height: 85%;
}
.img2 {
	width: 70%;
	height: 85%;
}
</style>
