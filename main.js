"use strict";

// window.onload = () => {
     const canvas = document.getElementById("canvas"); 
     const ctx = canvas.getContext("2d"); 
//     const liner = document.getElementById("leniar-b"); 
//     const k = document.getElementById("k"); 
//     const b =  document.getElementById("b");  


//     liner.linearButtn =  () => {
//         k.style.visibility = "visible"; 
//         b.style.visibility = "visible"; 
//     }
//}
 
//const modul = require('./functions.js'); 
const addButton = (place) =>{
    let button = document.createElement("button"); 
    button.innerHTML =`
    <button id="buildGrapf" onclick="">Построить график</button>
    `; 
    place.append(button); 
}; 

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
                    <input type="number" id="kLin">
                </p>
                <p>b = 
                    <input type="number" id="bLin">
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
                    <input type="number" id="aQuad">
                </p>
                <p>b = 
                    <input type="number" id="bQuad">
                </p>
                <p>c = 
                    <input type="number" id="cQuad">
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
                    <input type="number" id="kInverse">
                </p>
                <p>b = 
                    <input type="number" id="bInverse">
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
                    <input type="number" id="aDegree">
                </p>
                <p>k =
                    <input type="number" id="kDegree">
                </p>
                <p>b = 
                    <input type="number" id="bDegree">
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
                    <input type="number" id="aLog">
                </p>
                <p>k =
                    <input type="number" id="kLog">
                </p>
                <p>b = 
                    <input type="number" id="bLog">
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
                    <input type="number" id="aExponent">
                </p>
                <p>k =
                    <input type="number" id="kExponent">
                </p>
                <p>b = 
                    <input type="number" id="bExponent">
                </p>
            </form>
        </div>
        `; 
        toPaste.append(form);  
    }
    addButton(toPaste); 
}; 

const addChanges = () =>{
    let sel = document.getElementById("select"); 
    addCoefficient(sel); 
}; 
const getCoeff = () =>{
    const selected = document.getElementById("select").value; 
    const func = receiveCoeff[selected]; 
    func();   
}

const receiveCoeff = {
    linear: () =>{
        const k = document.getElementById("kLin").value;
        const b = document.getElementById("bLin").value; 
        alert(k, b); 
        return { k, b}; 
    }, 
    quadratic: () =>{
        const a = document.getElementById("aQuard").value;
        const b = document.getElementById("bQuard").value; 
        const c = document.getElementById("cQuard").value; 
        return{ a, b, c}
    },
    inverse: () =>{
        const k = document.getElementById("kInverse").value;
        const b = document.getElementById("bInverse").value; 
        return { k, b}; 
    },
    log: () =>{
        const a = document.getElementById("aLog").value;
        const b = document.getElementById("bLog").value; 
        const k = document.getElementById("kLog").value;
        return { a, k, b}; 
    },
    exponential: () =>{
        const a = document.getElementById("aExponent").value;
        const k = document.getElementById("kExponent").value;
        const b = document.getElementById("bExponent").value; 
        return {a, k, b}; 
    },
    degree: () =>{
        const a = document.getElementById("aDegree").value;
        const k = document.getElementById("kDegree").value;
        const b = document.getElementById("bDegree").value; 
        return { a, k, b}; 
    }, 
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
    }; 
    function draw () {
        axes.drawAxes(); 


    }


 