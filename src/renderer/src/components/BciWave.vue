<template>
    <div class="container">
        <div ref="chart" class="mychart"></div>
    </div>
    
</template>

<script>
import * as echarts from "echarts";
import axios from 'axios'



export default{
    name: 'BciWave',
    data (){
        const exclude_channels = ['X1', 'X2', 'X3', 'CM', 'A1', 'A2'];
        let channels = 'P3,C3,F3,Fz,F4,C4,P4,Cz,CM,A1,Fp1,Fp2,T3,T5,O1,O2,X3,X2,F7,F8,X1,A2,T6,T4'.split(',').filter((channel)=>{
            return !exclude_channels.includes(channel)
        })
        return {
            myChart:null,
            signals:null,
            channels,
            stopFlag:false,
            getData:null,
            end:0,
            // isExperimentStart:false,
        }
    },
    methods:{
        initChart(){

            const chartDom = this.$refs.chart;

            this.myChart = echarts.init(chartDom);

            this.signals = [];
            for(let i =0 ;i< this.channels.length;i++){
                this.signals.push([]);
            }

            // data=[1,0,-1,1,2,6]
            for (let i = 0; i < 1000; i++) {
                for(let j = 0 ; j <this.channels.length; j++){
                    this.signals[j].push(0.5 + j*1);
                }
            }

            let series=[];
            for(let i = 0; i < this.channels.length; i++){
                series.push({name:this.channels[i],type:'line',showSymbol:false,hoverAnimation:false,data:this.signals[i],tooltip: {trigger: 'item',},})
            }

            let option = {
                grid: {
                    top: 10,
                    bottom: 10,
                    left: 80,
                    right: 60,
                    width:1500,
                },
                tooltip: {
                },
                xAxis: {
                    show: false,
                    type: 'category',
                    min: 0,
                    max:1500,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    show: true,
                    type: 'value',
                    min: -0.5,
                    max: this.channels.length*1+1,
                    interval:1,
                    axisLabel:{
                        formatter: function (value,index) {
                            let texts = [];
                            if (index>=1){
                                texts.push(this.channels[index-1]);
                                
                            }
                            return texts;
                        }.bind(this),
                        fontSize:20,
                        color:'#fff',
                    },
                    splitLine: {
                        show: false
                    },
                },
                series: series
            }
            this.myChart.setOption(option);

        },
        async waitExperimentStart(){

            while(!this.isExperimentStartFrontend){
                console.log('实验还未开始')
                await new Promise((resolve)=>setTimeout(resolve, 2000))
            }
            this.startBCI()
        },
            
        async getD(){
            try{
                // const response = await axios.get(this.$store.state.baseurl + "/api/getmockdata")
                const response = await axios.get(this.$store.state.baseurl + "/api/getdata18",{
                    params:{
                        timeend:this.end,
                    }
                })

                const data = response.data.data 
                const update_len = data[0].length 


                for(let j = 0 ; j <this.channels.length; j++){
                    this.signals[j] = this.signals[j].slice(update_len, 1000)
                    this.signals[j] = this.signals[j].concat(data[j])
                }
                this.end += data[0].length
                let series=[]
                for(let j = 0; j < this.channels.length; j++){
                    series.push({name:this.channels[j],type:'line',showSymbol:false,hoverAnimation:false,data:this.signals[j],tooltip: {trigger: 'item',},})
                }
                this.myChart.setOption({
                    series: series,
                });

                
            } catch(error){
                console.log(error)
            }
        },
        startBCI(){
            this.getData = setInterval(()=>{
                this.getD()
            },500)
        },
        stopBCI(){
            clearInterval(this.getData)
        }
    },
    watch:{
        stopFlag(newFlag,oldFlag){

            if(newFlag === true && oldFlag === false){
                this.stopBCI()
            }else if (newFlag === false && oldFlag === true){
                this.startBCI()
                
            }
        }
    },
    created(){
        
    },
    computed:{
        isExperimentStartFrontend(){
            return this.$store.state.experimentStartFlag
        }
    },
    mounted(){

        this.initChart()

        // setInterval(async()=>{
        //     await axios.get(this.$store.state.baseurl + '/api/reviseBaseline')
        // },500)
        this.waitExperimentStart()
         
    }
}


</script>


<style>
.container{
    height: 70vh;
    width: 66vw;
}
.mychart{
    height: 95%;
    width: 95%;
}
</style>