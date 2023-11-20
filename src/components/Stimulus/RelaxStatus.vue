<template>
  <div class="flex justify-center items-center mt-[42vh] scale-[7] text-white">
    休息{{relaxTime}}s!
  </div>
</template>

<script setup>
import { toRef } from 'vue';
const props = defineProps(["relaxTime"]);
const relaxTime = toRef(props,"relaxTime")
</script>
