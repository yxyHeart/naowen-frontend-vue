import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PredictView1 from '@/views/PredictPageOneView.vue'
// import PredictView2 from '@/views/PredictPageTwoView.vue'
import ValidView1 from '@/views/ValidPageOneView.vue'
// import ValidView2 from '@/views/ValidPageTwoView.vue'
import DeviceView from '@/views/DeviceView.vue'
import RecordView from '@/views/RecordView.vue'
import DatabaseView from '@/views/DatabaseView.vue'
import { ElLoading } from 'element-plus';
const PredictView2 = ()=>import("@/views/PredictPageTwoView.vue")
const ValidView2 = ()=>import('@/views/ValidPageTwoView.vue')
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
    path: '/brainprintrecord',
    name: 'brainprintrecord',
    component: RecordView
  },
  {
    path: '/predict1',
    name: 'predict1',

    component: PredictView1
  },
  {
    path: '/predict2',
    name: 'predict2',

    component: PredictView2,
    meta: { showLoader: true }, // 添加 meta 字段
    beforeEnter: async(to, from) => {
      if (to.meta.showLoader) {
        const loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        // 加载组件
        await new Promise((resolve)=>{
          setTimeout(()=>{
            resolve();
            loading.close(); // 关闭加载动画
          },500)
        })
      } 
    },
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
    beforeEnter: async(to, from) => {

      if (to.meta.showLoader) {
        const loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        // 加载组件
        await new Promise((resolve)=>{
          setTimeout(()=>{
            resolve();
            loading.close(); // 关闭加载动画
          },500)
        })
      } 
    },

    component: ValidView2
  },
  {
    path: '/database',
    name: 'database',

    component: DatabaseView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
