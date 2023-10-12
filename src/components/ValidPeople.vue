<template>
  <!-- <div class="container ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500  ml-[1vw]"> -->
  <el-card class="card container">
    <div
      class="mx-[2px] w-[100%] h-[100%] flex flex-col justify-between items-center"
    >
      <img :src="!validStatus0 ? people0 : people1" class="mb-[3vh]" />
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
        title="验证成功"
        
        class="text-white mt-[5vh]"
        :style="validStatus0 ? { display: 'flex' } : { display: 'none' }"
      >
        <!-- <template #extra>
            <div class="text-white mb-2">验证失败</div>
            <el-button type="primary">Back</el-button>
        </template> -->
      </el-result>

      <el-result
        icon="error"
        title="验证失败"
        class="text-white"
        :style="validStatus1? { display: 'flex' } : { display: 'none' }"
      >
        <!-- <template #extra>
          <div class="text-white mb-2">验证失败</div>
          <el-button type="primary">Back</el-button>
        </template> -->
      </el-result>

      <div
        :style="
          (recordValidStartFlag || validStatus2) && (!validStatus0) && (!validStatus1)
            ? { display: 'flex' }
            : { display: 'none' }
        "
        class="loading"
      >
        <a-spin tip="正在验证中... " wrapperClassName="spin" size="large">
        </a-spin>
      </div>
    </div>

    <!-- </div> -->
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, Ref, watch } from "vue";
import { useStore } from "vuex";
// import axios from "axios";
// import http from "@/utils/http.js";
import { getValidDataApi } from "@/api/experiment";
import people0 from "@/assets/images/valid/people0.png";
import people1 from "@/assets/images/valid/people1.png";
import { ElMessage } from "element-plus";
const store = useStore();


// 0 验证成功 1验证失败 2验证中
const validStatus0 = ref(false);
const validStatus1 = ref(false);
const validStatus2 = ref(false);

// const subjects = [
//   "ccr",
//   "djh",
//   "hjn",
//   "jxy",
//   "ldj",
//   "wm",
//   "wsy",
//   "wxr",
//   "xyk",
//   "yhj",
//   "yxy",
//   "zcx",
//   "zjb",
//   "zjz",
//   "zty",
//   "zym",
// ];

// const options = subjects.map((subject: string) => {
//   return {
//     value: subject,
//     label: subject,
//   };
// });


const startValid = async() => {
  getValidDataApi()
  .then((res)=>{
    const validData = res.data;
    console.log(validData);
    if (validData === 0 || validData === '0'|| validData === true) {
      validStatus2.value = false;
      validStatus0.value = true;
      validStatus1.value = false;
      
    } else if (validData === 1 || validData === '1'|| validData === false) {
      validStatus2.value = false;
      validStatus0.value = false;
      validStatus1.value = true;
      
    } else if (validData === 2 || validData === '2') {
      validStatus0.value = false;
      validStatus1.value = false;
      validStatus2.value = true;
    }
  })
  .catch((error)=>{
    ElMessage({
      message: "请求超时！",
      type: "success",
    });
  })
  await new Promise((resolve)=>{
    setTimeout(()=>{

      validStatus0.value = false;
      validStatus1.value = false;

      resolve("trial结束")
    },2000)
  })
  store.commit("stopValid")
};

// const waitExperimentStart = async () => {
//   while (!isValidStart.value) {
//     console.log("验证还未开始");
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }
//   startValid();
// };

// onMounted(() => {
//   waitExperimentStart();
// });
const validStartFlag = computed(() => {
  return store.state.validStartFlag;
});

watch(validStartFlag,(newStatus,oldStatus)=>{
  if(newStatus === true){
    startValid()
  }

})
const recordValidStartFlag = computed(() => {
  return store.state.recordValidStartFlag;
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
/* .el-select{
  transform: scale(1.5);

} */
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
