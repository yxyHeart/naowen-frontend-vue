<template>
	<!-- Form -->
	<el-button @click="dialogFormVisible = true" type="primary" round>
		<div class="param-setter-text">实验参数设置</div>
	</el-button>

	<el-dialog v-model="dialogFormVisible" title="实验参数设置">
		<el-form :model="form">
			<el-form-item
				label="Subject Name"
				:label-width="formLabelWidth"
				required
				prop="subject"
			>
				<el-input v-model="form.subject" />
			</el-form-item>

			<!-- mixStimulus -->
			<el-form-item
				label="MixStimulus All Trials"
				:label-width="formLabelWidth"
				v-if="curParadigm === 'mixStimulus'"
			>
				<el-select
					v-model="form.mixStimulusAllTrials"
					placeholder="Please select all trial"
				>
					<el-option label="2" value="2" />
					<el-option label="5" value="5" />
					<el-option label="20" value="20" />
					<el-option label="25" value="25" />
				</el-select>
			</el-form-item>

			<el-form-item
				label="MixStimulus SSVEP Trials"
				:label-width="formLabelWidth"
				v-if="curParadigm === 'mixStimulus'"
			>
				<el-input v-model="form.mixStimulusSsvepTrials" />
			</el-form-item>

			<el-form-item
				label="MixStimulus SSVEP Trial Duration"
				:label-width="formLabelWidth"
				v-if="curParadigm === 'mixStimulus'"
			>
				<el-input v-model="form.mixStimulusSsvepTrialsDuration" />
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

			<el-form-item
				label="MixStimulus Relax Trials"
				:label-width="formLabelWidth"
				v-if="curParadigm === 'mixStimulus'"
			>
				<el-input v-model="form.mixStimulusTeethTrials" />
			</el-form-item>

			<el-form-item
				label="MixStimulus Relax Duration"
				:label-width="formLabelWidth"
				v-if="curParadigm === 'mixStimulus'"
			>
				<el-input v-model="form.mixStimulusTeethDuration" />
			</el-form-item>

			<el-form-item
				label="MixStimulus RSVP Ferquency"
				:label-width="formLabelWidth"
				v-if="curParadigm === 'mixStimulus'"
			>
				<el-input v-model="form.mixStimulusRsvpFrequency" />
			</el-form-item>

			<el-form-item
				label="MixStimulus Rsvp Trials"
				:label-width="formLabelWidth"
				v-if="curParadigm === 'mixStimulus'"
			>
				<el-input v-model="form.mixStimulusRsvpTrials" />
			</el-form-item>

			<el-form-item
				label="MixStimulus Rsvp Duration"
				:label-width="formLabelWidth"
				v-if="curParadigm === 'mixStimulus'"
			>
				<el-input v-model="form.mixStimulusRsvpDuration" />
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
import { reactive, ref, computed } from 'vue';
import { createStimulusParamsApi } from '@/api/experiment';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';

const dialogFormVisible = ref(false);
const formLabelWidth = '300px';
const store = useStore();
const curParadigm = computed(() => {
	return store.state.curParadigm;
});
const curDuration = computed(() => {
	if (curParadigm.value === 'mi') {
		return store.getters.miAllTime;
	} else if (curParadigm.value === 'ssvep') {
		return store.getters.ssvepAllTime;
	} else if (curParadigm.value === 'mixStimulus') {
		return store.getters.mixStimulusAllTime;
	} else if (curParadigm.value === 'relax') {
		return store.getters.relaxAllTime;
	} else if (curParadigm.value === 'rsvp') {
		return store.getters.rsvpAllTime;
	}
	return null;
});

