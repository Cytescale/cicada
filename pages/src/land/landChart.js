import Chart from 'chart.js/auto';
import { useEffect,useRef } from 'react';

   function renderVisitGraph(canvasRef){
          const canvas = canvasRef;
          let ctx  = canvas.current.getContext('2d');     
          let gradient_2 = ctx.createLinearGradient(0, 0, 0,70);
          gradient_2.addColorStop(1, 'rgba(255,255,255,0)');
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
     }
var landVisitChart = ()=>{

     const canvasRef = useRef(null);
  
     useEffect(() => {
          renderVisitGraph(canvasRef);
     }, []);

     return(
          <div className='app-land-vist-grph-canva'>
               <canvas ref={canvasRef} height='130' className='app_land_grh_viw'/>
          </div>
     )

}



function renderFullVisitGraph(canvasRef){
     const canvas = canvasRef;
     let ctx  = canvas.current.getContext('2d');     
     let gradient_2 = ctx.createLinearGradient(0, 0, 0,300);
     gradient_2.addColorStop(1, 'rgba(255,255,255,0)');
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
                         color:'#f5f5f5'
                    },
                    ticks: {
                         display:true,
                         color:'#bdbdbd',
                         font:'poppins'
                    }
                },
                x:{
                    display:true,
                    grid:{
                         display:false,
                         color:'#bdbdbd'
                    },
                    ticks: {
                         color:'#bdbdbd',
                         font:'poppins'
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



