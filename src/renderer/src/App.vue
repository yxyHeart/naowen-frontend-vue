<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#fff"
      text-color="#000"
      active-text-color="#ffd04b"
      collapse-transition="false"
      @select="handleSelect"
    >
      <img :src="BCI" class="bci-title">
      <div class="flex-grow" />
      <el-menu-item index="0" >home</el-menu-item>
      <el-menu-item index="1" >设备接入</el-menu-item>
      <el-menu-item index="2" >脑纹录入</el-menu-item>
      <el-menu-item index="3" >脑纹识别</el-menu-item>
      <el-menu-item index="4" >脑纹验证</el-menu-item>
      <el-menu-item index="5" >脑纹管理</el-menu-item>

    </el-menu>

    
    <router-view/>

  </div>

</template>

<script lang="ts" setup>

import { ref, onMounted, Ref, onBeforeMount, watch} from 'vue'
import { useRouter,useRoute} from 'vue-router'

import BCI from '@/assets/images/BCI_title.jpg'
const router = useRouter()
const route = useRoute()


const activeIndex:Ref<string> = ref('3')
const handleSelect = (key:string, keyPath:string[]) => {
  console.log(key, keyPath)
  if(key === '0'){
    router.push('/')
  }
  if(key === "1"){
    router.push('/connectdevice')
  }
  if(key === "2"){
    router.push('/brainprintrecord')
  }
  if(key === "3"){
    router.push('/predict1')
  }
  if(key === "4"){
    router.push('/valid1')
  }
  if(key === "5"){
    router.push('/database')
  }
}

watch(route,() => {
  if(route.path === '/'){
    activeIndex.value = '0'
  }else if(route.path === '/connectdevice'){
    activeIndex.value = '1'
  }else if(route.path === '/brainprintrecord'){
    activeIndex.value = '2'
  }else if(route.path === '/predict1'){
    activeIndex.value = '3'
  }else if(route.path === '/predict2'){
    activeIndex.value = '3'
  }else if(route.path === '/valid1'){
    activeIndex.value = '4'
  }else if(route.path === '/valid2'){
    activeIndex.value = '4'
  }else if(route.path === '/database'){
    activeIndex.value = '5'
  }
})
window.addEventListener('beforeunload',function(){
  localStorage.clear()
  sessionStorage.clear()
})


</script>

<style>
.flex-grow {
  flex-grow: 0.67;
}
#particles-js { position: absolute; top: 0%; left: 0; width: 100%; height: 100%; z-index: -998;}

body{
  background-image: url('@/assets/images/background5.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  z-index: -999;
}
.bci-title{
  /* height: 100%; */
  width: 25%;
  background-size: cover; 
}

</style>
