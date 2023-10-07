export interface CreateStimulusParamsRequestData {
    //被试姓名和当前范式， 是必须的参数
    subject: string,
    paradigm: string,
    duration:number,
    //  混合范式
    mixStimulusAllTrials?: number,
    mixStimulusRsvpFrequency?: number, 
    mixStimulusSsvepTrials?: number, 
    mixStimulusSsvepTrialsDuration?:number,
    mixStimulusSsvepStartFrequency?:number,
    mixStimulusSsvepIntervalFrequency?: number,
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

export type GetValidResponseData = ApiResponseData<string | number | boolean>