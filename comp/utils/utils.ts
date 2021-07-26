 
 
 const timeDifference = (current:any, previous:any) =>{
     var msPerMinute = 60 * 1000;
     var msPerHour = msPerMinute * 60;
     var msPerDay = msPerHour * 24;
     var msPerMonth = msPerDay * 30;
     var msPerYear = msPerDay * 365;
 
     var elapsed = current - previous;
 
     if (elapsed < msPerMinute) {
          return Math.round(elapsed/1000) + ' seconds ago';   
     }
 
     else if (elapsed < msPerHour) {
          return Math.round(elapsed/msPerMinute) + ' minutes ago';   
     }
 
     else if (elapsed < msPerDay ) {
          return Math.round(elapsed/msPerHour ) + ' hours ago';   
     }
 
     else if (elapsed < msPerMonth) {
         return Math.round(elapsed/msPerDay) + ' days ago';   
     }
 
     else if (elapsed < msPerYear) {
         return Math.round(elapsed/msPerMonth) + ' months ago';   
     }
 
     else {
         return Math.round(elapsed/msPerYear ) + ' years ago';   
     }
 }

 const smalltimeDifference = (current:any, previous:any) =>{
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + 's';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + 'm';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + 'h';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + 'd';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + 'm';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + 'y';   
    }
}



 export {timeDifference,smalltimeDifference};
 