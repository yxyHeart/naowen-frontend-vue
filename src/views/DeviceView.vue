<template>
  <div class="container flex justify-center mx-auto mt-[15vh]">
    <el-row class="row">
      <el-col :span="7" :offset="3" class>
        <el-card class="card" :body-style="{ height: '60vh' }">
          <div class="flex flex-col h-[100%]">
            <img :src="dsi24" class="image" />
            <!-- <div style="padding: 2px"> -->
            <span class="device-description"
              >DSI-24 无线干电极脑电采集系统</span
            >
            <div class="bottom">
              <!-- <time class="time">{{ currentDate }}</time> -->
              <el-button
                @click="handleClickDsi"
                :type="isDsiActivate ? 'danger' : 'success'"
                class="button"
                :loading="isLoading"
                :disabled="isDisabled"
              >
                {{ !isDsiActivate ? "连接设备" : "关闭设备" }}
              </el-button>
            </div>
            <!-- </div> -->
          </div>
        </el-card>
      </el-col>

      <el-col :span="7" :offset="4">
        <el-card class="card" :body-style="{ height: '60vh' }">
          <div class="flex flex-col h-[100%]">
            <img :src="neuroscan64" class="image" />
            <!-- <div style="padding: 2px; ">   -->
            <span class="device-description"
              >NeuroScan 脑电64-256导脑电采集系统</span
            >
            <div class="bottom">
              <!-- <time class="time">{{ currentDate }}</time> -->
              <el-button type="success" class="button">连接设备</el-button>
            </div>
            <!-- </div> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onBeforeMount, computed } from "vue";
import dsi24 from "@/assets/images/DSI-24.jpg";
import neuroscan64 from "@/assets/images/NeuroScan64.png";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { closeBciApi,bcigoApi,deviceStatusApi } from '@/api/experiment'

const isLoading = ref(false);
const isDisabled = ref(false);

const isDsiActivate = ref(false);
const store = useStore();
// const socket = io(store.state.baseurl + "/msg");
const connectToBCI = async (): Promise<void> => {
  console.log("connectToBCI");
  ElMessage({
    message: "正在接入脑电模块",
    type: "success",
  });

  bcigoApi()
  .then((res)=>{
    ElMessage({
      message: "脑电连接成功",
      type: "success",
    });
  })
  .catch((error)=>{
    ElMessage({
      message: error,
      type: "error",
    });
  })

  
  isDsiActivate.value = true;
  store.commit("startExperiment");
};

const closeBCI = async (): Promise<void> => {
  ElMessage({
    message: "正在关闭上一个脑电模块",
    type: "success",
  });

  closeBciApi()
  .then((res)=>{
      ElMessage({
        message: "脑电连接关闭成功",
        type: "success",
      });
  })

  isDsiActivate.value = false;
  store.commit("stopExperiment");
};
const handleClickDsi = async (): Promise<void> => {
  if (isDsiActivate.value === false) {
    isLoading.value = true;
    isDisabled.value = true;
    await connectToBCI();
    isLoading.value = false;
    isDisabled.value = false;
  } else {
    isLoading.value = true;
    isDisabled.value = true;
    await closeBCI();
    isLoading.value = false;
    isDisabled.value = false;
  }
};

onBeforeMount(async () => {
  deviceStatusApi()
  .then((res)=>{
    if (res.data === "running") {
    isDsiActivate.value = true;
  } else {
    isDsiActivate.value = false;
  }
  })
  .catch((error)=>{
    console.log(error)
  })

});
</script>

<style scoped>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 50px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 45%;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 90%;
  height: 60%;
  display: block;
  margin-left: 5%;
  background-color: rgba(255, 255, 255, 0.3);
}

.row {
  position: relative;
  top: 20%;
  width: 100%;
  height: 100%;
}

.device-description {
  font-size: 2rem;
}

.card {
  transition: transform 0.3s ease;
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
}
.card:hover {
  transform: scale(1.1); /* 鼠标移上去时放大为 120% */
}
</style>
