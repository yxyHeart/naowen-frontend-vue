<template>

    <div class="op ">
        
        <ParadigmSelector />

        <el-button type="primary" round>
            <router-link class="router" to="/predict2" target="_blank">开启脑电界面</router-link>
        </el-button>


        <div>
            <div>
                开始实验
            </div>
            <el-switch  
                v-model="start" 
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            />
        </div>

        <CountdownRecord  :deadline="deadline"/>


    </div>



    <RsvpStimulus v-if="curParadigm==='rsvp'" />
    <MiStimulus v-if="curParadigm==='mi'" />
    <SSVEPStimulus v-if="curParadigm==='ssvep'" />

  </template>

<script setup lang="ts">
import { ref, watch,onMounted,onBeforeMount, Ref} from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex';
import { ElMessage, ElLoading } from 'element-plus'
import RsvpStimulus from '@/components/Stimulus/RsvpStimulus.vue'
import axios from 'axios';
import { io } from "socket.io-client";
import CountdownRecord from "@/components/CountdownRecord.vue"
import ParadigmSelector from '@/components/ParadigmSelector.vue';
import MiStimulus from '@/components/Stimulus/MiStimulus.vue';
import SSVEPStimulus from '@/components/Stimulus/SSVEPStimulus40.vue';

let deadline:Ref<number> = ref(Date.now() + 1000 * 0);

const start:Ref<boolean> = ref<boolean>(false)
const store = useStore()
const socket = io(store.state.baseurl + '/msg');


const curParadigm = computed(()=>{
    return store.state.paradigm
})

// 点开始实验这个按钮的时刻
const startRecordPredict = ()=>{
    store.commit('startRecordPredict')
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })

    setTimeout(() => {
        loading.close()
    }, 200)

    socket.emit('startPredict')

    let url=  store.state.baseurl + "/api/startPredict";
    axios.get(url).then(function(response){
        let data=response.data
        if (data.code==1)
            ElMessage({
                message: data.data,
                type:"error"
            });
        else{
            ElMessage({
                message: "开始采集脑电数据",
                type:"success"
            });
        }
    })
    .catch(function(error){
        ElMessage({
            message: error,
            type:"error"
        });
    });

}


watch(start, async(newstatus,oldstatus)=>{
    if(oldstatus === false && newstatus === true){
        startRecordPredict()
        deadline.value = Date.now() + 1000 * 15 
        start.value = true
    // 手动关闭实验
    }else if(oldstatus === true && newstatus === false){
        ElMessage({
            message: "实验关闭成功！",
            type:"success"
        });
        console.log('实验已关闭！(手动)')
        start.value = false
        localStorage.clear()
        sessionStorage.clear()
        store.commit('closeRecordPredict')
        store.commit('stopPredict')
        socket.emit('predictOver')
    }
})

// 通过关闭第二个页面来关闭实验
const predictStatus = computed(() => store.getters.predictStatus);
watch(predictStatus,(newstatus)=>{
    
    if(!newstatus){
        console.log('实验已关闭！(by第二个页面)')
        store.commit('closeRecordPredict')
        socket.emit('predictOver')
        start.value = false
        localStorage.clear()
        sessionStorage.clear()
    }
})

onMounted(()=>{

})
onBeforeMount(()=>{
    // socket.on('connect_error',(e)=>{
    //     console.log(e)
    // })
    socket.on('isGetProbabilityStart', (data) => {
        console.log('isGetProbabilityStart:',data)
        if(data === "start!"){
            store.commit('startPredict')
        }

    });
})



</script>

<style>
.router{
    font-style: italic;
    text-decoration: none;
    color: #000;
}
.op {
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2% auto;
}

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
