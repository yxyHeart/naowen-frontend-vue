<template>

    <div class="op ">
        
        <StimulusParamSetter />
            
        <el-button type="primary" round>
            <router-link class="router" to="/valid2" target="_blank">开启脑电界面</router-link>
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



    <!-- <RsvpStimulus  v-if="curParadigm==='rsvp'" />
    <MiStimulus v-if="curParadigm==='mi'" />
    <SSVEPStimulus v-if="curParadigm==='ssvep'" /> -->
    <MixStimulus />
  </template>

<script setup lang="ts">
import { ref, watch,onMounted,onBeforeMount,Ref} from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex';
import { ElMessage, ElLoading } from 'element-plus'
import axios from 'axios';
import { io } from "socket.io-client";
import StimulusParamSetter from '@/components/Stimulus/MixStimulus/StimulusParamSetter.vue'
import CountdownRecord from "@/components/CountdownRecord.vue"
// import MiStimulus from '@/components/Stimulus/MiStimulus.vue';
// import SSVEPStimulus from '@/components/Stimulus/SSVEPStimulus4.vue';
// import RsvpStimulus from '@/components/Stimulus/RsvpStimulus.vue'
import MixStimulus from '@/components/Stimulus/MixStimulus/MixStimulus.vue';
const start = ref(false)
const store = useStore()
const socket = io(store.state.baseurl + '/msg');
const deadline = ref(Date.now() + 1000 * 0);


// const curParadigm:Ref<string> = computed(()=>{
//     return store.state.paradigm
// })

const startRecordValid = ()=>{
    store.commit('startRecordValid')
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })

    setTimeout(() => {
        loading.close()
    }, 200)

    socket.emit('startValid')

    let url=  store.state.baseurl + "/api/startValid";
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
        startRecordValid()
        deadline.value = Date.now() + 1000 * 10
        start.value = true
    // 手动关闭实验
    }else if(oldstatus === true && newstatus === false){
        ElMessage({
            message: "实验关闭成功！",
            type:"success"
        });
        console.log('实验已关闭！')
        start.value = false
        localStorage.clear()
        sessionStorage.clear()
        store.commit('closeRecordValid')
        store.commit('stopValid')
        socket.emit('validOver')
    }
})

// 通过关闭第二个页面来关闭实验
const validStatus = computed(() => store.getters.validStatus);
watch(validStatus,(newstatus)=>{
    
    if(!newstatus){
        console.log('实验已关闭！(by第二个页面)')
        store.commit('closeRecordValid')
        socket.emit('validOver')
        start.value = false
        localStorage.clear()
        sessionStorage.clear()
    }
})

// 在验证的混合范式实验结束时关闭start按钮
const recordValidStatus = computed(()=>store.state.recordValidStartFlag)
watch(recordValidStatus,(newStatus)=>{
    if(!newStatus && start.value===true){
        start.value = false
    }
})

onMounted(()=>{

})
onBeforeMount(()=>{
    socket.on('isGetValidStart', (data) => {
        console.log('isGetValidStart',data)
        if(data === "start!"){
            store.commit('startValid')
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
