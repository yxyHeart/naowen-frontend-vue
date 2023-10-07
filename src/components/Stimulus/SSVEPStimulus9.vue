<template>
  <div class="parent">
    <div
      v-for="(index, num) in numbers.slice(0,9)"
      :key="index"
      :class="`s${num}`"
      :style="
        {
          animationIterationCount: stimulusStartFlag ? 'infinite' : '1',
          animationDuration: freqs[num<=3?num:num-1],
        } as blockStyle
      "
    >
      <p :class="`p${index}`">
        <!-- <img :src="getSrc(num)" class="w-[100%] h-[100%] invert" /> -->
        <div class="w-[100%] h-[100%] bg-white"></div>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref, Ref, computed } from "vue";
import { useStore } from "vuex";
const numbers: Ref<number[]> = ref(
  Array.from({ length: 40 }, (_, index) => index),
);
const store = useStore();
const stimulusStartFlag: Ref<boolean> = computed(() => {
  return (
    store.state.recordStartFlag ||
    store.state.recordValidStartFlag ||
    store.state.recordPredictStartFlag
  );
});

type blockStyle = {
  animationIterationCount:string
  animationDuration:string
}
const getChar = (num: number) => {
  const fuhao = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "+",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "-",
    "*",
    "/",
  ];
  return fuhao[num];
};

const getSrc = (num:number)=>{
  const ret = []
  for(let i =1;i<10;++i){
    ret.push(new URL(`/src/assets/images/ssvep/${i}.jpg`, import.meta.url).href)
  }
  return ret[num]
  
}
const freqs: Ref<string[]> = computed(() => {
  const ret = store.getters.mixStimulusSsvepFrequencies.map((freq: number) => {
    return freq.toString() + "s";
  });
  // console.log(store.getters.mixStimulusSsvepFrequencies)
  return ret
});



</script>

<style scoped lang="scss">
@use "sass:math";

@mixin s($i) {
  margin: 4% 9%;
  border: 1px;
  height: 20vh;
  width: 20vh;
  text-align: center;
  @if $i != 4{
    background-color: white;
    animation: a1;
    animation-iteration-count: infinite;
  }

  
}
.parent {
  display: flex;
  flex: auto;
  margin: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  @for $i from 0 through 9 {
    .s#{$i} {
      @include s($i);
      .p#{$i} {
        // text-align: center;
        // line-height: 19vh;
        // font-size: 300px;
        // font-style: italic;
        // font-weight: 1rem;
        // color: rgba(255, 255, 255, 0.9);
        // height: 100%;
        // width: 100%;
      }
    }
  }

  @keyframes a1 {
    0% {
      opacity: 50%;
    }
    12.5%{
      opacity: 85.3%;
    }
    25%{
      opacity: 100%;
    }
    37.5%{
      opacity: 85.3%;
    }
    50%{
      opacity: 50%;
    }
    62.5%{
      opacity: 14.6%;
    }
    75% {
      opacity: 0%;
    }
    87.5% {
      opacity: 14.6%;
    }
    100%{
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
