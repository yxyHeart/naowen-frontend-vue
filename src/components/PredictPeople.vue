<template>
	<el-card class="card">
		<div class="description">脑纹识别实时概率</div>

		<div ref="chart" class="recognizeResult"></div>
	</el-card>
</template>

<script lang="ts" setup>
import { ref, Ref, computed, watch, onMounted } from 'vue';
import * as echarts from 'echarts';
// import axios from "axios";
// import { io } from "socket.io-client";
// import http from "@/utils/http.js";
import { getPredictDataApi } from '@/api/experiment';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
const store = useStore();

const probability: Ref<number[]> = ref([]);
for (let i = 0; i < 16; ++i) {
	probability.value.push(0.0);
}
const chart = ref(null);
let myChart: any;

// const socket = io(store.state.baseurl + "/msg");

const initChart = () => {
	const chartDom = chart.value;
	myChart = echarts.init(chartDom);
	let subjects = [];

	subjects = [
		'ccr',
		'djh',
		'hjn',
		'jxy',
		'ldj',
		'wm',
		'wsy',
		'wxr',
		'xyk',
		'yhj',
		'yxy',
		'zcx',
		'zjb',
		'zjz',
		'zty',
		'zym'
	];
	let option = {
		xAxis: {
			max: 'dataMax'
		},
		yAxis: {
			type: 'category',
			data: subjects,
			inverse: true,
			animationDuration: 300,
			animationDurationUpdate: 300,
			max: 15, // only the largest 3 bars will be displayed
			axisLabel: {
				fontSize: 24,
				color: '#fff'
			}
		},
		series: [
			{
				realtimeSort: true,
				// name: 'X',
				type: 'bar',
				data: probability.value,
				label: {
					show: true,
					position: 'inside',
					valueAnimation: true,
					formatter: (param: any) => {
						if (param.value === 0) {
							return '';
						}
						return param.value.toFixed(3);
					}
				}
			}
		],
		legend: {
			show: true
		},
		animationDuration: 3000,
		animationDurationUpdate: 3000,
		animationEasing: 'linear',
		animationEasingUpdate: 'linear'
	};
	myChart.setOption(option);
};

const startPredict = async () => {
	getPredictDataApi()
		.then((res) => {
			const probabilityData = res.data;
			probability.value = [];
			for (let i = 0; i < 16; ++i) {
				probability.value.push(probabilityData[i]);
			}
			myChart.setOption({
				series: [
					{
						data: probability.value
					}
				]
			});
		})
		.catch((error) => {
			ElMessage({
				message: '请求超时！',
				type: 'success'
			});
		});

	await new Promise((resolve) => {
		setTimeout(() => resolve('trial结束'), 2000);
	});
	// for(let i = 0;i<16;++i){
	//   probability.value[i] = 0.0
	// }
	// myChart.setOption({
	//   series: [
	//     {
	//       data: probability.value,
	//     },
	//   ],
	// });
	store.commit('stopPredict');
};

const predictStartFlag = computed(() => {
	return store.state.predictStartFlag;
});

watch(predictStartFlag, (newStatus, oldStatus) => {
	if (newStatus === true) {
		startPredict();
	}
});

onMounted(() => {
	initChart();
});
</script>

<style scoped>
.recognizeResult {
	height: 70vh;
	width: 50vw;
}

.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.description {
	margin-left: 8vw;
	font-size: 4rem;
	color: #fff;
}

.card {
	width: 40vw;
	height: 80vh;
	margin: 0 1vw 0 2vw;
	background-color: rgb(203 213 225);
}
</style>
