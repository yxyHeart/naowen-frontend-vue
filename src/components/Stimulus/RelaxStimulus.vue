<template>
	<div
		v-if="isRecordStart"
		class="mx-auto mt-[10vh] w-[80vw] h-[80vh] flex justify-center items-center"
	>
		<img :src="ten" class="w-[70%] h-[100%]" />
	</div>
</template>

<script lang="ts" setup>
import ten from '@/assets/images/relax/ten.jpg';
import { ref, computed, watch, Ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isRecordStart = computed(() => {
	return (
		store.state.recordStartFlag ||
		store.state.recordValidStartFlag ||
		store.state.recordPredictStartFlag
	);
});
const duration: Ref<number> = computed(() => {
	return store.state.relaxTime;
});
</script>
