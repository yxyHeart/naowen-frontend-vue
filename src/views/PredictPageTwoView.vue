<template>
  <div class="recognize">
    <BciWave />
    <PredictPeople />
  </div>
</template>

<script lang="ts" setup>
// @ is an alias to /src
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import BciWave from "@/components/BciWave.vue";
import PredictPeople from "@/components/PredictPeople.vue";
const route = useRoute();
const store = useStore();

onBeforeMount(() => {
  store.commit("changePath", route.path);
});
</script>

<style scoped>
.recognize {
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
}
</style>
