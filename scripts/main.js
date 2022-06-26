"use strict";
import { receiveCoeff, addCoefficient } from './functions.js'; 
import { fabricExceptions, StandartEquation  } from './exceptions.js'; 
import {Stack} from './previous.js'; 
window.onload = () => {
    const select = document.getElementById('select');
    select.onchange = () => (function () {
        const elementsHtml = getHTMLelements();
        addChanges(elementsHtml); 
    })();
    const buildButton = document.getElementById('buildGrapf');
    buildButton.onclick = () => drawAllParts();
    const prevDrawButton = document.getElementById("showPreviousGrapf"); 
    prevDrawButton.onclick = () => drawPreviousGrapf(); 
};
const canvas = document.getElementById('Mycanvas'); 
const ctx = canvas.getContext('2d'); 
const difference = 0.1; 
const axes = {
    xCenter : 0.5*canvas.width,
    yCenter : 0.5*canvas.height,
    xMax : canvas.width, 
    yMax : canvas.height,  
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
const exceptions = ["trigonometric", "inverse", "degree"];   
async function drawAllParts(){
    const type = document.getElementById("select").value;
    const coefficients = receiveCoeff(type); 
    chooseDrawFunction( coefficients, type);  
}
const stack = new Stack(); 
function chooseDrawFunction ( coefficients, type) {
    const grapf = chooseEquationType(type, coefficients); 
    grapf.clearCanvas(ctx); 
    grapf.drawAxes(ctx); 
    drawEquation(grapf); 
    stack.memoize( type, coefficients); 
} 
const chooseEquationType = (type, coefficients) =>{
    let drawedFunction; 
    if( exceptions.includes(type)){
        drawedFunction = fabricExceptions(type, coefficients, axes)
    }else{
        drawedFunction = new StandartEquation( axes, coefficients, type); 
    }
    return drawedFunction; 
}; 
const drawEquation = classEquation =>{
    const divsValues = receiveHtmlValues(elementsHtml); 
    ctx.beginPath();//classEquation.drawAxes(ctx);   
    classEquation.changeColorSize( divsValues, ctx );
    for( let x = -axes.xCenter; x <= axes.xCenter; x += difference){
        classEquation.drawFullGraf(x, ctx, divsValues[0]); 
    }

}
function drawPreviousGrapf (){
    const funcInfo = stack.getFromMemory(); 
    console.log(funcInfo.funcType); 
    const grapf = chooseEquationType( funcInfo.funcType, funcInfo[0]); 
    console.log(grapf)
    drawEquation(grapf); 
}