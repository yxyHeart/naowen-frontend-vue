<template>
  <el-select
    v-model="value"
    class="m-2"
    placeholder="请先选择范式"
    size="large"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const value = ref("");

const options = [
  {
    value: "rsvp",
    label: "rsvp",
  },
  {
    value: "ssvep",
    label: "ssvep",
  },
  {
    value: "mi",
    label: "mi",
  },
  {
    value: "mixStimulus",
    label: "mixStimulus",
  },
  {
    value: "relax",
    label: "relax",
  },
];

watch(value, (newParadigm) => {
  store.commit("changeParadigm", newParadigm);
});
</script>

<style scoped></style>
