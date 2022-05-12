"use strict";

// window.onload = () => {
//     const canvas = document.getElementById("canvas"); 
//     const ctx = canvas.getContext("2d"); 
//     const liner = document.getElementById("leniar-b"); 
//     const k = document.getElementById("k"); 
//     const b =  document.getElementById("b");  


//     liner.linearButtn =  () => {
//         k.style.visibility = "visible"; 
//         b.style.visibility = "visible"; 
//     }
//}
 

const addCoefficient = (selected) =>{
    let toPaste = document.getElementById("toPaste"); 
    let toDelete = document.getElementById("toDelete"); 
    if( selected =="linear" ){
        let form = document.createElement('div');
        form.innerHTML = `
        <div id="pasted">
            <form action="">
                <p>k = 
                    <input type="number" id="k1">
                </p>
                <p>b = 
                    <input type="number" id="b1">
                </p>
            </form>
        </div>
        `; 
        toPaste.append(form); 
    }
    if( selected =="quadratic" ){
        let form = document.createElement('div');
        form.innerHTML = `
        <div id="pasted">
            <form action="">
                <p>a =
                    <input type="number" id="a">
                </p>
                <p>b = 
                    <input type="number" id="b2">
                </p>
                <p>c = 
                    <input type="number" id="c">
                </p>
            </form>
        </div>
        `; 
        toPaste.append(form); 
    }


}


    const axes = {
        x0 : 0.5*canvas.width,
        y0 : 0.5*canvas.height,
        xmax : ctx.canvas.width, 
        ymax : ctx.canvas.height,
        drawAxes : () => {
            ctx.beginPath(); 
            ctx.moveTo(this.x0, 0); 
            ctx.lineTo(this.x0, this.ymax); 
            //ctx.stroke(); 
            ctx.moveTo(0, this.y0); 
            ctx.lineTo(this.xmax, this.y0); 
            ctx.srtoke(); 
        }
    }
    function draw () {
        axes.drawAxes(); 


    }


 