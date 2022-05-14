"use strict"; 

const main = require('./main.js'); 
const canvas = document.getElementById("canvas"); 
const ctx = canvas.getContext("2d"); 
const maxX =  0.5*canvas.width; 
const maxY =  0.5*canvas.height; 
const difference = 0.1; 

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
 






