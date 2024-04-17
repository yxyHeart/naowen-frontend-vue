<template>
	<div class="container">
		<h2 class="title text-orange-400 font-mono">HDU-BMCI</h2>
		<p class="subtitle">
			zhejiang brain machine collaborative intelligence key laboratory
		</p>
	</div>
</template>

<script setup lang="ts">
// @ is an alias to /src
</script>

<style scoped>
.container {
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center; /* 水平居中 */
	align-items: center; /* 垂直居中 */
	height: 90vh; /* 可以设置一个适当的高度，让容器垂直居中 */
	width: 100vw;
}
.title {
	font-size: 7rem;
	text-align: center;
	text-shadow: 8px 8px #8ec5fc;
	text-transform: uppercase;
	font-family: Teko, sans-serif;
	margin: 0;
	/* font-style: italic; */
	color: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);

	transition: transform 0.3s ease;
}
.title:hover {
	transform: scale(1.2);
}

.subtitle {
	font-size: 2rem;
	text-align: center;
	color: #ffe53b;
	text-transform: uppercase;
}
</style>
