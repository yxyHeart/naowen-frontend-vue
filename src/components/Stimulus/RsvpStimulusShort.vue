<template>
  <div class="w-[70vw] h-[50vh] mx-auto mt-[10vh]">
    <el-row>
      <el-col :span="8" :offset="0">
        <el-card :body-style="{ height: '70vh' }">
          <div class="flex flex-col h-[100%] items-center justify-around">
            <span>请注意以下目标</span>
            <img
              v-for="(image, index) in images"
              :key="index"
              :src="image"
              :style="getStyle1(index)"
              class="img1"
            />
          </div>
        </el-card>
      </el-col>

      <el-col :span="8" :offset="6">
        <el-card :body-style="{ height: '70vh' }">
          <div class="flex flex-col h-[100%] items-center justify-around">
            <span>刺激呈现区</span>
            <img
              v-for="(image, index) in images"
              :key="index"
              :src="image"
              :style="getStyle2(index)"
              class="img2"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, onMounted, Ref } from "vue";

import { useStore } from "vuex";

const store = useStore();

const images: Ref<string[]> = ref([]);

const getImg = async () => {
  for (let i = 0; i < 1000; i++) {
    images.value.push(
      new URL(`/src/assets/images/rsvp/${i}.jpg`, import.meta.url).href,
    );
  }
};

const targetIndex = ref(0);
const currentIndex = ref(200);

const duration = computed(() => {
  return (1 / store.state.mixStimulusRsvpFrequency) * 1000;
});

const startExperiment = async () => {
  let iterTimes = (3 * 1000) / duration.value;
  while (iterTimes > 0) {
    await new Promise((resolve) => {
      setTimeout(resolve, duration.value);
    });
    currentIndex.value = Math.floor(Math.random() * 1000);
    iterTimes--;
  }


};

const getStyle1 = (index: number) => {
  return {
    display: index === targetIndex.value ? "block" : "none",
  };
};

const getStyle2 = (index: number) => {
  return {
    display: index === currentIndex.value ? "block" : "none",
  };
};

onMounted(async () => {
  await getImg();
  startExperiment();
});
</script>

<style scoped>
/* .container{
  margin: 0 auto;
  width: 70vw;
  height: 80vh;
} */
.img1 {
  width: 70%;
  height: 85%;
}
.img2 {
  width: 70%;
  height: 85%;
}
</style>
