export interface CreateStimulusParamsRequestData {
    //被试姓名和当前范式， 是必须的参数
    subject: string,
    paradigm: string,
    oneTrialDuration:number,
    duration:number,
    //  混合范式
    mixStimulusAllTrials?: number,
    mixStimulusSsvepTrials?: number, 
    mixStimulusSsvepTrialsDuration?:number,
    mixStimulusSsvepStartFrequency?:number,
    mixStimulusSsvepIntervalFrequency?: number,
    mixStimulusTeethTrials?:number,
    mixStimulusTeethDuration?:number,
    mixStimulusRsvpFrequency?: number, 
    mixStimulusRsvpTrials?:number,
    mixStimulusRsvpDuration?:number,
    // ssvep 范式
    ssvepTrials?: number,
    ssvepTrialsDuration?: number,
    ssvepStartFrequency?: number,
    ssvepIntervalFrequency?: number,
    // rsvp 范式
    rsvpFrequency?: number,
    rsvpSessions?: number,
    // mi 范式
    miSessions?: number,
    miTrials?: number,
    miTaskPromptTime?: number,
    miMotorImageryTime?: number,
    miRelaxTime?:number,
    // 休息范式
    relaxTime?: number,
    
}

export type GetDeviceStatusResponseData = ApiResponseData<string>

export type GetPredictResponseData = ApiResponseData<number[]>

export type GetPredictNameResponseData = ApiResponseData<string>

export type GetValidResponseData = ApiResponseData<string | number | boolean>