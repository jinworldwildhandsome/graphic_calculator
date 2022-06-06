"use strict";
import { addCoefficient, calculators, receiveCoeff} from './functions.js'; 
window.onload = () => {
    const select = document.getElementById('select');
    select.onchange = () => addChanges();
    const buildButton = document.getElementById('buildGrapf');
    buildButton.onclick = () => draw();
};
const addChanges = () =>{
    const button = document.getElementById("buildGrapf"); 
    button.style.visibility = "visible"; 
    const grapfColor = document.getElementById("grapfColor"); 
    grapfColor.style.visibility = "visible"; 
    const thickness = document.getElementById("thickness"); 
    thickness.style.visibility = "visible"; 
    let selected = document.getElementById("select"); 
    addCoefficient(selected); 
}; 
const getCoeff = (type) =>{
    //const selectedValue = document.getElementById("select").value; 
    const result = receiveCoeff[type]();   
    return result; 
}; 
const canvas = document.getElementById('Mycanvas'); 
const ctx = canvas.getContext('2d'); 
const difference = 0.1; 
const draw = () =>{ 
    canvas.style.visibility = "visible"; 
    clearCanvas(); 
    drawAxes(); 
    let type = document.getElementById("select").value; 
    const coefficients = getCoeff(type); 
    if( type == "trigonometric" ){
        type = document.getElementById("trigonometricType").value; 
    };
    ctx.beginPath();  
    ctx.strokeStyle = document.getElementById("grapfColor").value; 
    ctx.lineWidth = document.getElementById("thickness").value;   
    for( let x = -axes.x0; x <= axes.x0; x += difference){
        calculateCoords(x, coefficients, type); 
        //drawGrapf(coords); 
    }
}; 
const clearCanvas = () => {
    ctx.clearRect( 0, 0, axes.xmax, axes.ymax); 
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1; 
}; 
async function calculateCoords (coordX, coefficients, type) { 
    // if( type == "log"  || type == "inverse"){
    //     exception[type](coordX, coefficients); 
    // }
        let y = axes.y0 - calculateY(coefficients, type, coordX);
        let x =  axes.x0+coordX; 
        drawGrapf(x,y); 
        //return {x, y};  
}
// const exception = {
//     log: (coordX, coefficients)=>{
//         if( x > 0){
//             let y = axes.y0 - calculateY(coefficients, "log", coordX);
//             let x =  axes.x0+coordX; 
//             drawGrapf(x,y); 
//         }
//     }, 
//     inverse: (coordX, coefficients)=>{
//         if( x !== 0){
//             let y = axes.y0 - calculateY(coefficients, "inverse", coordX);
//             let x =  axes.x0+coordX; 
//             drawGrapf(x,y); 
//         }
//     }, 
// }
const drawGrapf = (x, y)=>{ 
   setTimeout( () =>{
    if( x == axes.x0){
        ctx.moveTo(x, y); 
    } else{
        ctx.lineTo(x, y); 
    }
    ctx.stroke(); 
    }, 1000
   ); 
}
const axes = {
    x0 : 0.5*canvas.width,
    y0 : 0.5*canvas.height,
    xmax : canvas.width, 
    ymax : canvas.height,
}; 
const drawAxes = () => {
    ctx.beginPath();   
    ctx.moveTo(axes.x0, 0); 
    ctx.lineTo(axes.x0, axes.ymax); 
    ctx.moveTo(0, axes.y0); 
    ctx.lineTo(axes.xmax, axes.y0);  
    ctx.stroke(); 
};  

const calculateY = (coefficients, type, x) =>{
    const y = calculators[type](coefficients, x); 
    return y; 
}; 

 