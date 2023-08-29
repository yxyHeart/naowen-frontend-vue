<template>
    <RelaxStatus v-if="relaxStartFlag"/>
    <SSVEPStimulus v-if="ssvepStartFlag"/>
    <TeethStimulus v-if="teethStartFlag" />
    <EyeStimulus v-if="eyeStartFlag" />
    <RsvpStimulus v-if="rsvpStartFlag" />

</template>

<script lang="ts" setup>

import RsvpStimulus from '@/components/Stimulus/RsvpStimulusShort.vue'
import SSVEPStimulus from '@/components/Stimulus/SSVEPStimulus4.vue';
import RelaxStatus from './RelaxStatus.vue';
import TeethStimulus from './TeethStimulus.vue'
import EyeStimulus from './EyeStimulus.vue'
import {Ref,ref,computed,watch} from 'vue'
import {useStore} from 'vuex'


const store = useStore()
const ssvepStartFlag:Ref<boolean> = ref(false)
const teethStartFlag:Ref<boolean> = ref(false)
const eyeStartFlag:Ref<boolean> = ref(false)
const rsvpStartFlag:Ref<boolean> = ref(false)
const relaxStartFlag:Ref<boolean> = ref(false)


    
const stimulusStartFlag:Ref<boolean> = computed(()=>{
    return store.state.recordValidStartFlag
})

const startExperiment = async()=>{
    const n_trial = store.state.mixStimulusSsvepTrials
    for(let i=0;i<n_trial;i++){

        // 休息1s
        relaxStartFlag.value = true
        await new Promise((resolve)=>{
            setTimeout(resolve, 1000);
        })
        relaxStartFlag.value = false

        // ssvep 开始
        ssvepStartFlag.value = true
        await new Promise((resolve)=>{
            setTimeout(resolve, 3000);
        })
        ssvepStartFlag.value = false
        
    }


    // 咬牙开始
    teethStartFlag.value = true
    await new Promise((resolve)=>{
        setTimeout(resolve, 1000);
    })
    teethStartFlag.value = false

    // 眨眼开始
    eyeStartFlag.value = true
    await new Promise((resolve)=>{
        setTimeout(resolve, 1000);
    })
    eyeStartFlag.value = false

    // 休息1s
    relaxStartFlag.value = true
    await new Promise((resolve)=>{
        setTimeout(resolve, 1000);
    })
    relaxStartFlag.value = false

    // rsvp开始
    rsvpStartFlag.value = true
    await new Promise((resolve)=>{
        setTimeout(resolve, 3000);
    })
    rsvpStartFlag.value = false

    store.commit('closeRecordValid')
    store.commit("stopValid")
}
watch(stimulusStartFlag,(newStatus)=>{
    if(newStatus === true){
        startExperiment()
    }
})

</script>