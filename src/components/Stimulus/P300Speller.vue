<template>
    <div class="parent">
        <div v-for="(num, index) in numbers"
        :key="index"
        :class="`s${num}`"
        :style="
        {
          opacity: visited[Math.floor(num/6)][num%6]? '100%' : '50%',
        } as any
      "
        >
        <p :class="`p${index}`">
            {{ getSrc(num) }}
        </p>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { Ref,ref,computed,onMounted } from 'vue';
import { useStore } from "vuex";
const store = useStore();

const getSrc = (num:number)=>{
    if(0<=num && num<26){
        return String.fromCharCode(97+num)
    }else{
        return (num-25).toString()
    }
}

const visited = ref(new Array(6).fill(null).map(()=>new Array(6).fill(null).map(()=>0)))



const numbers: Ref<number[]> = ref(
  Array.from({ length: 36 }, (_, index) => index),
);

const mixStimulusRsvpDuration =computed<number>(()=>(store.state.mixStimulusRsvpDuration))
const oneStimulusDuration:number = (mixStimulusRsvpDuration.value / 12) * 1000

onMounted(async() => {
    for(let i =0;i<6;i++){

        for(let j = 0;j<6;++j){
            visited.value[i][j] = 1
        }
        await new Promise((res)=>{
            setTimeout(res,oneStimulusDuration)
        })
        for(let j = 0;j<6;++j){
            visited.value[i][j] = 0
        }
        // await new Promise((res)=>{
        //     setTimeout(res,oneStimulusDuration)
        // })
    }

    for(let i =0;i<6;i++){
        for(let j = 0;j<6;++j){
            visited.value[j][i] = 1
        }
        await new Promise((res)=>{
            setTimeout(res,oneStimulusDuration)
        })
        for(let j = 0;j<6;++j){
            visited.value[j][i] = 0
        }
        // await new Promise((res)=>{
        //     setTimeout(res,oneStimulusDuration)
        // })
    }
})
</script>


<style scoped lang="scss">
@use "sass:math";

@mixin s($i) {
  margin: 1% 3%;
  border: 2px;
  height: 12vh;
  width: 18vh;
  background-color: black;
  animation-iteration-count: infinite;
  text-align: center;
}
.parent {
  display: flex;
  flex: auto;
  margin: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  @for $i from 0 through 36 {
    .s#{$i} {
      @include s($i);
      .p#{$i} {
        text-align: center;
        line-height: 12vh;
        font-size: 12vh;
        font-style: italic;
        font-weight: 1rem;
        color: rgba(255, 255, 255, 0.9);
        height: 100%;
        width: 100%;
      }
    }
  }


}
</style>