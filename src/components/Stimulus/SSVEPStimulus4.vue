<template>
	<div class="parent">
		<div
			v-for="(index, num) in numbers"
			:key="index"
			:class="`s${num}`"
			:style="{ animationIterationCount: stimulusStartFlag ? 'infinite' : '1' }"
		>
			<!-- <p :class="`p${index}`">{{ 
                getChar(num)
                
            }}</p> -->
			<p :class="`p${index}`">
				<img :src="getSrc(num)" class="w-[100%] h-[100%]" />
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, Ref, computed } from 'vue';
import { useStore } from 'vuex';

import up from '@/assets/images/ssvep/up.png';
import down from '@/assets/images/ssvep/down.png';
import left from '@/assets/images/ssvep/left.png';
import right from '@/assets/images/ssvep/right.png';

const numbers: Ref<number[]> = ref(
	Array.from({ length: 4 }, (_, index) => index)
);
const store = useStore();
const stimulusStartFlag: Ref<boolean> = computed(() => {
	return (
		store.state.recordStartFlag ||
		store.state.recordValidStartFlag ||
		store.state.recordPredictStartFlag
	);
});

const freqs: Ref<number[]> = computed(() => {
	const ret = store.getters.mixStimulusSsvepFrequencies.map((freq: number) => {
		return freq.toString() + 's';
	});
	return ret;
});
const getChar = (num: number) => {
	const fuhao = ['\u2191', '\u2190', '\u2192', '\u2193'];
	return fuhao[num];
};
const getSrc = (num: number) => {
	const imgs = [up, left, right, down];
	return imgs[num];
};
</script>

<style scoped lang="scss">
@use 'sass:math';
@mixin s($i) {
	border: 2px;
	height: 25vh;
	width: 25vh;
	background-color: black;
	animation: a1;
	@if $i == 0 {
		animation-duration: v-bind('freqs[0]');
	} @else if $i == 1 {
		animation-duration: v-bind('freqs[1]');
	} @else if $i == 2 {
		animation-duration: v-bind('freqs[2]');
	} @else if $i == 3 {
		animation-duration: v-bind('freqs[3]');
	}

	// animation-duration: #{$f}s;
	animation-iteration-count: infinite;
	text-align: center;
}
.parent {
	height: 100vh;
	width: 100vw;
	display: flex;
	flex: auto;
	margin: 1vh auto;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	@for $i from 0 through 4 {
		.s#{$i} {
			@if $i == 0 {
				margin-top: 2%;
				margin-left: 42%;
				margin-right: 40%;
			} @else if $i == 1 {
				margin-left: 7%;
				margin-right: 7%;
				margin-top: 4%;
				margin-bottom: 4%;
			} @else if $i == 2 {
				margin-left: 7%;
				margin-right: 7%;
				margin-top: 4%;
				margin-bottom: 4%;
			} @else if $i == 3 {
				margin-left: 42%;
				margin-right: 40%;
				margin-bottom: 2%;
			}
			@include s($i);
			.p#{$i} {
				// line-height: 13vw;
				// font-size: 100px;
				// font-style: normal;
				// font-weight: 5000;
				width: 100%;
				height: 100%;
				// color: rgba(255,255,255,0.9);
			}
		}
	}
	@keyframes a1 {
		0% {
			opacity: 50%;
		}
		12.5% {
			opacity: 85.3%;
		}
		25% {
			opacity: 100%;
		}
		37.5% {
			opacity: 85.3%;
		}
		50% {
			opacity: 50%;
		}
		62.5% {
			opacity: 14.6%;
		}
		75% {
			opacity: 0%;
		}
		87.5% {
			opacity: 14.6%;
		}
		100% {
			opacity: 50%;
		}
		// 0% {
		//   opacity: 0%;
		// }
		// 50%{
		//   opacity: 100%;
		// }
		// 100%{
		//   opacity: 0%;
		// }
	}
}
</style>
