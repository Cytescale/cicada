import Chart from 'chart.js/auto';
import { useEffect,useRef, useState } from 'react';
import backendHelper from "../../../comp/helpers/backendHelper";
const BackendHelper = new backendHelper();
import {Spinner} from 'react-bootstrap';


const DAYS_LIMIT = 15;

function renderVisitGraph(canvasRef,darkMode,chartData){
     if(!chartData){return null;}
          let countData = [];
          let currDate = new Date();
          for(let z = 0 ; z < DAYS_LIMIT ; z++){countData[z]=0;}
          for(let j =  0 ; j < DAYS_LIMIT;j++){
               let yesterday = new Date(currDate)
               yesterday.setDate(yesterday.getDate() - j);
               for(let i  = 0;i<chartData.length;i++){
                    let tdt = new Date(chartData[i].creation_timestamp);
                    if(yesterday.getDate() == tdt.getDate()){
                         countData[j] = countData[j]+1; 
                    }
               }
          }
          const canvas = canvasRef;
          let ctx  = canvas.current.getContext('2d');     
          let gradient_2 = ctx.createLinearGradient(0, 0, 0,70);
          if(!darkMode){
               gradient_2.addColorStop(1, 'rgba(0,0,0,0)');
          }else{
               gradient_2.addColorStop(1, 'rgba(255,255,255,0)');
          }
          
          gradient_2.addColorStop(0, '#55A3FF');
          let gradient = ctx.createLinearGradient(100, 0, 100,100);
          gradient.addColorStop(0, '#11E4D1');
          gradient.addColorStop(1, '#7EFF9B');
          let myChart = new Chart(ctx, {
               type: 'line',
               data:  {
                    labels: ['a','b','c','d','e','a','b','c','d','e','a','b','c','d','e'],
                    datasets: [{
                         fill:true,   
                        data:countData.reverse(),
                        backgroundColor:gradient_2,
                        borderColor: '#55A3FF',
                        borderWidth: 4,
                        pointRadius: 0,
                        lineTension:0.3,
                        pointBorderWidth:0,
                        pointBorderColor:'#BBFFCA',
                        pointBackgroundColor:'#55A3FF'
                    },
                    
                ]
                },
                options: {
                    layout: {
                         padding: 4
                     },
                     plugins: {
                         legend: {
                           display: false
                         }
                    },
                   scales: {
                         y: {
                         display:false,
                         grid:{
                              color:'#e0e0e0'
                         },
                         ticks: {
                              display:false
                         }
                     },
                     x:{
                         display:false,
                         grid:{
                              display:false
                         },
                         ticks: {
                              color:'#55A3FF'
                         }
                     }
                   }
                  }
           });
               
                ctx.clearRect(0, 0, 200, 300);
                ctx.restore();
                return myChart;    
     }
var landVisitChart = (props)=>{
     const canvasRef = useRef(null);
     const [chart,setChart] = useState(null);
     const [loading,setLoading] = useState(true);
     const [chartData,setchartData] = useState(null);
     useEffect(() => {
          if(chart){chart.destroy();}     
          if(!chartData){
               BackendHelper._getClusterAnalyticsData(props.uid).then((r)=>{
                    if(!r.errBool){
                         let da  = r.responseData.clusterAnalyticsData
                         setLoading(false);
                         setchartData(da); 
                         console.log(da);
                         setChart(renderVisitGraph(canvasRef,props.darkMode,da));
                         
                    }else{
                         throw new Error(r.errMess);
                    }
     
               }).catch(e=>{
                    console.log('Cluster analytics fetching error '+e);     
               }) 
          }
          else{
               setChart(renderVisitGraph(canvasRef,props.darkMode,chartData));
          }
          setLoading(false);
          
     }, [props.darkMode,props.uid]);

     return(
          <div className='app-land-vist-grph-canva'>
               {
               !loading?
               chartData?
               <canvas ref={canvasRef} height='130' className='app_land_grh_viw'/>:
               <div
               className='app_land_grh_viw-err'
               >No Data Yet :(</div>:
               <div className='app_land_grh_viw-err'>
                    <Spinner animation="border" role="status" variant={!props.darkMode?'dark':'light'}/>
               </div>
               }
               
          </div>
     )

}



function renderFullVisitGraph(canvasRef){
     const canvas = canvasRef;
     let ctx  = canvas.current.getContext('2d');     
     let gradient_2 = ctx.createLinearGradient(0, 0, 0,300);
     gradient_2.addColorStop(1, 'rgba(0,0,0,0)');
     gradient_2.addColorStop(0, '#55A3FF');
     let gradient = ctx.createLinearGradient(150, 0, 150,150);
     gradient.addColorStop(0, '#11E4D1');
     gradient.addColorStop(1, '#7EFF9B');
     let myChart = new Chart(ctx, {
          type: 'line',
          data:  {
               labels: ['a','b','c','d','e','a','b','c','d','e','a','b','c','d','e'],
               datasets: [{
                    fill:true,   
                   data:[100,100,200,400,250,500,200,270,350,210,240,160,70,103,120],
                   backgroundColor:gradient_2,
                   borderColor: '#55A3FF',
                   borderWidth: 5,
                   pointRadius: 4,
                   lineTension:0.3,
                   pointBorderWidth:0,
                   pointBorderColor:'#BBFFCA',
                   pointBackgroundColor:'#55A3FF'
               },
               
           ]
           },
           options: {
               layout: {
                    padding: 15
                },
                plugins: {
                    legend: {
                      display: false
                    }
               },
              scales: {
                    y: {
                    display:true,
                    grid:{
                         color:'#656565'
                    },
                    ticks: {
                         display:true,
                         color:'#858585',
                         font:'inter'
                    }
                },
                x:{
                    display:true,
                    grid:{
                         display:false,
                         color:'#656565'
                    },
                    ticks: {
                         color:'#858585',
                         font:'inter'
                    }
                }
              }
             }
      });
           ctx.clearRect(0, 0, 200, 300);
           ctx.restore();
}

var landFullVisitChart = ()=>{

     const canvasFullRef = useRef(null);
  
     useEffect(() => {
          renderFullVisitGraph(canvasFullRef);
     }, []);

     return(
          <div className='app-land-vist-full-grph-canva'>
               <canvas ref={canvasFullRef} height='200'className='app_land_grh_viw'/>
          </div>
     )

}


export {landFullVisitChart};

export default landVisitChart;



