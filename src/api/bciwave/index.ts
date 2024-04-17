import { request } from "@/utils/service"
import type * as BciWave from "./types/bciwave"


export function getBciWaveDataApi(){
    return request<BciWave.GetBciWaveData>({
        url: "wave",
        method: "get",
      })
}