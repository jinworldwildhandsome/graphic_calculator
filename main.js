"use strict";
import { calculators, receiveCoeff, addCoefficient } from './functions.js'; 
import { fabricExceptions} from './exceptions.js'; 
window.onload = () => {
    const select = document.getElementById('select');
    select.onchange = () => /*addChanges()*/ makeVisible();
    const buildButton = document.getElementById('buildGrapf');
    buildButton.onclick = () => drawAllParts();
};
const canvas = document.getElementById('Mycanvas'); 
//const ctx = canvas.getContext('2d'); 
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
const hidenHTMLelements = {
    scale: "scale", 
    grapfColor: "grapfColor", 
    thickness: "thickness",  
    selectedFunctionType: "select", 
    buildButton: "buildGrapf", 
    showPreviousGrapf: "showPreviousGrapf", 
} 
const getHTMLelements = () =>{
    const keys = Object.keys(hidenHTMLelements); 
    const divsToAdd = new Map; 
    for(const element of keys){
        divsToAdd.set( element, document.getElementById(hidenHTMLelements[element])); 
    }
    return divsToAdd; 
} 

// let scale = document.getElementById("scale");
// let grapfColor = document.getElementById("grapfColor");
// let thickness = document.getElementById("thickness"); 
// let selectedFunctionType = document.getElementById("select");
// const buildButton = document.getElementById('buildGrapf');
// const showPreviousGrapf = document.getElementById('showPreviousGrapf'); 
// const divsToAdd = [ scale, grapfColor, thickness, buildButton, canvas]; 
const makeVisible = () =>{
    const elementHtml = getHTMLelements(); 
    for( const divValue of elementHtml){
        let element = elementHtml.get(divValue); 
        //element.style.visibility = "visible"; 
        console.log(element)
    }
}

const addChanges = () =>{  
    addCoefficient(selectedFunctionType); 
    for( const div of divsToAdd) div.style.visibility = "visible"; 
}; 
const getCoeff = (type) =>{
    const coefficients = receiveCoeff[type]();   
    return coefficients; 
};  

const exceptions = ["trigonometric", "inverse", "degree"]; 
// async function drawAllPart  () {   
//     clearCanvas(); 
//     drawAxes(); 
//     ctx.beginPath();  
//     let type = document.getElementById("select").value; 
//     const coefficients = getCoeff(type); 
//     ctx.strokeStyle = grapfColor.value; 
//     ctx.lineWidth = thickness.value;   
    // if( exceptions.indexOf(type) !== -1){
    //     let graf = fabricExceptions(type, coefficients, axes); 
    //     for( let i = -axes.xCenter; i <= axes.xCenter; i += difference){
    //         graf.drawGraf(i); 
    //     }
    // }else{
    //     for( let x = -axes.xCenter; x <= axes.xCenter; x += difference){
    //         calculateDraw(x, coefficients, type); 
    //     }
    // }
    
// }; 
async function drawAllParts(){
    const type = document.getElementById("select").value;
    const coefficients = getCoeff(type); 
    let drawedFunction; 
    if( exceptions.includes(type)){
        drawedFunction = fabricExceptions(type, coefficients, axes)
    }else{
        drawedFunction = new StandartEquation( axes, coefficients, type); 
    }
    drawedFunction.clearCanvas(); 
    drawedFunction.drawAxes(); 
    drawedFunction.changeColorSize( grapfColor, thickness);
    for( let x = -axes.xCenter; x <= axes.xCenter; x += difference){
        drawedFunction.drawFullGraf(x); 
    }
    
}
 
// const clearCanvas = () => {
//     ctx.clearRect( 0, 0, axes.xMax, axes.yMax); 
//     ctx.strokeStyle = "black";
//     ctx.lineWidth = 1; 
// }; 
// async function calculateDraw (coordX, coefficients, type) { 
//         let y = axes.yCenter - calculateY(coefficients, type, coordX);
//         let x =  axes.xCenter+coordX; 
//         drawGrapf(x,y);  
// };
// const useScale = (x, y)=>{
//     let scaleValue = scale.value; 
//     if( scaleValue !== 1 ){
//         let xScaled = scaleValue*x; 
//         let yScaled = scaleValue*y; 
//         return { xScaled, yScaled}; 
//     }
// };
// const drawGrapf = (x, y)=>{ 
//    setTimeout( () =>{ 
//         if( x == axes.xCenter){
//             ctx.moveTo(x, y); 
//         } else{
//             ctx.lineTo(x, y); 
//         }
//         ctx.stroke(); 
//         }, 100
//    ); 
// }; 

// const calculateY = (coefficients, type, x) =>{
//     const y = calculators[type](coefficients, x); 
//     return y; 
// }; 

class Canvas {
    constructor( axes, coefficients, type ){
        this.coefficients = coefficients; 
        this.axes = axes; 
        this.type = type; 
        this.ctx = canvas.getContext('2d'); 
    }
    drawAxes  () {
        console.log("hi1"); 
        const {xCenter, yCenter, xMax, yMax} = this.axes; 
        this.ctx.beginPath();   
        this.ctx.moveTo(xCenter, 0); 
        this.ctx.lineTo(xCenter, yMax); 
        this.ctx.moveTo(0, yCenter); 
        this.ctx.lineTo(xMax, yCenter);  
        this.ctx.stroke(); 
        this.ctx.beginPath(); 
    }
    clearCanvas  () {
        console.log("hi2"); 
        const {xCenter, yCenter, xMax, yMax} = this.axes; 
        this.ctx.clearRect( 0, 0, xMax, yMax); 
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1; 
    }
    calculateY (/*coefficients, */type, x) { 
        console.log("hi3"); 
        return calculators[type](this.coefficients, x);; 
    }
    changeColorSize( color, thickness){
        this.ctx.strokeStyle = color.value; 
        this.ctx.lineWidth = thickness.value;  
    } 
    
}

class StandartEquation extends Canvas{
    async drawFullGraf (coordX, type) {
        const {xCenter, yCenter, xMax, yMax} = this.axes;    
        let y = yCenter - this.calculateY(type, coordX);
        let x =  xCenter+coordX; 
        this.drawGrapf(x,y, xCenter);  
    }
    drawConnectDots(x, y, xCenter){ 
        //const {xCenter, yCenter, xMax, yMax} = this.axes;  
        setTimeout( () =>{ 
             if( x == xCenter){
                 this.ctx.moveTo(x, y); 
             } else{
                 this.ctx.lineTo(x, y); 
             }
            this.ctx.stroke(); 
             }, 100
        ); 
     }

}
