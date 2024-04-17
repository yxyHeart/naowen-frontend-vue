<template>
	<div class="flex justify-center items-center mt-[40vh] scale-[3]">
		<img :src="addFlag" class="invert" />
	</div>
</template>

<script lang="ts" setup>
const addFlag = new URL(
	'/src/assets/images/mixStimulus/add.png',
	import.meta.url
).href;
</script>

<style scoped></style>
