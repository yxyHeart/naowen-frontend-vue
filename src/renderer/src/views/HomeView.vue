<template>
  <div class="container">
    <h2 class="title">
      HDU-BMCI
    </h2>
    <p class="subtitle">
      zhejiang brain machine collaborative intelligence key laboratory
    </p>
  </div>

 
</template>

<script setup lang="ts">
// @ is an alias to /src  


</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 90vh; /* 可以设置一个适当的高度，让容器垂直居中 */
  width: 100vw;

} 
.title{
  font-size: 7rem;
  text-align: center;
  text-shadow: 8px 8px #8EC5FC;
  text-transform: uppercase;
  font-family: Teko,sans-serif;
  margin: 0;
  font-style: italic;
  color: #0093E9;
  transition: transform 0.3s ease;
}
.title:hover{
  transform: scale(1.2);
}

.subtitle{
  font-size: 2rem;
  text-align: center;
  color: #FFE53B;
  text-transform: uppercase;
}
</style>