interface Form {
	subject: string;
	mixStimulusAllTrials: number;
	mixStimulusSsvepTrials: number;
	mixStimulusRsvpFrequency: number;
	mixStimulusSsvepTrialsDuration: number;
	mixStimulusSsvepStartFrequency: number;
	mixStimulusSsvepIntervalFrequency: number;
	mixStimulusTeethTrials: number;
	mixStimulusTeethDuration: number;
	mixStimulusRsvpTrials: number;
	mixStimulusRsvpDuration: number;

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
	mixStimulusAllTrials: computed(() => store.state.mixStimulusAllTrials).value,
	mixStimulusRsvpFrequency: computed(() => store.state.mixStimulusRsvpFrequency)
		.value,
	mixStimulusSsvepTrials: computed(() => store.state.mixStimulusSsvepTrials)
		.value,
	mixStimulusSsvepTrialsDuration: computed(
		() => store.state.mixStimulusSsvepTrialsDuration
	).value,
	mixStimulusSsvepStartFrequency: computed(
		() => store.state.mixStimulusSsvepStartFrequency
	).value,
	mixStimulusSsvepIntervalFrequency: computed(
		() => store.state.mixStimulusSsvepIntervalFrequency
	).value,
	mixStimulusTeethTrials: computed(() => store.state.mixStimulusTeethTrials)
		.value,
	mixStimulusTeethDuration: computed(() => store.state.mixStimulusTeethDuration)
		.value,
	mixStimulusRsvpTrials: computed(() => store.state.mixStimulusRsvpTrials)
		.value,
	mixStimulusRsvpDuration: computed(() => store.state.mixStimulusRsvpDuration)
		.value,
	// ssvep
	ssvepTrials: computed(() => store.state.ssvepTrials).value,
	ssvepTrialsDuration: computed(() => store.state.ssvepTrialsDuration).value,
	ssvepStartFrequency: computed(() => store.state.ssvepStartFrequency).value,
	ssvepIntervalFrequency: computed(() => store.state.ssvepIntervalFrequency)
		.value,
	//rsvp
	rsvpFrequency: computed(() => store.state.rsvpFrequency).value,
	rsvpSessions: computed(() => store.state.rsvpSessions).value,
	//mi
	miSessions: computed(() => store.state.miSessions).value,
	miTrials: computed(() => store.state.miTrials).value,
	miTaskPromptTime: computed(() => store.state.miTaskPromptTime).value,
	miMotorImageryTime: computed(() => store.state.miMotorImageryTime).value,
	miRelaxTime: computed(() => store.state.miRelaxTime).value,
	//relax
	relaxTime: computed(() => store.state.relaxTime).value,
	//subjectName
	subject: computed(() => store.state.subject).value
});

const mixStimulusOneTrialTime = computed(() => {
	return store.getters.mixStimulusOneTrialTime;
});

const handleClickSubmitParams = async () => {
	dialogFormVisible.value = false;
	const mixStimulusInfo = {
		mixStimulusAllTrials: Number(form.mixStimulusAllTrials),
		mixStimulusRsvpFrequency: Number(form.mixStimulusRsvpFrequency),
		mixStimulusSsvepTrials: Number(form.mixStimulusSsvepTrials),
		mixStimulusSsvepTrialsDuration: Number(form.mixStimulusSsvepTrialsDuration),
		mixStimulusSsvepStartFrequency: Number(form.mixStimulusSsvepStartFrequency),
		mixStimulusSsvepIntervalFrequency: Number(
			form.mixStimulusSsvepIntervalFrequency
		),
		mixStimulusTeethTrials: Number(form.mixStimulusTeethTrials),
		mixStimulusTeethDuration: Number(form.mixStimulusTeethDuration),
		mixStimulusRsvpTrials: Number(form.mixStimulusRsvpTrials),
		mixStimulusRsvpDuration: Number(form.mixStimulusRsvpDuration)
	};
	store.commit('setMixStimulus', mixStimulusInfo);

	const ssvepInfo = {
		ssvepTrials: form.ssvepTrials,
		ssvepTrialsDuration: form.ssvepTrialsDuration,
		ssvepStartFrequency: form.ssvepStartFrequency,
		ssvepIntervalFrequency: form.ssvepIntervalFrequency
	};
	store.commit('setSsvep', ssvepInfo);

	const rsvpInfo = {
		rsvpFrequency: form.rsvpFrequency,
		rsvpSessions: form.rsvpSessions
	};
	store.commit('setRsvp', rsvpInfo);

	const miInfo = {
		miSessions: form.miSessions,
		miTrials: form.miTrials,
		miTaskPromptTime: form.miTaskPromptTime,
		miMotorImageryTime: form.miMotorImageryTime,
		miRelaxTime: form.miRelaxTime
	};
	store.commit('setMi', miInfo);

	const relaxInfo = {
		relaxTime: form.relaxTime
	};
	store.commit('setRelax', relaxInfo);
	store.commit('setSubject', form.subject);
	if (form.subject === '') {
		ElMessage({
			message: '请输入被试姓名!',
			type: 'error'
		});
		return;
	}

	createStimulusParamsApi({
		subject: form.subject,
		curParadigm: curParadigm.value,
		oneTrialDuration: mixStimulusOneTrialTime.value / 1000,
		duration: curDuration.value,
		...mixStimulusInfo,
		...rsvpInfo,
		...ssvepInfo,
		...miInfo,
		...relaxInfo
	}).then((err) => {
		console.log(err);
	});
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
