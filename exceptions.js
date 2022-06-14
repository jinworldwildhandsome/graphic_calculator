"use strict"; 
export { fabricExceptions, Inverse}; 
const fabricExceptions = ( type, coefficients, axes) =>{
    let graf; 
    let k = coefficients.k; 
     let b = coefficients.b;  
        let x0 = axes.x0;   
        let y0 = axes.y0;  
        let ymax = axes.ymax; 
        let xmax = axes.xmax;  
    if( type == 'inverse'){ 
        graf = new Inverse(k, b, x0,y0, xmax, ymax); 
    }
    if( type == 'degree'){ 
        let a = coefficients.a; 
        graf = new Degree(k, b, x0,y0, xmax, ymax, a); 
    }
    // if( type == trigonometric){
    //     let a = coefficients.a; 
    //     const triginimetricType = document.getElementById("trigonometricType").value;
    //     if( triginimetricType == "sin" || triginimetricType == "cos"){
    //         graf = new SinCos(k, b, x0,y0, xmax, ymax, a, triginimetricType); 
    //     }

    // }
    return graf; 
}; 

class Inverse {
    constructor(k, b, x0, y0, xmax, ymax){
        this.k = k;
        this.b = b; 
        this.x0 = x0; 
        this.difference = 0.1;  
        this.xmax = xmax; 
        this.ymax = ymax; 
        this.y0 = y0;  
        this.ctx = canvas.getContext('2d'); 
        this.y = null;  
        this.x = null; 
    } 
    drawLeft( x, y){ 
        setTimeout( ()=>{
            if( x == 0){
                this.ctx.moveTo(x, y); 
            }if( x == this.x0){
                this.k > 0 ? this.ctx.lineTo(x, this.ymax): this.ctx.lineTo(x, 0); 
                this.ctx.closePath(); 
            }else{
                this.ctx.lineTo(x, y); 
            }
            this.ctx.stroke(); 
            }, 1000    
        )
    }
    drawRight( x, y){ 
        setTimeout( ()=>{
            if( x == 0){
                this.ctx.moveTo(x, y); 
            }if( x == this.x0){ 
                this.ctx.beginPath(); 
                this.k > 0 ? this.ctx.moveTo(x, 0): this.ctx.moveTo(x, this.ymax ); 
            }else{
                this.ctx.lineTo(x, y); 
            }
            this.ctx.stroke(); 
            }, 1000    
        )
    }
    async drawGraf( xStart){
        this.y = this.y0 - (this.k/xStart+ this.b); 
        this.x = /*this.*/xStart + this.x0;  
        console.log( this.x + " " + this.y); 
        if( xStart <= this.x0){
            if( /*this.*/xStart < 0){
                this.drawLeft( this.x, this.y); 
            }
            if( /*this*/xStart == 0){
                this.drawLeft( this.x, this.y); 
                this.drawRight( this.x, this.y); 
            }
            if( /*this.*/xStart >0 ){
                this.drawRight( this.x, this.y); 
            // }else{
            //     return; 
            }
            // /*this.*/xStart += this.difference;
            //this.drawGraf(); 
        }
    }
}; 
const canvas = document.getElementById('Mycanvas'); 
class Degree{
    constructor(k, b, x0,y0, xmax, ymax, a){
        this.k = k;
        this.b = b; 
        this.x0 = x0; 
        this.difference = 0.1;  
        this.xmax = xmax; 
        //this.xSrart = -xStart;
        this.ymax = ymax; 
        this.y0 = y0;  
        this.y = null;  
        this.x = null;  
        this.a = a; 
        this.ctx = canvas.getContext('2d'); 
    }
    draw  (x, y){ 
        setTimeout( () =>{ 
            console.log(x + " + " + y);
             //const scaledCoord = useScale(x,y); 
             if( x == /*this.x*/0){
                 this.ctx.moveTo( x, y); 
             } else{
                 this.ctx.lineTo(x, y); 
             }
             this.ctx.stroke(); 
             }, 100
        ); 

     }; 
    async drawGraf( xStart){ 
        if( this.k >= 4){
            this.y = this.y0 - ((Math.pow(xStart, this.k)*this.a + this.b)/Math.pow(100, this.k));
        }
        else{
            this.y = this.y0 - (Math.pow(xStart, this.k,)*this.a + this.b); 
        }
        this.x = xStart + this.x0; 
        //this.xSrart += this.difference;                
        this.draw( this.x, this.y); 
    }
}

class Trigonimetric{
    constructor( k, b, x0,y0, xmax, ymax, a, triginimetricType){
        this.k = k;
        this.b = b; 
        this.x0 = x0; 
        this.xmax = xmax; 
        this.type = triginimetricType; 
        this.ymax = ymax; 
        this.y0 = y0;  
        this.y = null;  
        this.x = null;  
        this.a = a; 
        this.ctx = canvas.getContext('2d'); 
    }
}