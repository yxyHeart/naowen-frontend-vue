import { createStore } from 'vuex';
import createMultiTabState from 'vuex-multi-tab-state';

export default createStore({
	state: {
		baseurl: import.meta.env.VITE_BASE_API,
		recordStartFlag: false, // 开始记录开始实验的flag
		recordPredictStartFlag: false, //脑纹识别开始实验之后的flag
		recordValidStartFlag: false, //脑纹验证开始实验之后的flag
		experimentStartFlag: false, // 点击连接设备之后的flag
		predictStartFlag: false, // 预测开始的flag
		validStartFlag: false, // 验证开始的flag
		subject: '',
		curParadigm: '',
		curpath: '/',

		intervalTime: 10,

		mixStimulusAllTrials: 25,
		mixStimulusSsvepTrials: 1, // 验证实验的混合范式中ssvep刺激 trial的个数
		mixStimulusSsvepTrialsDuration: 3,
		mixStimulusSsvepStartFrequency: 8,
		mixStimulusSsvepIntervalFrequency: 0.5,
		mixStimulusTeethTrials: 1,
		mixStimulusTeethDuration: 1,
		mixStimulusRsvpFrequency: 5, // 验证实验的混合范式中rsvp刺激的频率
		mixStimulusRsvpTrials: 1,
		mixStimulusRsvpDuration: 1,

		ssvepTrials: 10,
		ssvepOneTrialDuration: 3,
		ssvepStartFrequency: 8,
		ssvepIntervalFrequency: 2,

		rsvpTrials: 2,
		rsvpOneTrialDuration: 1.5,
		rsvpFrequency: 5,

		miTrials: 100,
		miTaskPromptTime: 2,
		miMotorImageryTime: 4,
		miRelaxTime: 2,

		relaxTrials: 1,
		relaxOneTrialDuration: 30
	},
	getters: {
		mixStimulusSsvepFrequencies(state) {
			let freqs = [];
			for (let i = 0; i < 40; i++) {
				freqs.push(
					1 /
						(state.mixStimulusSsvepStartFrequency +
							state.mixStimulusSsvepIntervalFrequency * i)
				);
			}
			return freqs;
		},
		ssvepFrequencies(state) {
			let freqs = [];
			for (let i = 0; i < 40; i++) {
				freqs.push(
					1 / (state.ssvepStartFrequency + state.ssvepIntervalFrequency * i)
				);
			}
			return freqs;
		},
		rsvpAllTime(state) {
			return ((state.rsvpOneTrialDuration + 10) * state.rsvpTrials - 10) * 1000;
		},
		ssvepAllTime(state) {
			return (
				((state.ssvepOneTrialDuration + 10) * state.ssvepTrials - 10) * 1000
			);
		},
		miAllTime(state) {
			return (
				((state.miTaskPromptTime +
					state.miMotorImageryTime +
					state.miRelaxTime +
					10) *
					state.miTrials -
					10) *
				1000
			);
		},
		mixStimulusAllTime(state) {
			return (
				((state.mixStimulusSsvepTrials * state.mixStimulusSsvepTrialsDuration +
					state.mixStimulusTeethTrials * state.mixStimulusTeethDuration +
					state.mixStimulusRsvpTrials * state.mixStimulusRsvpDuration +
					10) *
					state.mixStimulusAllTrials -
					10) *
				1000
			);
		},

		relaxAllTime(state) {
			return (
				((state.relaxOneTrialDuration + 10) * state.relaxTrials -
					state.intervalTime) *
				1000
			);
		},
		mixStimulusOneTrialTime(state) {
			return (
				(state.mixStimulusSsvepTrials * state.mixStimulusSsvepTrialsDuration +
					state.mixStimulusTeethTrials * state.mixStimulusTeethDuration +
					state.mixStimulusRsvpTrials * state.mixStimulusRsvpDuration) *
				1000
			);
		},
		ssvepOneTrialDuration(state) {
			return (state.ssvepOneTrialDuration + state.intervalTime) * 1000;
		},
		rsvpOneTrialDuration(state) {
			return (
				(state.rsvpOneTrialDuration * state.rsvpTrials + state.intervalTime) *
				1000
			);
		},
		miOneTrialDuration(state) {
			return (
				(state.miTaskPromptTime +
					state.miMotorImageryTime +
					state.miRelaxTime +
					state.intervalTime) *
				1000
			);
		},
		relaxOneTrialTime(state) {
			return state.relaxOneTrialDuration;
		},
		getOneTrialTimeByParadigm(state) {
			return (paradigm) => {
				switch (paradigm) {
					case 'mixStimulus':
						return (
							(state.mixStimulusSsvepTrials *
								state.mixStimulusSsvepTrialsDuration +
								state.mixStimulusTeethTrials * state.mixStimulusTeethDuration +
								state.mixStimulusRsvpTrials * state.mixStimulusRsvpDuration) *
							1000
						);
					case 'ssvep':
						return state.ssvepOneTrialDuration * 1000;
					case 'mi':
						return (
							(state.miTaskPromptTime +
								state.miMotorImageryTime +
								state.miRelaxTime) *
							1000
						);
					case 'rsvp':
						return (
							(state.rsvpOneTrialDuration * state.rsvpTrials +
								state.intervalTime) *
							1000
						);
					case 'relax':
						return state.relaxOneTrialDuration;
				}
			};
		},
		getTrialsByParadigm(state) {
			return (paradigm) => {
				switch (paradigm) {
					case 'mixStimulus':
						return state.mixStimulusAllTrials;
					case 'ssvep':
						return state.ssvepTrials;
					case 'mi':
						return state.miTrials;
					case 'rsvp':
						return state.rsvpTrials;
					case 'relax':
						return state.relaxTrials;
				}
			};
		},
		getAllTrialsTimeByParadigm(state) {
			return (paradigm) => {
				switch (paradigm) {
					case 'mixStimulus':
						return (
							((state.mixStimulusSsvepTrials *
								state.mixStimulusSsvepTrialsDuration +
								state.mixStimulusTeethTrials * state.mixStimulusTeethDuration +
								state.mixStimulusRsvpTrials * state.mixStimulusRsvpDuration +
								10) *
								state.mixStimulusAllTrials -
								10) *
							1000
						);
					case 'ssvep':
						return (state.ssvepTrialsDuration + 1) * state.ssvepTrials * 1000;
					case 'mi':
						return (
							((state.miTaskPromptTime +
								state.miMotorImageryTime +
								state.miRelaxTime +
								10) *
								state.miTrials -
								10) *
							1000
						);
					case 'rsvp':
						return (
							((state.rsvpOneTrialDuration + 10) * state.rsvpTrials - 10) * 1000
						);
					case 'relax':
						return (
							((state.relaxOneTrialDuration + 10) * state.relaxTrials -
								state.intervalTime) *
							1000
						);
				}
			};
		},
		intervalTime(state) {
			return state.intervalTime * 1000;
		}
	},
	mutations: {
		startRecord(state) {
			state.recordStartFlag = true;
		},
		stopRecord(state) {
			state.recordStartFlag = false;
		},
		// startRecordPredict(state) {
		// 	state.recordPredictStartFlag = true;
		// },
		// stopRecordPredict(state) {
		// 	state.recordPredictStartFlag = false;
		// },
		// startRecordValid(state) {
		// 	state.recordValidStartFlag = true;
		// },
		// stopRecordValid(state) {
		// 	state.recordValidStartFlag = false;
		// },
		// startExperiment(state) {
		// 	state.experimentStartFlag = true;
		// },
		// stopExperiment(state) {
		// 	state.experimentStartFlag = false;
		// },
		// startPredict(state) {
		// 	state.predictStartFlag = true;
		// },
		// stopPredict(state) {
		// 	state.predictStartFlag = false;
		// },
		// startValid(state) {
		// 	state.validStartFlag = true;
		// },
		// stopValid(state) {
		// 	state.validStartFlag = false;
		// },
		changeParadigm(state, _paradigm) {
			state.curParadigm = _paradigm;
		},
		changePath(state, _path) {
			state.curpath = _path;
		},
		setMixStimulus(state, info) {
			state.mixStimulusAllTrials = info.mixStimulusAllTrials;
			state.mixStimulusRsvpFrequency = info.mixStimulusRsvpFrequency;
			state.mixStimulusSsvepTrials = info.mixStimulusSsvepTrials;
			state.mixStimulusSsvepTrialsDuration =
				info.mixStimulusSsvepTrialsDuration;
			state.mixStimulusSsvepStartFrequency =
				info.mixStimulusSsvepStartFrequency;
			state.mixStimulusSsvepIntervalFrequency =
				info.mixStimulusSsvepIntervalFrequency;
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
			state.relaxOneTrialDuration = info.relaxOneTrialDuration;
		},

		setSubject(state, _subject) {
			state.subject = _subject;
		}
	},
	actions: {},
	modules: {},
	plugins: [createMultiTabState()]
});
