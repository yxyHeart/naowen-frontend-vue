<template>
	<!-- <div class="container ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500  ml-[1vw]"> -->
	<el-card class="card container">
		<div
			class="mx-[2px] w-[100%] h-[100%] flex flex-col justify-between items-center"
		>
			<img :src="isPredicting ? people0 : people1" class="mb-[3vh]" />
			<!-- <el-select
          v-model="subjectValue"
          class="w-[100%]"
          placeholder="请选择被试进行验证！！"
          size="large"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->
			<!-- sub-title="当前注册人员为yhj" -->
			<el-result
				icon="success"
				title="识别结束"
				:sub-title="
					subject !== '' ? `当前注册人员为${subject}` : '未识别当前被试'
				"
				class="text-white mt-[5vh]"
				:style="isPredicting ? { display: 'none' } : { display: 'flex' }"
			>
			</el-result>
			<div
				:style="
					recordStartFlag && isPredicting
						? { display: 'flex' }
						: { display: 'none' }
				"
				class="loading"
			>
				<a-spin tip="正在识别中... " wrapperClassName="spin" size="large">
				</a-spin>
			</div>
		</div>

		<!-- </div> -->
	</el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, Ref, watch, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { getPredictNameDataApi } from '@/api/experiment';
import people0 from '@/assets/images/valid/people0.png';
import people1 from '@/assets/images/valid/people1.png';
import { ElMessage } from 'element-plus';
import executeRequestsWithInterval from '@/utils/executeRequestWithInterval';

const store = useStore();
const isPredicting = ref<boolean>(true);
const subject = ref<string>('');

const startPredict = async () => {
	getPredictNameDataApi()
		.then((res) => {
			isPredicting.value = false;
			const { subjectName } = res.data;
			subject.value = subjectName;
		})
		.catch((error) => {
			ElMessage({
				message: '请求超时！',
				type: 'success'
			});
		});
	await new Promise((resolve) => {
		setTimeout(() => {
			isPredicting.value = true;
			subject.value = '';
			resolve('trial结束');
		}, 2000);
	});
};

const recordStartFlag = computed(() => {
	return store.state.recordStartFlag;
});

const curParadigm = computed(() => {
	return store.state.curParadigm;
});

const curParadigmDuration = computed(() => {
	return store.getters.getOneTrialTimeByParadigm(curParadigm.value);
});

const curParadigmTrials = computed(() => {
	return store.getters.getTrialsByParadigm(curParadigm.value);
});

watch(recordStartFlag, (newStatus) => {
	if (newStatus === true) {
		executeRequestsWithInterval(
			startPredict,
			curParadigmDuration.value,
			curParadigmTrials.value,
			store.getters.intervalTime
		);
	}
});
</script>

<style scoped>
.choose-text {
	margin-bottom: 10px;
	font-size: 4rem;
	color: #fff;
}
.loading {
	margin-top: 5px;
	border-top: 20px;
}
.spin {
	width: 20vw;
	height: 50vh;
}

.el-result {
	transform: scale(1.6);
	margin-top: 5vh;
}

.el-result__title {
	color: #fff;
}
.loading {
	transform: scale(2);
	margin-top: 10vh;
}

.card {
	width: 40vw;
	height: 80vh;
	margin: 0 1vw 0 2vw;
	background-color: rgb(203 213 225);
}
</style>
