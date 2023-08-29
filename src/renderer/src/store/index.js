import { createStore } from 'vuex'
import createMultiTabState from 'vuex-multi-tab-state';

export default createStore({
  state: {
    // baseurl:"http://192.168.43.116:10086",
    // baseurl:"http://10.1.125.116:10086",
    // baseurl:"http://192.168.1.8:10086",
    // baseurl:"http://192.168.3.6:10086",
    baseurl:"http://127.0.0.1:10086",
    recordStartFlag:false, // 开始记录开始实验的flag
    recordPredictStartFlag:false, //脑纹识别开始实验之后的flag
    recordValidStartFlag:false, //脑纹验证开始实验之后的flag
    experimentStartFlag:false, // 点击连接设备之后的flag
    predictStartFlag:false, // 预测开始的flag
    validStartFlag:false, // 验证开始的flag
    paradigm:"",
    curpath:"/",
    mixStimulusRsvpFrequency:5, // 验证实验的混合范式中rsvp刺激的频率
    mixStimulusSsvepTrials:2, // 验证实验的混合范式中ssvep刺激 trial的个数
  },
  getters: {
    predictStatus(state){
      return state.predictStartFlag
    },
    validStatus(state){
      return state.validStartFlag
    }
  },
  mutations: {
    startRecord(state){
      state.recordStartFlag = true
    },
    closeRecord(state){
      state.recordStartFlag = false
    },
    startRecordPredict(state){
      state.recordPredictStartFlag = true
    },
    closeRecordPredict(state){
      state.recordPredictStartFlag = false
    },
    startRecordValid(state){
      state.recordValidStartFlag = true
    },
    closeRecordValid(state){
      state.recordValidStartFlag = false
    },
    startExperiment(state){
      state.experimentStartFlag = true
    },
    stopExperiment(state){
      state.experimentStartFlag = false
    },
    startPredict(state){
      state.predictStartFlag = true
    },
    stopPredict(state){
      state.predictStartFlag = false
    },
    startValid(state){
      state.validStartFlag = true
    },
    stopValid(state){
      state.validStartFlag = false
    },
    changeParadigm(state,_paradigm){
      state.paradigm = _paradigm
    },
    changePath(state,_path){
      state.curpath = _path
    },
    setMixStimulusRsvpFrequency(state,freq){
      state.mixStimulusRsvpFrequency = freq
    },
    setMixStimulusSsvepTrials(state,trial){
      state.mixStimulusSsvepTrials = trial
    }

  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createMultiTabState(),
  ],
})
