import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import PredictView1 from '@/views/PredictPageOneView.vue';
import ValidView1 from '@/views/ValidPageOneView.vue';
import DeviceView from '@/views/DeviceView.vue';
import RecordView from '@/views/RecordView.vue';
import DatabaseView from '@/views/DatabaseView.vue';
import { ElLoading } from 'element-plus';
const PredictView2 = () => import('@/views/PredictPageTwoView/index.vue');
const ValidView2 = () => import('@/views/ValidPageTwoView.vue');
const RecordView2 = () => import('@/views/RecordPageTwoView.vue');
const PageOneView = () => import('@/views/PageOneView.vue');

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView
	},
	{
		path: '/connectdevice',
		name: 'connectdevice',
		component: DeviceView
	},
	{
		path: '/brainprintrecord1',
		name: 'brainprintrecord1',
		component: RecordView
	},
	{
		path: '/brainprintrecord2',
		name: 'brainprintrecord2',
		component: RecordView2
	},
	{
		path: '/predict1',
		name: 'predict1',

		// component: PredictView1
		component: PageOneView
	},
	{
		path: '/predict2',
		name: 'predict2',

		component: PredictView2,
		meta: { showLoader: true }, // 添加 meta 字段
		beforeEnter: async (to, from) => {
			if (to.meta.showLoader) {
				const loading = ElLoading.service({
					lock: true,
					text: 'Loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				// 加载组件
				await new Promise((resolve) => {
					setTimeout(() => {
						resolve();
						loading.close(); // 关闭加载动画
					}, 500);
				});
			}
		}
	},
	{
		path: '/valid1',
		name: 'valid1',

		component: ValidView1
	},
	{
		path: '/valid2',
		name: 'valid2',
		meta: { showLoader: true }, // 添加 meta 字段
		beforeEnter: async (to, from) => {
			if (to.meta.showLoader) {
				const loading = ElLoading.service({
					lock: true,
					text: 'Loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				// 加载组件
				await new Promise((resolve) => {
					setTimeout(() => {
						resolve();
						loading.close(); // 关闭加载动画
					}, 500);
				});
			}
		},

		component: ValidView2
	},
	{
		path: '/database',
		name: 'database',

		component: DatabaseView
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
