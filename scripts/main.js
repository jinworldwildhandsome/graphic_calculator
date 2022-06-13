"use strict";
import { addCoefficient, calculators, receiveCoeff} from './functions.js'; 
window.onload = () => {
    const select = document.getElementById('select');
    select.onchange = () => addChanges();
    const buildButton = document.getElementById('buildGrapf');
    buildButton.onclick = () => draw();
};
const canvas = document.getElementById('Mycanvas'); 
const ctx = canvas.getContext('2d'); 
const difference = 0.1; 
const axes = {
    x0 : 0.5*canvas.width,
    y0 : 0.5*canvas.height,
    xmax : canvas.width, 
    ymax : canvas.height,
    //xInverseStart : axes.x0+difference,  
}; 
const drawAxes = () => {
    ctx.beginPath();   
    ctx.moveTo(axes.x0, 0); 
    ctx.lineTo(axes.x0, axes.ymax); 
    ctx.moveTo(0, axes.y0); 
    ctx.lineTo(axes.xmax, axes.y0);  
    ctx.stroke(); 
};   
let scale = document.getElementById("scale");
let grapfColor = document.getElementById("grapfColor");
let thickness = document.getElementById("thickness"); 

const addChanges = () =>{
    canvas.style.visibility = "visible"; 
    const button = document.getElementById("buildGrapf"); 
    button.style.visibility = "visible";  
    grapfColor.style.visibility = "visible"; 
    thickness.style.visibility = "visible"; 
    let selected = document.getElementById("select"); 
    addCoefficient(selected); 
    scale.style.visibility = "visible"; 
    
}; 
const getCoeff = (type) =>{
    const coefficients = receiveCoeff[type]();   
    return coefficients; 
}; 
// const canvas = document.getElementById('Mycanvas'); 
// const ctx = canvas.getContext('2d'); 

const exceptions = ["trigonometric", "inverse", "degree"]; 
async function draw  () {   
    clearCanvas(); 
    drawAxes(); 
    ctx.beginPath();  
    let type = document.getElementById("select").value; 
    const coefficients = getCoeff(type); 
    ctx.strokeStyle = grapfColor.value; 
    ctx.lineWidth = thickness.value;   
    if( exceptions.indexOf(type) !== -1){
        //calculateExeption(type, coefficients); 
        const grapf = new Exceptions(difference, type, coefficients); 
        grapf.inverseCalculate(); 
    // }
    // if( type == "trigonometric" ){
    //     type = document.getElementById("trigonometricType").value; 
    }else{
        for( let x = -axes.x0; x <= axes.x0; x += difference){
            calculateDraw(x, coefficients, type); 
            //drawGrapf( coords.x, coords.y); 
            //expemental( coords.x, coords.y); 
        }
    }
    
}; 
const drawExeption = {
    inverse: ( x, y, axes )=>{
        setTimeout( () =>{
            if( x == 0){
                ctx.moveTo(x, y); 
            }if( y == axes.y0 || y == 0){
                ctx.moveTo(x, y); 
            }else{
                ctx.lineTo(x, y); 
            }
            ctx.stroke(); 
            }, 1000
           ); 
    }, 
    
}
let previousCounter; 
async function calculateExeption (type, coefficients, difference = 0.1, counter = -axes.x0) {
        if( counter > -1 && counter < 0 ){
            difference *= 0,1;  
            console.log(difference); 
        };
        if( counter  === difference && difference < 0,1){
            difference *= 10;
            console.log(difference); 
        }; 
        console.log('difference ' + difference); 
        console.log(counter); 
        let y = axes.y0 - calculateY(coefficients, type, counter); 
        let x = counter + axes.x0; 
        drawExeption[type](x, y, axes);
        previousCounter = counter; 
        console.log("priveois" + previousCounter); 
        counter += difference; 
        counter <= axes.x0 ? calculateExeption(type, difference, difference, counter) : () =>{}; 
}  
class Exceptions {
    constructor( idealDiference, type, coefficients){
        this.idealDiference = idealDiference; 
        this.type = type; 
        this.coefficients = coefficients; 
        this.difference = idealDiference;  
        this.xSrart = -axes.x0;
        this.y = null;  
        this.x = null; 
    }
    async inverseCalculate (){
        this.y = axes.y0 - calculateY(this.coefficients, this.type, this.xSrart); 
        this.x = this.xSrart + axes.x0; 
        this.xSrart += difference; 
        if( this.xSrart == -this.idealDiference && this.xSrart < 0){
            this.difference *= 0,1; 
        };
        if( this.xSrart == 0 || this.difference < this.idealDiference){
            this.difference *= 10;
            this.xSrart += this.difference;   
        }; 
        this.drawInverse( this.x, this.y); 
        this.x <= axes.xmax ? this.inverseCalculate() : ()=>{};     
    } 
    async drawInverse ( x, y){
        setTimeout( () =>{
            if( x == 0){
                ctx.moveTo(x, y); 
            }if( x === axes.x0){
                if( this.coefficients[k] > 0 ){
                    ctx.lineTo(x-difference, axes.ymax); 
                }else{
                    ctx.lineTo( x-difference, 0); 
                }   
            } 
            else{
                ctx.lineTo(x, y); 
            }
            ctx.stroke(); 
            }, 1000
        ); 
        
    }
    

} 
 
const clearCanvas = () => {
    ctx.clearRect( 0, 0, axes.xmax, axes.ymax); 
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1; 
}; 
async function calculateDraw (coordX, coefficients, type) { 
        let y = axes.y0 - calculateY(coefficients, type, coordX);
        let x =  axes.x0+coordX; 
        //return {x, y}; 
        drawGrapf(x,y);  
};
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
        //const scaledCoord = useScale(x,y); 
        if( x == axes.x0){
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

 