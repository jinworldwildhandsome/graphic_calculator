"use strict";
import { calculators, receiveCoeff, addCoefficient } from './functions.js'; 
import { fabricExceptions} from './exceptions.js'; 
window.onload = () => {
    const select = document.getElementById('select');
    select.onchange = () => addChanges();
    const buildButton = document.getElementById('buildGrapf');
    buildButton.onclick = () => drawAllPart();
};
const canvas = document.getElementById('Mycanvas'); 
const ctx = canvas.getContext('2d'); 
const difference = 0.1; 
const axes = {
    xCenter : 0.5*canvas.width,
    yCenter : 0.5*canvas.height,
    xMax : canvas.width, 
    yMax : canvas.height, 
    //xStart: -0.5*canvas.width,  
}; 
const drawAxes = () => {
    ctx.beginPath();   
    ctx.moveTo(axes.xCenter, 0); 
    ctx.lineTo(axes.xCenter, axes.yMax); 
    ctx.moveTo(0, axes.yCenter); 
    ctx.lineTo(axes.xMax, axes.yCenter);  
    ctx.stroke(); 
};   
let scale = document.getElementById("scale");
let grapfColor = document.getElementById("grapfColor");
let thickness = document.getElementById("thickness"); 
let selectedFunctionType = document.getElementById("select");
const divsToAdd = [ scale, grapfColor, thickness, canvas]; 

const addChanges = () =>{  
    addCoefficient(selectedFunctionType); 
    for( const div of divsToAdd) div.style.visibility = "visible"; 

}; 
const getCoeff = (type) =>{
    const coefficients = receiveCoeff[type]();   
    return coefficients; 
};  

const exceptions = ["trigonometric", "inverse", "degree"]; 
async function drawAllPart  () {   
    clearCanvas(); 
    drawAxes(); 
    ctx.beginPath();  
    let type = document.getElementById("select").value; 
    const coefficients = getCoeff(type); 
    ctx.strokeStyle = grapfColor.value; 
    ctx.lineWidth = thickness.value;   
    if( exceptions.indexOf(type) !== -1){
        let graf = fabricExceptions(type, coefficients, axes); 
        for( let i = -axes.xCenter; i <= axes.xCenter; i += difference){
            graf.drawGraf(i); 
        }
    }else{
        for( let x = -axes.xCenter; x <= axes.xCenter; x += difference){
            calculateDraw(x, coefficients, type); 
        }
    }
    
}; 
 
const clearCanvas = () => {
    ctx.clearRect( 0, 0, axes.xMax, axes.yMax); 
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1; 
}; 
async function calculateDraw (coordX, coefficients, type) { 
        let y = axes.yCenter - calculateY(coefficients, type, coordX);
        let x =  axes.xCenter+coordX; 
        drawGrapf(x,y);  
};
const useScale = (x, y)=>{
    let scaleValue = scale.value; 
    if( scaleValue !== 1 ){
        let xScaled = scaleValue*x; 
        let yScaled = scaleValue*y; 
        return { xScaled, yScaled}; 
    }
};
const drawGrapf = (x, y)=>{ 
   setTimeout( () =>{ 
        if( x == axes.xCenter){
            ctx.moveTo(x, y); 
        } else{
            ctx.lineTo(x, y); 
        }
        ctx.stroke(); 
        }, 100
   ); 
}; 

const calculateY = (coefficients, type, x) =>{
    const y = calculators[type](coefficients, x); 
    return y; 
}; 

 