<template>
  
    <!-- Form -->
    <el-button @click="dialogFormVisible = true" type="primary" round>
      <div class="param-setter-text">实验参数设置</div>
    </el-button>
  
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="form">

        <el-form-item label="SSVEP Trial" :label-width="formLabelWidth">
          <el-select v-model="form.ssvepTrial" placeholder="Please select ssvep trial">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
          </el-select>
        </el-form-item>

        <el-form-item label="SSVEP Frequency0" :label-width="formLabelWidth">
          <el-input v-model="form.ssvepFreq0" />
        </el-form-item>

        <el-form-item label="SSVEP Frequency1" :label-width="formLabelWidth">
          <el-input v-model="form.ssvepFreq1" />
        </el-form-item>

        <el-form-item label="SSVEP Frequency2" :label-width="formLabelWidth">
          <el-input v-model="form.ssvepFreq2" />
        </el-form-item>

        <el-form-item label="SSVEP Frequency3" :label-width="formLabelWidth"> 
          <el-input v-model="form.ssvepFreq3" />
        </el-form-item>

        <el-form-item label="RSVP Ferquency" :label-width="formLabelWidth">
          <el-select v-model="form.rsvpFrequency" placeholder="Please select rsvp frequency">
            <el-option label="2hz" value="2" />
            <el-option label="3.3hz" value="3.3" />
            <el-option label="5hz" value="5" />
          </el-select>
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
  import { reactive, ref } from 'vue'
  import { useStore } from 'vuex';
  const dialogFormVisible = ref(false)
  const formLabelWidth = '140px'
  const store = useStore()

  interface Form{
    ssvepTrial:number,
    rsvpFrequency:number,
    ssvepFreq0:number,
    ssvepFreq1:number,
    ssvepFreq2:number,
    ssvepFreq3:number,
  }
  const form:Form = reactive({
    ssvepTrial:1,
    rsvpFrequency:2,
    ssvepFreq0:8,
    ssvepFreq1:10,
    ssvepFreq2:12,
    ssvepFreq3:14,

  })

  const handleClickSubmitParams = ()=>{
    dialogFormVisible.value = false
    store.commit('setMixStimulusRsvpFrequency',form.ssvepTrial)
    store.commit('setMixStimulusSsvepTrials',form.ssvepTrial)
  }
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
  .param-setter-text{
    color: #000;
  }
  </style>
  
  