<template>
  <!-- Form -->
  <el-button @click="dialogFormVisible = true" type="primary" round>
    <div class="param-setter-text">实验参数设置</div>
  </el-button>

  <el-dialog v-model="dialogFormVisible" title="实验参数设置">
    <el-form
      :model="form"
      class="flex flex-col justify-center items-center h-[100%]"
    >
      <el-form-item label="Subject Name" :label-width="formLabelWidth" required prop="subject">
        <el-input v-model="form.subject" />
      </el-form-item>

      <!-- mixStimulus -->
      <el-form-item
        label="All Trials"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'mixStimulus'"
      >
        <el-select
          v-model="form.mixStimulusAllTrials"
          placeholder="Please select all trial"
        >
          <el-option label="2" value="2" />
          <el-option label="20" value="20" />
          <el-option label="25" value="25" />
        </el-select>
      </el-form-item>

      <el-form-item
        label="RSVP Ferquency"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'mixStimulus'"
      >
        <el-select
          v-model="form.mixStimulusRsvpFrequency"
          placeholder="Please select rsvp frequency"
        >
          <el-option label="2hz" value="2" />
          <el-option label="3.3hz" value="3.3" />
          <el-option label="5hz" value="5" />
        </el-select>
      </el-form-item>

      <el-form-item
        label="SSVEP Trials"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'mixStimulus'"
      >
        <el-select
          v-model="form.mixStimulusSsvepTrials"
          placeholder="Please select ssvep trial"
        >
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
        </el-select>
      </el-form-item>


      <el-form-item
        label="SSVEP Trial Duration"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'mixStimulus'"
      >
        <el-select
          v-model="form.mixStimulusSsvepTrialsDuration"
          placeholder="Please select ssvep trial duration"
        >
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
          <el-option label="5" value="5" />
        </el-select>
      </el-form-item>

      <el-form-item
        label="MixStimulus SSVEP Start Ferquency"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'mixStimulus'"
      >
        <el-input v-model="form.mixStimulusSsvepStartFrequency" />
      </el-form-item>

      <el-form-item
        label="MixStimulus SSVEP Interval Ferquency"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'mixStimulus'"
      >
        <el-input v-model="form.mixStimulusSsvepIntervalFrequency" />
      </el-form-item>

      <!-- ssvep -->
      <el-form-item
        label="SSVEP Trials"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'ssvep'"
      >
        <el-input v-model="form.ssvepTrials" />
      </el-form-item>

      <el-form-item
        label="SSVEP Start Ferquency"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'ssvep'"
      >
        <el-input v-model="form.ssvepStartFrequency" />
      </el-form-item>

      <el-form-item
        label="SSVEP Interval Ferquency"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'ssvep'"
      >
        <el-input v-model="form.ssvepIntervalFrequency" />
      </el-form-item>

      <el-form-item
        label="SSVEP Trial Duration"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'ssvep'"
      >
        <el-select
          v-model="form.ssvepTrialsDuration"
          placeholder="Please select ssvep trial duration"
        >
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
          <el-option label="5" value="5" />
        </el-select>
      </el-form-item>

      <!-- rsvp -->
      <el-form-item
        label="RSVP Sessions"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'rsvp'"
      >
        <el-input v-model="form.rsvpSessions" />
      </el-form-item>

      <el-form-item
        label="RSVP Ferquency"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'rsvp'"
      >
        <el-select
          v-model="form.rsvpFrequency"
          placeholder="Please select rsvp frequency"
        >
          <el-option label="2hz" value="2" />
          <el-option label="3.3hz" value="3.3" />
          <el-option label="5hz" value="5" />
        </el-select>
      </el-form-item>

      <!-- mi -->
      <el-form-item
        label="Mi Sessions"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'mi'"
      >
        <el-input v-model="form.miSessions" />
      </el-form-item>

      <el-form-item
        label="Mi Trials"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'mi'"
      >
        <el-input v-model="form.miTrials" />
      </el-form-item>
      <el-form-item
        label="Mi Task Prompt Time"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'mi'"
      >
        <el-input v-model="form.miTaskPromptTime" />
      </el-form-item>
      <el-form-item
        label="Mi Motor Imagery Time"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'mi'"
      >
        <el-input v-model="form.miMotorImageryTime" />
      </el-form-item>
      <el-form-item
        label="Mi Relax Time"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'mi'"
      >
        <el-input v-model="form.miRelaxTime" />
      </el-form-item>

      <!-- relax -->
      <el-form-item
        label="Relax Time"
        :label-width="formLabelWidth"
        v-if="curParadigm === 'relax'"
      >
        <el-input v-model="form.relaxTime" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleClickSubmitParams">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { createStimulusParamsApi } from "@/api/experiment"
