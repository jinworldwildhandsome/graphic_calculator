"use strict";
import { calculators, receiveCoeff, addCoefficient } from './functions.js'; 
// import { fabricExceptions} from './exceptions.js'; 
window.onload = () => {
    const select = document.getElementById('select');
    select.onchange = () => addChanges();
    const buildButton = document.getElementById('buildGrapf');
    buildButton.onclick = () => drawAllParts();
    const prevDrawButton = document.getElementById("showPreviousGrapf"); 
    prevDrawButton.onclick = () => remembeGrapf(); 
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
const hidenHTMLelements = {
    scale: "scale", 
    grapfColor: "grapfColor", 
    thickness: "thickness",  
    'selectedFunctionType': "select", 
    buildButton: "buildGrapf", 
    showPreviousGrapf: "showPreviousGrapf", 
    canvas: "Mycanvas", 
} 
const getHTMLelements = () =>{
    const keys = Object.keys(hidenHTMLelements); 
    const divsToAdd = new Map; 
    for(const element of keys){
        divsToAdd.set( element, document.getElementById(hidenHTMLelements[element])); 
    }
    return divsToAdd; 
} 
// const divsToAdd = [ scale, grapfColor, thickness, buildButton, canvas]; 
const addChanges = () =>{  
    const elementsHtml = getHTMLelements(); 
    const selected = elementsHtml.get('selectedFunctionType'); 
    addCoefficient(selected); 
    // for( const div of divsToAdd) div.style.visibility = "visible"; 
    for( const divValue of elementsHtml.keys()){
        let element = elementsHtml.get(divValue); 
        element.style.visibility = "visible"; 
    }
}; 
const getCoeff = (type) =>{
    const coefficients = receiveCoeff(type);   
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
const currentGraf = {};  
async function drawAllParts(){
    const type = document.getElementById("select").value;
    const coefficients = getCoeff(type); 
    chooseDrawFunction( type, coefficients);  
    
    Object.assign( currentGraf, {type, coefficients});
    // let drawedFunction; 
    // if( exceptions.includes(type)){
    //     drawedFunction = fabricExceptions(type, coefficients, axes)
    // }else{
    //     drawedFunction = new StandartEquation( axes, coefficients, type); 
    // }
    // drawedFunction.clearCanvas(); 
    // drawedFunction.drawAxes(); 
    // drawedFunction.changeColorSize( grapfColor, thickness);
    // for( let x = -axes.xCenter; x <= axes.xCenter; x += difference){
    //     drawedFunction.drawFullGraf(x); 
    // }
    
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
    constructor( axes, coefficients, type, ctx ){
        this.coefficients = coefficients; 
        this.axes = axes; 
        this.type = type; 
        this.ctx = ctx; 
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
const fabricExceptions = ( type, coefficients, axes) =>{
    return exceptionDeterminant[type](coefficients, axes); 
}; 

const exceptionDeterminant = {
    inverse: (coefficients, axes,  type) => {
        return new InverseEquation( coefficients, axes, type);
    },
    degree : (coefficients, axes, type) => {
        return new DegreeEquation( coefficients, axes, type); 
    },
    trigonometric: (coefficients, axes) => {
        const trigonomType = document.getElementById("trigonometricType"); 
        return new TrigonimetricEquation( coefficients, axes, trigonomType); 
    }
}

class InverseEquation extends Canvas{
    drawLeft( x, y){
        const {xCenter, yCenter, xMax, yMax} = this.axes; 
        setTimeout( ()=>{
            if( x == 0){
                this.ctx.moveTo(x, y); 
            }if( x == xCenter){
                this.k > 0 ? this.ctx.lineTo(x, yMax): this.ctx.lineTo(x, 0); 
                this.ctx.closePath(); 
            }else{
                this.ctx.lineTo(x, y); 
            }
            this.ctx.stroke(); 
            }, 1000    
        )
    }
    drawRight( x, y){ 
        const {xCenter, yCenter, xMax, yMax} = this.axes;
        setTimeout( ()=>{
            if( x == 0){
                this.ctx.moveTo(x, y); 
            }if( x == xCenter){ 
                this.ctx.beginPath(); 
                this.k > 0 ? this.ctx.moveTo(x, 0): this.ctx.moveTo(x, yMax ); 
            }else{
                this.ctx.lineTo(x, y); 
            }
            this.ctx.stroke(); 
            }, 1000    
        )
    }
    async drawFullGraf( xStart){
        const {k, b} = this.coefficients; 
        const {xCenter, yCenter, xMax, yMax} = this.axes; 
        const y = yCenter - (k/xStart+ b); 
        const x = xStart + xCenter;  
        console.log( x + " " + y); 
        if( xStart <= xCenter){
            if(xStart < 0){
                this.drawLeft( x, y); 
            }
            if( xStart == 0){
                this.drawLeft( x, y); 
                this.drawRight( x, y); 
            }
            if( xStart >0 ){
                this.drawRight( x, y); 
            } 
        }
    }
}
class DegreeEquation extends Canvas{
    drawConnectDots (x, y){ 
        setTimeout( () =>{ 
        console.log(x + " + " + y);
             if( x == 0){
                 this.ctx.moveTo( x, y); 
             } else{
                 this.ctx.lineTo(x, y); 
             }
             this.ctx.stroke(); 
             }, 100
        ); 
     }
    async drawFullGraf( xStart){ 
        const { a, k, b} = this.coefficients; 
        const {xCenter, yCenter, xMax, yMax} = this.axes;
        let y;  
        if( k >= 4){
            y = yCenter - ((Math.pow(xStart, k)*a +b)/Math.pow(100, k));
        }
        if( k < 4 ){
            y = yCenter - (Math.pow(xStart, k)*a + b); 
        }
        let x = xStart + xCenter; 
        //this.xSrart += this.difference;                
        this.drawConnectDots( x, y); 
    }
}

class TrigonimetricEquation extends Canvas{
    drawConnectDots( x, y){
        setTimeout( () =>{ 
            console.log(x + " + " + y);
            if( x == 0){
                this.ctx.moveTo( x, y); 
            } else{
                this.ctx.lineTo(x, y); 
            }
            this.ctx.stroke(); 
        }, 100); 
    }
    async drawFullGraf (xStart, type = this.type){
        const {xCenter, yCenter, xMax, yMax} = this.axes; 
        let y = yCenter - ( calculateY( type, xStart))*10; 
        let x = xCenter + xStart; 
        this.drawConnectDots( x, y);  
    } 
}
function chooseDrawFunction ( coefficients, type, canvas) {
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

const drawpPreviousGrapf = ( {prevType, prevCoefficients}) => () => chooseDrawFunction( prevType, prevCoefficients); 
const remembeGrapf = drawpPreviousGrapf(currentGraf); 