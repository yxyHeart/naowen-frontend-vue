<template>
    
    <div class="op">
        <ParadigmSelector />
        <div>
            <div>
                开始实验
            </div>
            <el-switch  
                v-model="start" 
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            />
        </div>
        <a-statistic-countdown
            title="Countdown"
            :value="deadline"
            style="margin-right: 50px"
            @finish="onFinish"
        />

        <el-button text @click="dialogFormVisible = true">
            结束实验
        </el-button>

        <el-dialog v-model="dialogFormVisible" title="提交结果">
            <el-form :model="form">
            <el-form-item label="被试姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="stopRecord">
                确认
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>



    <RsvpStimulus v-if="curParadigm==='rsvp'" />
    <MiStimulus v-if="curParadigm==='mi'" />
    <SSVEPStimulus v-if="curParadigm==='ssvep'" />
  </template>

<script setup>
import { ref, watch,reactive } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex';
import { ElMessage, ElLoading } from 'element-plus'
import RsvpStimulus from '@/components/Stimulus/RsvpStimulus.vue'
import MiStimulus from '@/components/Stimulus/MiStimulus.vue';
import SSVEPStimulus from '@/components/Stimulus/SSVEPStimulus40.vue';
import axios from 'axios';
import ParadigmSelector from '@/components/ParadigmSelector.vue';

const curParadigm = computed(()=>{
    return store.state.paradigm
})
const start = ref(false)
const store = useStore()

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onFinish = () => {
  console.log('finish')
};
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const startRecord = ()=>{
    store.commit('startRecord')
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })

    setTimeout(() => {
        loading.close()
    }, 2000)

    let url= store.state.baseurl + "/api/startRecord";
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

const stopRecord = ()=>{
    const loading = ElLoading.service({
        lock: true,
        text: '正在保存脑纹数据',
        background: 'rgba(0, 0, 0, 0.7)',
    })

    setTimeout(() => {
        loading.close()
    }, 2000)
    let url=  store.state.baseurl + "/api/stopRecord";
    console.log(form.name);
    axios.get(url,{
        params:{
            subjectName: form.name,
        }
    }).then(function(response){
        loading.close();
        const data=response.data;
        if (data.code==1)
        ElMessage({
            message: data.data,
            type:"error"
        });
        else{
            ElMessage({
                message: data.data,
                type:"success"
            });
        }
    }).catch(function(error){
        ElMessage({
            message: error,
            type:"error"
        });
        loading.close();
    });
    dialogFormVisible.value = false
}
watch(start, async(newstatus,oldstatus)=>{
    if(oldstatus === false && newstatus === true){
        startRecord()
        start.value = true
    }else if(oldstatus === true && newstatus === false){
        localStorage.clear()
        sessionStorage.clear()
        store.commit('closeRecord')
        start.value = false
    }
})

watch(()=>store.state.recordStartFlag,(newststus)=>{

    if(!newststus){
        start.value = false
    }
})



</script>

<style>

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
