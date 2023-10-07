<template>
  <a-statistic-countdown
    :value="deadline"
    style="margin-right: 50px"
    @finish="onFinish"
    :value-style="{ color: '#3f8600' }"
  >
  </a-statistic-countdown>
</template>

<script setup>
import { toRef } from "vue";
const props = defineProps(["deadline"]);
const onFinish = () => {
  // console.log("finish!")
};

const deadline = toRef(props, "deadline");
</script>

<style scoped></style>
