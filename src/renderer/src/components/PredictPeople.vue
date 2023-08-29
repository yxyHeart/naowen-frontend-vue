<template>
    <div class="container">
        <div class="description">
            脑纹识别实时概率
        </div>

        <div ref="recognizeResult" class="recognizeResult"></div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import axios from 'axios'
import { io } from "socket.io-client";

export default{
    name: 'RecognizePeople',
    data (){
        let probability = []
        for(let i = 0;i<16;++i){
            probability.push(0.00)
        }

        let myChart
        let stopFlag = false
        let getProbability = null
        let socket = io(this.$store.state.baseurl + '/msg')
        return {
            probability,
            myChart,
            stopFlag,
            getProbability,
            socket
        }
    },
    methods:{   
        initChart(){
            const chartDom = this.$refs.recognizeResult;
            this.myChart = echarts.init(chartDom);
            let subjects = []
            // for(let i =0;i<16;++i){
            //     subjects.push('s'+ i)
            // }
            subjects = ['ccr','djh','hjn','jxy','ldj','wm','wsy','wxr','xyk','yhj','yxy','zcx','zjb','zjz','zty','zym']
            let option = {
                xAxis: {
                    max: 'dataMax'
                },
                yAxis: {
                    type: 'category',
                    data: subjects,
                    inverse: true,
                    animationDuration: 300,
                    animationDurationUpdate: 300,
                    max: 15, // only the largest 3 bars will be displayed
                    axisLabel:{
                        fontSize:24,
                        color: '#fff'
                    }
                },
                series: [
                    {
                    realtimeSort: true,
                    // name: 'X',
                    type: 'bar',
                    data: this.probability,
                    label: {
                        show: true,
                        position: 'inside',
                        valueAnimation: true,
                        formatter:(param)=>{
                            if(param.value === 0){
                                return ""
                            }
                            return param.value.toFixed(3)
                        }
                    }
                    }
                ],
                legend: {
                    show: true
                },
                animationDuration: 3000,
                animationDurationUpdate: 3000,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear'
            };
            this.myChart.setOption(option);

        },
        async getPro(){
            const response = await axios.get(this.$store.state.baseurl + '/api/getProbability')
            const data = response.data.data
            this.probability = []
            for(let i =0;i<16;++i){
                this.probability.push(data[i])
            }
            this.myChart.setOption({
                series:[
                    {
                    data: this.probability
                    },
                ]
            })

        },
        startPredict(){
            this.getProbability = setInterval(()=>{
                this.getPro()
            },1000)
        },
        stopPredict(){
            clearInterval(this.getProbability)
        },
        async waitExperimentStart(){

            while(!this.isStartPredict){
                console.log("实验还未开始")
                await new Promise((resolve)=>setTimeout(resolve, 2000))
            }
            this.startPredict()
        },
    },
    watch:{
        stopFlag(newFlag,oldFlag){
            if(newFlag === false && oldFlag === true){
                this.stopPredict()
            }else if (newFlag === true && oldFlag === false){
                this.startPredict()
            }
        }
    },

    created(){
        
    },

    mounted(){
        window.addEventListener('beforeunload', ()=>{
            this.$store.commit('stopPredict')
        });
        this.initChart();
        
        this.waitExperimentStart()

    },
    computed:{
        isStartPredict(){
            return this.$store.state.predictStartFlag
        }
    }
    
}


</script>


<style scoped>
.recognizeResult{
    height: 70vh;
    width: 50vw;
}

.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.description{
    margin-left: 8vw;
    font-size: 5rem;
    color:#fff;
    

}
</style>