import { ElMessage } from "element-plus"
import { useStore } from "vuex";


const dialogFormVisible = ref(false);
const formLabelWidth = "300px";
const store = useStore();
const curParadigm = computed(() => {
  return store.state.paradigm;
});

const curDuration = computed(() => {
  if (curParadigm.value === "mi") {
    return store.getters.miAllTime;
  } else if (curParadigm.value === "ssvep") {
    return store.getters.ssvepAllTime;
  } else if (curParadigm.value === "mixStimulus") {
    return store.getters.mixStimulusAllTime;
  } else if (curParadigm.value === "relax") {
    return store.getters.relaxAllTime;
  } else if (curParadigm.value === "rsvp") {
    return store.getters.rsvpAllTime;
  }
});

interface Form {
  subject: string;
  mixStimulusAllTrials: number;
  mixStimulusSsvepTrials:number
  mixStimulusRsvpFrequency: number;
  mixStimulusSsvepTrialsDuration:number,
  mixStimulusSsvepStartFrequency:number,
  mixStimulusSsvepIntervalFrequency:number,

  ssvepTrials: number;
  ssvepTrialsDuration: number;
  ssvepStartFrequency: number;
  ssvepIntervalFrequency: number;

  rsvpFrequency: number;
  rsvpSessions: number;

  miSessions: number;
  miTrials: number;
  miTaskPromptTime: number;
  miMotorImageryTime: number;
  miRelaxTime: number;

  relaxTime: number;
  
}
const form: Form = reactive({
  //mixStimulus
  mixStimulusAllTrials: 25,
  mixStimulusRsvpFrequency: 5,
  mixStimulusSsvepTrials:1,
  mixStimulusSsvepTrialsDuration:3,
  mixStimulusSsvepStartFrequency:8,
  mixStimulusSsvepIntervalFrequency:2,
  // ssvep
  ssvepTrials: 10,
  ssvepTrialsDuration: 3,
  ssvepStartFrequency: 8,
  ssvepIntervalFrequency: 2,
  //rsvp
  rsvpFrequency: 5,
  rsvpSessions: 2,
  //mi
  miSessions: 2,
  miTrials: 5,
  miTaskPromptTime: 2,
  miMotorImageryTime: 4,
  miRelaxTime: 2,
  //relax
  relaxTime: 30,
  //subjectName
  subject: "",
});

const handleClickSubmitParams = async () => {
  dialogFormVisible.value = false;
  store.commit("setMixStimulus", {
    mixStimulusAllTrials: form.mixStimulusAllTrials,
    mixStimulusRsvpFrequency: form.mixStimulusRsvpFrequency,
    mixStimulusSsvepTrials: form.mixStimulusSsvepTrials,
    mixStimulusSsvepTrialsDuration: form.mixStimulusSsvepTrialsDuration,
    mixStimulusSsvepStartFrequency:form.mixStimulusSsvepStartFrequency,
    mixStimulusSsvepIntervalFrequency:form.mixStimulusSsvepIntervalFrequency,
  });

  store.commit("setSsvep", {
    ssvepTrials: form.ssvepTrials,
    ssvepTrialsDuration: form.ssvepTrialsDuration,
    ssvepStartFrequency: form.ssvepStartFrequency,
    ssvepIntervalFrequency: form.ssvepIntervalFrequency,
  });

  store.commit("setRsvp", {
    rsvpFrequency: form.rsvpFrequency,
    rsvpSessions: form.rsvpSessions,
  });

  store.commit("setMi", {
    miSessions: form.miSessions,
    miTrials: form.miTrials,
    miTaskPromptTime: form.miTaskPromptTime,
    miMotorImageryTime: form.miMotorImageryTime,
    miRelaxTime: form.miRelaxTime,
  });

  store.commit("setRelax", {
    relaxTime: form.relaxTime,
  });
  store.commit("setSubject", form.subject);
  if(form.subject === ''){
    ElMessage({
      message: "请输入被试姓名!",
      type: "error",
    });
    return 
  }
  createStimulusParamsApi({
    subject:form.subject,
    paradigm: curParadigm.value,
    duration: curDuration.value, 
  })
  .then((err)=>{
    console.log(err)
  })
    
};
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.param-setter-text {
  color: #000;
}
</style>
