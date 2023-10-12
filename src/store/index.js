import { createStore } from "vuex";
import createMultiTabState from "vuex-multi-tab-state";

export default createStore({
  state: {
    baseurl:import.meta.env.VITE_BASE_API,
    recordStartFlag: false, // 开始记录开始实验的flag
    recordPredictStartFlag: false, //脑纹识别开始实验之后的flag
    recordValidStartFlag: false, //脑纹验证开始实验之后的flag
    experimentStartFlag: false, // 点击连接设备之后的flag
    predictStartFlag: false, // 预测开始的flag
    validStartFlag: false, // 验证开始的flag
    subject: "",
    paradigm: "",
    curpath: "/",

    mixStimulusAllTrials: 25,
    mixStimulusSsvepTrials: 1, // 验证实验的混合范式中ssvep刺激 trial的个数
    mixStimulusSsvepTrialsDuration:3,
    mixStimulusSsvepStartFrequency: 8,
    mixStimulusSsvepIntervalFrequency: 2,
    mixStimulusTeethTrials:1,
    mixStimulusTeethDuration:1,
    mixStimulusRsvpFrequency: 5, // 验证实验的混合范式中rsvp刺激的频率
    mixStimulusRsvpTrials:0,
    mixStimulusRsvpDuration:1.5,


    ssvepTrials: 10,
    ssvepTrialsDuration: 3,
    ssvepStartFrequency: 8,
    ssvepIntervalFrequency: 2,

    rsvpFrequency: 5,
    rsvpSessions: 2,

    miSessions: 5,
    miTrials: 100,
    miTaskPromptTime: 2,
    miMotorImageryTime: 4,
    miRelaxTime: 2,

    relaxTime: 30,
    
  },
  getters: {
    mixStimulusSsvepFrequencies(state) {
      let freqs = []
      for(let i = 0;i<40;i++){
        freqs.push(1/(state.mixStimulusSsvepStartFrequency + state.mixStimulusSsvepIntervalFrequency  * i))
      }
      return freqs
    },
    ssvepFrequencies(state){
      let freqs = []
      for(let i = 0;i<40;i++){
        freqs.push(1/(state.ssvepStartFrequency + state.ssvepIntervalFrequency  * i))
      }
      return freqs
    },
    rsvpAllTime(state) {
      return ((1 / state.rsvpFrequency) * 200 + 10) * state.rsvpSessions * 1000;
    },
    ssvepAllTime(state) {
      return (state.ssvepTrialsDuration + 1) * state.ssvepTrials * 1000;
    },
    miAllTime(state) {
      return (
        ((state.miTaskPromptTime +
          state.miMotorImageryTime +
          state.miRelaxTime) *
          state.miTrials +
          10) *
        state.miSessions *
        1000
      );
    },
    mixStimulusAllTime(state) {
      return (
        ((state.mixStimulusSsvepTrials * 3 + 1
          + state.mixStimulusTeethTrials * state.mixStimulusTeethDuration + 1
          + state.mixStimulusRsvpTrials * state.mixStimulusRsvpDuration
          +10
          ) *
          state.mixStimulusAllTrials -
          10) *
        1000
      );
    },
    mixStimulusOneTrialTime(state) {
      return (state.mixStimulusSsvepTrials * 3 + Math.max(0, state.mixStimulusSsvepTrials-1) * 1
         + state.mixStimulusTeethTrials * state.mixStimulusTeethDuration + Math.max(0, state.mixStimulusTeethTrials-1)*1
         + state.mixStimulusRsvpTrials * state.mixStimulusRsvpDuration + Math.max(0, state.mixStimulusRsvpTrials-1)*1
         +(state.mixStimulusSsvepTrials > 0?1:0 + state.mixStimulusTeethTrials>0?1:0 + state.mixStimulusRsvpTrials>0?1:0 -1) *1
         ) * 1000;
    },
    relaxAllTime(state){
      return state.relaxTime
    }
  },
  mutations: {
    startRecord(state) {
      state.recordStartFlag = true;
    },
    stopRecord(state) {
      state.recordStartFlag = false;
    },
    startRecordPredict(state) {
      state.recordPredictStartFlag = true;
    },
    stopRecordPredict(state) {
      state.recordPredictStartFlag = false;
    },
    startRecordValid(state) {
      state.recordValidStartFlag = true;
    },
    stopRecordValid(state) {
      state.recordValidStartFlag = false;
    },
    startExperiment(state) {
      state.experimentStartFlag = true;
    },
    stopExperiment(state) {
      state.experimentStartFlag = false;
    },
    startPredict(state) {
      state.predictStartFlag = true;
    },
    stopPredict(state) {
      state.predictStartFlag = false;
    },
    startValid(state) {
      state.validStartFlag = true;
    },
    stopValid(state) {
      state.validStartFlag = false;
    },
    changeParadigm(state, _paradigm) {
      state.paradigm = _paradigm;
    },
    changePath(state, _path) {
      state.curpath = _path;
    },
    setMixStimulus(state, info) {
      state.mixStimulusAllTrials = info.mixStimulusAllTrials;
      state.mixStimulusRsvpFrequency = info.mixStimulusRsvpFrequency;
      state.mixStimulusSsvepTrials = info.mixStimulusSsvepTrials;
      state.mixStimulusSsvepTrialsDuration = info.mixStimulusSsvepTrialsDuration;
      state.mixStimulusSsvepStartFrequency = info.mixStimulusSsvepStartFrequency;
      state.mixStimulusSsvepIntervalFrequency = info.mixStimulusSsvepIntervalFrequency;
      state.mixStimulusTeethTrials = info.mixStimulusTeethTrials;
      state.mixStimulusTeethDuration = info.mixStimulusTeethDuration;
      state.mixStimulusRsvpTrials = info.mixStimulusRsvpTrials;
      state.mixStimulusRsvpDuration = info.mixStimulusRsvpDuration;
    },
    setSsvep(state, info) {
      state.ssvepTrials = info.ssvepTrials;
      state.ssvepTrialsDuration = info.ssvepTrialsDuration;
      state.ssvepStartFrequency = info.ssvepStartFrequency;
      state.ssvepIntervalFrequency = info.ssvepIntervalFrequency;
    },
    setRsvp(state, info) {
      state.rsvpFrequency = info.rsvpFrequency;
      state.rsvpSessions = info.rsvpSessions;
    },
    setMi(state, info) {
      (state.miSessions = info.miSessions),
        (state.miTrials = info.miTrials),
        (state.miTaskPromptTime = info.miTaskPromptTime),
        (state.miMotorImageryTime = info.miMotorImageryTime),
        (state.miRelaxTime = info.miRelaxTime);
    },
    setRelax(state, info) {
      state.relaxTime = info.relaxTime;
    },

    setSubject(state, _subject) {
      state.subject = _subject;
    },
  },
  actions: {},
  modules: {},
  plugins: [createMultiTabState()],
});
