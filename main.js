"use strict";
    const canvas = document.getElementById("canvas"); 
    const ctx = canvas.getContext("2d"); 
    const axes = {
        x0 : 0.5*canvas.width,
        y0 : 0.5*canvas.height,
        xmax : ctx.canvas.width, 
        ymax : ctx.canvas.height,
        drawAxes : () => {
            ctx.beginPath(); 
            ctx.moveTo(this.x0, 0); 
            ctx.lineTo(this.x0, this.ymax); 
            //ctx.stroke(); 
            ctx.moveTo(0, this.y0); 
            ctx.lineTo(this.xmax, this.y0); 
            ctx.srtoke(); 
        }
    }
    function draw () {
        axes.drawAxes(); 


    }


 