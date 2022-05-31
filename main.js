"use strict";

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
}; 

const addChanges = () =>{
    const button = document.getElementById("buildGrapf"); 
    button.style.visibility = "visible"; 
    const grapfColor = document.getElementById("grapfColor"); 
    grapfColor.style.visibility = "visible"; 
    const backgroundColor = document.getElementById("backgroundColor"); 
    backgroundColor.style.visibility = "visible"; 
    let selected = document.getElementById("select"); 
    addCoefficient(selected); 
}; 
const getCoeff = () =>{
    const selectedValue = document.getElementById("select").value; 
    const result = receiveCoeff[selectedValue]();   
    return result; 
}; 

const receiveCoeff = {
    linear: () =>{
        const k = document.getElementById("kLin").value;
        const b = document.getElementById("bLin").value; 
        return { k, b}; 
    }, 
    quadratic: () =>{
        const a = document.getElementById("aQuad").value;
        const b = document.getElementById("bQuad").value; 
        const c = document.getElementById("cQuad").value; 
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
    trigonom: () =>{
        return {}; 
    },
}; 

const canvas = document.getElementById('Mycanvas'); 
const ctx = canvas.getContext('2d'); 
const difference = 0.1; 
const draw = () =>{ 
    canvas.style.visibility = "visible"; 
    clearCanvas(); 
    drawAxes(); 
    const coefficients = getCoeff(); 
    let type = document.getElementById("select").value; 
    if( type == "trigonometric" ){
        type = document.getElementById("trigonom"); 
    } 
    ctx.beginPath();    
    for( let x = -axes.x0; x <= axes.x0; x += difference){
        build(x, coefficients, type); 
    }
}; 
const clearCanvas = () => {
    ctx.clearRect( 0, 0, axes.xmax, axes.ymax); 
}; 
async function build (coordX, coefficientss, type) {
        let y = axes.y0 - calculateCoord(coefficientss, type, coordX);
        let x =  axes.x0+coordX; 
        drawGrapf( x, y ), 1000; 
}
const drawGrapf = (x, y) =>{
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
const calculateCoord = (coefficients, type, x) =>{
    const calculatedY = calculators[type](coefficients, x); 
    return calculatedY; 
}; 
const calculators = {
    linear: (coefficients, x) =>{
       let y = coefficients.k*x+coefficients.b; 
        return y; 
    }, 
    quadratic: (coefficients, x) =>{
        let y = coefficients.a*x*x+coefficients.b*x+coefficients.c; 
        return y; 
    },
    inverse: (coefficients, x) =>{
        if( x == 0) return; 
        let y = coefficients.k/x + coefficients.b;  
        return y; 
    },
    log: (coefficients, x) =>{
        if( x <= 0 || coefficients.a <= 0 ) return; 
        let y = Math.log(x)/Math.log(coefficients.a) + coefficients.b; 
        return y; 
    },
    exponential: (coefficients, x) =>{
        let y = Math.exp(x)*coefficients.k + coefficients.b;  
        return y; 
    },
    degree: (coefficients, x) =>{
        let y = Math.pow(coefficients.a, x)*coefficients.k + coefficients.b; 
        return y; 
    }, 
    sin: (x) =>{
        let y = Math.sin(x); 
        return y; 
    }, 
    cos: (x) => {
        let y = Math.cos(x); 
        return y; 
    }, 
    tg: () =>{
        let y = Math.tan(x); 
        return y; 
    }, 
    ctg: (x) =>{
        if( Math.tan(x) !== 0){
            let y = 1/(Math.tan(x)); 
            return y; 
        }
    }

}; 
 