import { request } from '@/utils/service';
import * as Experiment from './types/experiment';

export function bcigoApi() {
	return request({
		url: 'bcigo',
		method: 'get'
	});
}

export function closeBciApi() {
	return request({
		url: 'closeBCI',
		method: 'get'
	});
}

export function deviceStatusApi() {
	return request<Experiment.GetDeviceStatusResponseData>({
		url: 'status',
		method: 'get'
	});
}

export function createStimulusParamsApi(
	data: Experiment.CreateStimulusParamsRequestData
) {
	console.log(data);
	return request({
		url: 'setParams',
		method: 'post',
		data
	});
}

export function startRecordApi() {
	return request({
		url: 'startRecord',
		method: 'get'
	});
}

export function stopRecordApi() {
	return request({
		url: 'stopRecord',
		method: 'get'
	});
}

export function startPredictApi() {
	return request({
		url: 'startPredict',
		method: 'get'
	});
}
export function startValidApi() {
	return request({
		url: 'startValid',
		method: 'get'
	});
}

export function getPredictDataApi() {
	return request<Experiment.GetPredictResponseData>({
		url: 'stopPredict',
		method: 'get'
	});
}

export function getPredictNameDataApi() {
	return request<Experiment.GetPredictNameResponseData>({
		url: 'stopPredict',
		method: 'get'
	});
}

export function getValidDataApi() {
	return request<Experiment.GetValidResponseData>({
		url: 'stopValid',
		method: 'get'
	});
}
