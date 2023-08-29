<template>
  <div class="container">
    <el-row class="row">
      <el-col
        :span="8"
        :offset="2"
        class
      >
        <el-card class="card" :body-style="{ margin:'auto',padding: '0px', height:'70vh',width:'30vw',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center' }">
          <img
            :src="dsi24"
            class="image"   
          />
          <div style="padding: 2px">
            <span class="device-description">DSI-24 无线干电极脑电采集系统</span>
            <div class="bottom">
              <time class="time">{{ currentDate }}</time>
              <el-button @click="handleClickDsi" :type="isDsiActivate? 'danger' : 'success' " class="button">{{ !isDsiActivate?"连接设备":"关闭设备" }}</el-button>
            </div>
          </div>
        </el-card>

      </el-col>

      <el-col
        :span="8"
        :offset="3"
      >
        <el-card class="card" :body-style="{ margin:'auto', padding: '0px', height:'70vh',width:'30vw',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center' }">
          <img
            :src="neuroscan64"
            class="image"
          />
          <div style="padding: 2px">
            <span class="device-description">NeuroScan 脑电64-256导脑电采集系统</span>
            <div class="bottom">
              <time class="time">{{ currentDate }}</time>
              <el-button type="success" class="button">连接设备</el-button>
            </div>
          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>
  </template>
  
<script setup lang="ts">
    import { ref,Ref } from 'vue'
    import dsi24 from '@/assets/images/DSI-24.jpg'    
    import neuroscan64 from '@/assets/images/NeuroScan64.png'
    import { ElMessage } from 'element-plus'
    import { useStore } from 'vuex'
    import axios from 'axios'


  const currentDate:Ref<Date> = ref(new Date())
  const isDsiActivate = ref<boolean>(false);
  const store = useStore()

  const connectToBCI = async ():Promise<void>=> {
      console.log("connectToBCI")
      store.commit('startExperiment')
      ElMessage({
          message: "正在接入脑电模块",
          type:"success"
      });
      let url=  store.state.baseurl + "/api/bcigo";
      await axios.get(url).then(function(response){
          let data=response.data;
          if (data.code==1){
              ElMessage({
                  message: data.data,
                  type:"error"
              });
          }
          else{
              ElMessage({
                  message: "脑电连接成功",
                  type:"success"
              });
          }
      })
      .catch((error)=>{
          ElMessage({
              message: error,
              type: "error"
          })
          }
      )
      
  }

  const closeBCI = async ():Promise<void> =>{
      ElMessage({
          message: "正在关闭上一个脑电模块",
          type:"success"
      });
      let url =  store.state.baseurl + "/api/closeBCI";
      await axios.get(url).then(function(response){
          let data=response.data
          if (data.code === 1)
              ElMessage({
                  message: data.data,
                  type: 'error'
              });
          else{
              ElMessage({
                  message: "脑电连接关闭成功",
                  type: 'success'
              })
          }

      })
      store.commit('stopExperiment')
      console.log(store)
  }
  const handleClickDsi = async ():Promise<void>=>{
      if(isDsiActivate.value === false){
          await connectToBCI();
          isDsiActivate.value = true
      }else{
          await closeBCI();
          isDsiActivate.value = false
      }
  }


  </script>

<style scoped>
.container{
  display: flex;
  align-items: center;
  height: 70vh;
  width: 100vw;
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 60%;
  display: block;
  background-color: rgba(255, 255, 255, 0.3);
}

.row{
  position: relative;
  top: 20%;
  width: 100%;
  height: 100%;
}

.device-description{
  font-size: 2rem;
}

.card{
  transition: transform 0.3s ease ;
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);


}
.card:hover {
  transform: scale(1.1); /* 鼠标移上去时放大为 120% */
}
</style>
  