<template>
	<div class="flex justify-center items-center mt-[30vh] scale-[3]">
		<img :src="eyeFlag" class="invert" />
	</div>
</template>

<script lang="ts" setup>
const eyeFlag = new URL(
	'/src/assets/images/mixStimulus/eye.png',
	import.meta.url
).href;
</script>

<style scoped></style>
