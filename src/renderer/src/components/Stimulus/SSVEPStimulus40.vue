<template>
    <div class="parent" >
        <div v-for="(index,num) in numbers" :key="index" :class="`s${num}`" :style="{animationIterationCount: stimulusStartFlag ? 'infinite': '1'}">
            <p :class="`p${index}`">{{ 
                getChar(num)
                
            }}</p>
        </div>
    </div>

</template>

<script lang="ts" setup>

import { ref,Ref,computed} from 'vue';
import { useStore } from 'vuex';
const numbers:Ref<number []> = ref(Array.from({length:40},(_,index)=>index))
const store = useStore()
const stimulusStartFlag:Ref<boolean> = computed(()=>{
  return store.state.recordStartFlag || store.state.recordValidStartFlag || store.state.recordPredictStartFlag
})

const getChar = (num:number)=>{
    const fuhao = [
                    '0','1','2','3','4','5','6','7','8','9',
                    'q','w','e','r','t','y','u','i','o','p',
                    'a','s','d','f','g','h','j','k','l','+',
                    'z','x','c','v','b','n','m','-','*','/',
                ]
    return fuhao[num]
}
</script>

<style scoped lang="scss">

@use 'sass:math';
@mixin s($f){
    margin: 10px;
    border: 5px;
    height:8.5vw;
    width:8.5vw;
    background-color: black;
    animation: a1;
    animation-duration: #{$f}s;
    animation-iteration-count: infinite;
    text-align: center;
}
.parent{
    display: flex;
    flex:auto;
    margin: 10px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    @for $i from 0 through 40{
        .s#{$i}{
            
            @include s(#{math.div(1, 8 + $i * 0.2)});
            .p#{$i}{
                // text-align: center;
                line-height: 8.5vw;
                font-size: 100px;
                font-style: italic;
                font-weight: 2rem;
                color: rgba(255,255,255,0.9);
            }
        }
    }

    @keyframes a1 {
        0%{
            opacity: 0;
        }
        50%{
            opacity: 50%;
        }
        100%{
            opacity:100%;
        }
    }

}
</style>