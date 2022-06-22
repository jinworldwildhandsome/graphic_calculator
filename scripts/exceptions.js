"use strict"; 
export { fabricExceptions}; 
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