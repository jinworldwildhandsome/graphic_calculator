"use strict"; 

const main = require('./main.js'); 
const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d'); 
const difference = 0.1; 
const point = 2; 

const draw = () =>{
    axes.drawAxes(); 
    let x = 0; 
    const coefficients = getCoeff();
    const typeGraph = document.getElementById("select").value;
    ctx.beginPath(); 
    build(x, coefficients, typeGraph); 
} 

const build = (coordX, coeffs, type) =>{
    if( coordX <= axes.x0 ){
        let y = calculateCoord(coeffs, type, coordX); 
        drawGrapf( coordX+axes.x0, axes.y0-y); 
        drawGrapf( axes.x0-coordX, axes.y0+y); 
        build( coordX+difference);
    }else{
        alert("Ваш график готов!"); 
    }      
}
 
const drawGrapf = (x, y) =>{ 
    ctx.fill(x, y, point, point); 
}

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
}; 

const calculateCoord = (coefficients, type, x) =>{
    const calculate = calculators[type]; 
    const calculatedY = calculate(coefficients, x); 
    return calculatedY; 
}; 
const calculators = {
    linear: (coefficients, x) =>{
       let y = coefficients.k*x+coefficients.b; 
        return y; 
    }, 
    quadratic: (coefficients, x) =>{
        let y = coefficients.a*x*x+coefficients.b*x+coefficients.c; 
        return y; 
    },
    inverse: (coefficients, x) =>{
        if( x == 0) return; 
        let y = coefficients.k/x + coefficients.b;  
        return y; 
    },
    log: (coefficients, x) =>{
        if( x <= 0 || a <= 0 ) return; 
        let y = Math.log(x)/Math.log(coefficients.a) + coefficients.b; 
        return y; 
    },
    exponential: (coefficients, x) =>{
        let y = Math.exp(x)*coefficients.k + coefficients.b;  
        return y; 
    },
    degree: (coefficients, x) =>{
        let y = Math.pow(coefficients.a, x)*coefficients.k + coefficients.b; 
        return y; 
    },

}; 
 






