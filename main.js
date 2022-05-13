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
    let toDelete = document.getElementById("pasted");
    let selectedValue = selected.value;   
    if( toDelete !== null ){
        toDelete.remove(); 
      }
    if( selectedValue =="linear" ){
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
    if( selectedValue =="quadratic" ){
        let form = document.createElement('div');
        form.innerHTML = `
        <div id="pasted">
            <form action="">
                <p>a =
                    <input type="number" id="a1">
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
    if( selectedValue =="inverse" ){
        let form = document.createElement('div');
        form.innerHTML = `
        <div id="pasted">
            <form action="">
                <p>k =
                    <input type="number" id="k2">
                </p>
                <p>b = 
                    <input type="number" id="b2">
                </p>
            </form>
        </div>
        `; 
        toPaste.append(form); 
    }
    if( selectedValue =="degree" ){
        let form = document.createElement('div');
        form.innerHTML = `
        <div id="pasted">
            <form action="">
            <p>a =
                    <input type="number" id="a3">
                </p>
                <p>k =
                    <input type="number" id="k3">
                </p>
                <p>b = 
                    <input type="number" id="b3">
                </p>
            </form>
        </div>
        `; 
        toPaste.append(form);  
    }
    if( selectedValue =="trigonometric" ){
        let form = document.createElement('div');
        form.innerHTML = `
        <div id="pasted">
            <form action="">
            <select name="trigonom" id="trigonom" onchange="">
                <option value="sin" selected>sin(x)</option>
                <option value="cos">cos(x)</option>
                <option value="tg">tg(x)</option>
                <option value="ctg">ctg(x)</option>
                </select>
        </div>
        `; 
        toPaste.append(form); 
    }
    if( selectedValue =="log" ){
        let form = document.createElement('div');
        form.innerHTML = `
        <div id="pasted">
            <form action="">
            <p>a =
                    <input type="number" id="a4">
                </p>
                <p>k =
                    <input type="number" id="k4">
                </p>
                <p>b = 
                    <input type="number" id="b4">
                </p>
            </form>
        </div>
        `; 
        toPaste.append(form);  
    }
    if( selectedValue =="exponential" ){
        let form = document.createElement('div');
        form.innerHTML = `
        <div id="pasted">
            <form action="">
            <p>a =
                    <input type="number" id="a5">
                </p>
                <p>k =
                    <input type="number" id="k5">
                </p>
                <p>b = 
                    <input type="number" id="b5">
                </p>
            </form>
        </div>
        `; 
        toPaste.append(form);  
    }
}; 

const addChanges = () =>{
    let sel = document.getElementById("select"); 
    addCoefficient(sel); 
}; 
    

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
    }; 
    function draw () {
        axes.drawAxes(); 


    }


 