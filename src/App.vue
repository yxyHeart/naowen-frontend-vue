<template>
	<div id="app">
		<el-menu
			v-show="!isRecordStart"
			:default-active="activeIndex"
			class="el-menu-demo opacity-50"
			mode="horizontal"
			background-color="#111725"
			text-color="#ffffff"
			active-text-color="#ffffff"
			:collapse-transition="false"
			:ellipsis="false"
			@select="handleSelect"
			v-if="menuShowFlag"
		>
			<img :src="BCI" class="bci-title" />
			<div class="flex-grow"></div>
			<el-menu-item index="0">home</el-menu-item>
			<el-menu-item index="1">设备接入</el-menu-item>
			<el-menu-item index="2">脑纹录入</el-menu-item>
			<el-menu-item index="3">脑纹识别</el-menu-item>
			<el-menu-item index="4">脑纹验证</el-menu-item>
			<el-menu-item index="5">脑纹管理</el-menu-item>
			<el-menu-item index="6">脑纹防伪</el-menu-item>
		</el-menu>

		<router-view />
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref, onBeforeMount, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import BCI from '@/assets/images/BCI_title.jpg';

const router = useRouter();
const route = useRoute();

const store = useStore();

//波形展示界面 menu dont show
const menuShowFlag = ref(true);

const isRecordStart = computed(() => {
	return (
		store.state.recordStartFlag ||
		store.state.recordValidStartFlag ||
		store.state.recordPredictStartFlag
	);
});
const activeIndex: Ref<string> = ref('3');
const handleSelect = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
	if (key === '0') {
		router.push('/');
	}
	if (key === '1') {
		router.push('/connectdevice');
	}
	if (key === '2') {
		router.push('/brainprintrecord1');
	}
	if (key === '3') {
		router.push('/predict1');
	}
	if (key === '4') {
		router.push('/valid1');
	}
	if (key === '5') {
		router.push('/database');
	}
	if (key === '6') {
		router.push('/anti-fake');
	}
};

watch(route, () => {
	if (route.path === '/') {
		activeIndex.value = '0';
	} else if (route.path === '/connectdevice') {
		activeIndex.value = '1';
	} else if (route.path === '/brainprintrecord1') {
		activeIndex.value = '2';
	} else if (route.path === '/brainprintrecord2') {
		activeIndex.value = '2';
	} else if (route.path === '/predict1') {
		activeIndex.value = '3';
	} else if (route.path === '/predict2') {
		activeIndex.value = '3';
		menuShowFlag.value = false;
	} else if (route.path === '/valid1') {
		activeIndex.value = '4';
	} else if (route.path === '/valid2') {
		activeIndex.value = '4';
		menuShowFlag.value = false;
	} else if (route.path === '/database') {
		activeIndex.value = '5';
	} else if (route.path === '/anti-fake') {
		activeIndex.value = '6';
	}
});
window.addEventListener('beforeunload', function () {
	localStorage.clear();
	sessionStorage.clear();
});

watch(route, () => {
	if (route.path.includes('database')) {
		document.body.style.overflow = 'scroll';
	} else [(document.body.style.overflow = 'hidden')];
});
</script>

<style scoped>
.flex-grow {
	flex-grow: 0.67;
}
</style>

<style lang="scss">
body {
	background-color: rgb(17 23 37);
	/* background-image: url('@/assets/images/background5.png'); */
	background-repeat: no-repeat;
	background-position: center center;
	background-size: cover;
	z-index: -999;
}
.bci-title {
	height: 57.6px;
	/* height: 57.6px; */
	background-size: cover;
}
</style>
