import Chart from 'chart.js/auto';
import { useEffect,useRef } from 'react';

   function renderVisitGraph(canvasRef){
          const canvas = canvasRef;
          let ctx  = canvas.current.getContext('2d');     
          let gradient_2 = ctx.createLinearGradient(0, 0, 0,300);
          gradient_2.addColorStop(1, 'rgba(255,255,255,0)');
          gradient_2.addColorStop(0, 'rgba(14,152,255,1)');
          let myChart = new Chart(ctx, {
               type: 'line',
               data:  {
                    labels: ['a','b','c','d','e','a','b','c','d','e','a','b','c','d','e'],
                    datasets: [
                         {
                          fill:true,   
                        data:[100,100,200,400,250,500,200,270,350,210,240,160,70,103,120],
                        backgroundColor:gradient_2,
                        borderColor: gradient_2,
                        borderWidth: 5,
                        pointRadius: 0,
                        lineTension:0.5,
                        pointBorderWidth:0,
                        pointBorderColor:'#BBFFCA',
                        pointBackgroundColor:'#BBFFCA'
                    },
                    
                ]
                },
                options: {
                    legend: {
                         display: false
                     },
                     plugins: {
                         legend: {
                           display: false
                         }
                    },
                    scales: {
                         xAxes: [{
                              grid:{
                                   display:false
                              },
                              ticks: {
                                  display: false //this will remove only the label
                              }
                          }]
                    }
                  }
           });
                ctx.clearRect(0, 0, 200, 300);
                ctx.restore();
     }
var landVisitChart = ()=>{

     const canvasRef = useRef(null);
  
     useEffect(() => {
          renderVisitGraph(canvasRef);
     }, []);

     return(
          <div className='app-land-vist-grph-canva'>
               <canvas ref={canvasRef} height='150' className='app_land_grh_viw'/>
          </div>
     )

}

export default landVisitChart;



