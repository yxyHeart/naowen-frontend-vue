<template>
  <div class="container">

      <div class="choose-text">请选择被试进行验证</div>
      <el-select v-model="value" class="m-2" placeholder="请选择被试进行验证！" size="large">
        <el-option 
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

    <el-result
        icon="success"
        title="验证成功"
        sub-title="Please follow the instructions"
        :style="validStatus0?{display:'block'}:{display:'none'}"
        >
        <template #extra>
            <el-button type="primary">Back</el-button>
        </template>
    </el-result>

    <el-result
        icon="error"
        title="验证失败"
        sub-title="Please follow the instructions"
        :style="validStatus1?{display:'block'}:{display:'none'}"
      >
        <template #extra>
          <el-button type="primary">Back</el-button>
        </template>
    </el-result>
    
    <div :style="validStatus2?{display:'block'}:{display:'none'}" class="loading">

    
    <a-spin tip="正在验证中... " wrapperClassName="spin" size="large">
        <!-- <a-alert
          :message= "`当前验证的被试为 ${value }`"
        ></a-alert> -->
      </a-spin>

    </div>
    <!-- <el-result icon="info" title="验证中" :style="validStatus2?{display:'block'}:{display:'none'}">
      <template #sub-title>
        <p>Using slot as subtitle</p>
      </template>
      <template #extra>
        <el-button type="primary">Back</el-button>
      </template>
    </el-result> -->

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted,computed, Ref } from 'vue';
import { useStore } from 'vuex'
import axios from 'axios';
const store = useStore()

// 0 验证成功 1验证失败 2验证中
const validStatus0 = ref(false)
const validStatus1 = ref(false)
const validStatus2 = ref(true)
const getValid:Ref<any> = ref(null)
const value = ref('')
const subjects = ['ccr','djh','hjn','jxy','ldj','wm','wsy','wxr','xyk','yhj','yxy','zcx','zjb','zjz','zty','zym']

const options = subjects.map((subject:string)=>{
  return {
    value:subject,
    label:subject
  }
})

const getV = async()=>{
    const response = await axios.get(store.state.baseurl + '/api/getValid')

    const data = response.data.data
    if(data === 0){
      validStatus0.value =true
      validStatus1.value = false
      validStatus2.value = false
    }else if(data === 1){
      validStatus0.value = false
      validStatus1.value = true
      validStatus2.value = false
    }else if (data ===  2){
      validStatus0.value = false
      validStatus1.value = false
      validStatus2.value = true
    }

}
const startValid = ()=>{
  getValid.value = setTimeout(()=>{
      getV()
  },5000)
}
// const stopValid= ()=>{
//   clearInterval(getValid.value)
// }

const waitExperimentStart = async ()=>{
    while(!isValidStart.value){
        console.log("实验还未开始")
        await new Promise((resolve)=>setTimeout(resolve, 2000))
    }
    startValid()
}


onMounted(()=>{
  window.addEventListener('beforeunload', ()=>{
    store.commit('stopValid')
  });
  waitExperimentStart()
})
const isValidStart = computed(()=>{
  return store.state.validStartFlag
})

</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.choose-text{
  margin-bottom: 10px;
  font-size: 6rem;
  color:#fff;
}
.loading{
  margin-top: 5px;
  border-top: 20px;
}
.spin{
  width: 20vw;
  height: 50vh;
}
.el-select{
  transform: scale(3);

}
.el-result{
  transform: scale(2);
  margin-top: 5vh;
}

.el-result__title{
  color: #fff;
}
.loading{
  transform: scale(4);
  margin-top: 10vh;
}
</style>