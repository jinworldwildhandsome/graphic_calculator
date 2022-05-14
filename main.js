"use strict";

const addButton = (place) =>{
    let button = document.createElement("div"); 
    button.innerHTML =`
    <button id="buildGrapf" onclick="draw()">Построить график</button>
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
    const result = func();   
    return result; 
}

const receiveCoeff = {
    linear: () =>{
        const k = document.getElementById("kLin").value;
        const b = document.getElementById("bLin").value; 
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


 