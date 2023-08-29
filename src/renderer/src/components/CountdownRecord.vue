<template>

    <a-statistic-countdown
        title="Countdown"
        :value="deadline"
        style="margin-right: 50px"
        @finish="onFinish"
    />
</template>

<script setup>
import {toRef} from 'vue';
const props = defineProps(['deadline'])
const onFinish = ()=>{
    // console.log("finish!")
}

const deadline = toRef(props,'deadline')

</script>