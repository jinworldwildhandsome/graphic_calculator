"use strict";
import { calculators, receiveCoeff, addCoefficient } from './functions.js'; 
// import { fabricExceptions} from './exceptions.js'; 
window.onload = () => {
    const select = document.getElementById('select');
    select.onchange = () => (function () {
        const elementsHtml = getHTMLelements();
        addChanges(elementsHtml); 
    })();
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
const elementsHtml = getHTMLelements(); 
const receiveHtmlValues = ( arr) => {
    const divs = []; 
    for( const divValue of arr.keys()){
        let element = arr.get(divValue); 
        divs.push( element.value);
        if( divs.length === 3) return divs;  
    } 
}
const addChanges = (elementsHtml) =>{  
    const selected = elementsHtml.get('selectedFunctionType'); 
    addCoefficient(selected); 
    for( const divValue of elementsHtml.keys()){
        let element = elementsHtml.get(divValue); 
        element.style.visibility = "visible"; 
    }
}; 
//const addChangesWrapped = addChanges(elementsHtml); 
  
const exceptions = ["trigonometric", "inverse", "degree"]; 
const currentGraf = {};  
async function drawAllParts(){
    const type = document.getElementById("select").value;
    console.log(type); 
    const coefficients = receiveCoeff(type); 
    chooseDrawFunction( coefficients, type);  
    Object.assign( currentGraf, {type, coefficients});
}
class Canvas {
    constructor( axes, coefficients, type ){
        this.coefficients = coefficients; 
        this.axes = axes; 
        this.type = type; 
    }
    drawAxes  ( ctx ) {
        const {xCenter, yCenter, xMax, yMax} = this.axes; 
        ctx.beginPath();   
        ctx.moveTo(xCenter, 0); 
        ctx.lineTo(xCenter, yMax); 
        ctx.moveTo(0, yCenter); 
        ctx.lineTo(xMax, yCenter);  
        ctx.stroke(); 
        ctx.beginPath(); 
    }
    clearCanvas  (ctx) {
        const {xCenter, yCenter, xMax, yMax} = this.axes; 
        ctx.clearRect( 0, 0, xMax, yMax); 
        ctx.strokeStyle = "black"; 
        ctx.lineWidth = 1;  
    }
    calculateY (x) { 
        return calculators[this.type](this.coefficients, x);
    }
    changeColorSize( arrValues,  ctx){
        ctx.strokeStyle = arrValues[2]; 
        ctx.lineWidth = arrValues[3];  
    }  
}

class StandartEquation extends Canvas{
    async drawFullGraf (coordX, ctx) {
        const {xCenter, yCenter, xMax, yMax} = this.axes;    
        let y = yCenter - this.calculateY(coordX);
        let x =  xCenter+coordX; 
        this.drawConnectDots(x,y, xCenter, ctx);  
    }
    drawConnectDots(x, y, xCenter, ctx){   
        setTimeout( () =>{ 
             if( x == xCenter){
                ctx.moveTo(x, y); 
             } else{
                ctx.lineTo(x, y); 
             }
            ctx.stroke(); 
             }, 100
        ); 
     }
}
const fabricExceptions = ( type, coefficients, axes) =>{
    return exceptionDeterminant[type](coefficients, axes); 
}; 

const exceptionDeterminant = {
    inverse: (coefficients, axes,  type) => {
        return new InverseEquation(axes,  coefficients, type);
    },
    degree : (coefficients, axes, type) => {
        return new DegreeEquation( axes, coefficients, type); 
    },
    trigonometric: (coefficients, axes) => {
        const trigonomType = document.getElementById("trigonometricType").value; 
        console.log(trigonomType);
        return new TrigonimetricEquation( axes, coefficients,  trigonomType); 
    }
}

class InverseEquation extends Canvas{
    drawLeft( x, y, ctx){
        const {xCenter, yCenter, xMax, yMax} = this.axes; 
        setTimeout( ()=>{
            if( x == 0){
                ctx.moveTo(x, y); 
            }if( x == xCenter){
                k > 0 ? ctx.lineTo(x, yMax): ctx.lineTo(x, 0); 
                ctx.closePath(); 
            }else{
                ctx.lineTo(x, y); 
            }
            ctx.stroke(); 
            }, 1000    
        )
    }
    drawRight( x, y, ctx){ 
        const {xCenter, yCenter, xMax, yMax} = this.axes;
        setTimeout( ()=>{
            if( x == 0){
                ctx.moveTo(x, y); 
            }if( x == xCenter){ 
                ctx.beginPath(); 
                k > 0 ? ctx.moveTo(x, 0): ctx.moveTo(x, yMax ); 
            }else{
                ctx.lineTo(x, y); 
            }
            this.ctx.stroke(); 
            }, 1000    
        )
    }
    async drawFullGraf( xStart, ctx){
        const {k, b} = this.coefficients; 
        const {xCenter, yCenter, xMax, yMax} = this.axes; 
        const y = yCenter - (k/xStart+ b); 
        const x = xStart + xCenter;  
        console.log( x + " " + y); 
        if( xStart <= xCenter){
            if(xStart < 0){
                this.drawLeft( x, y, ctx); 
            }
            if( xStart == 0){
                this.drawLeft( x, y, ctx); 
                this.drawRight( x, y, ctx); 
            }
            if( xStart >0 ){
                this.drawRight( x, y, ctx); 
            } 
        }
    }
}
class DegreeEquation extends Canvas{
    drawConnectDots (x, y, ctx){ 
        setTimeout( () =>{ 
        console.log(x + " + " + y);
            if( x == 0){
                ctx.moveTo( x, y); 
            }else{
                ctx.lineTo(x, y); 
            }
            ctx.stroke(); 
            }, 100
        ); 
     }
    async drawFullGraf( xStart, ctx){ 
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
        this.drawConnectDots( x, y, ctx); 
    }
}

class TrigonimetricEquation extends Canvas{
    drawConnectDots( x, y, ctx){
        setTimeout( () =>{ 
            console.log(x + " + " + y);
            if( x == 0){
                ctx.moveTo( x, y); 
            } else{
                ctx.lineTo(x, y); 
            }
            ctx.stroke(); 
        }, 100); 
    }
    async drawFullGraf (xStart, ctx){
        const {xCenter, yCenter, xMax, yMax} = this.axes; 
        let y = yCenter - ( this.calculateY( xStart))*10; 
        let x = xCenter + (xStart)*10; 
        console.log(x +" + " + y); 
        this.drawConnectDots( x, y, ctx);  
    } 
}
function chooseDrawFunction ( coefficients, type) {
    let drawedFunction; 
    if( exceptions.includes(type)){
        drawedFunction = fabricExceptions(type, coefficients, axes)
    }else{
        drawedFunction = new StandartEquation( axes, coefficients, type); 
    }
    const divsValues = receiveHtmlValues(elementsHtml); 
    drawedFunction.clearCanvas(ctx); 
    drawedFunction.drawAxes(ctx); 
    drawedFunction.changeColorSize( divsValues, ctx );
    for( let x = -axes.xCenter; x <= axes.xCenter; x += difference){
        drawedFunction.drawFullGraf(x, ctx); 
    }
}

const drawpPreviousGrapf = ( {prevType, prevCoefficients}) => () => chooseDrawFunction( prevType, prevCoefficients); 
const remembeGrapf = drawpPreviousGrapf(currentGraf); 