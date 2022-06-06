
/*"use strict"; 

const main = require('./main.js'); 
const canvas = document.getElementById('Mycanvas'); 
const ctx = canvas.getContext('2d'); 
const difference = 0.1; 
const point = 2; 
const draw = () =>{
    axes.drawAxes(); 
    let x = 0; 
    const coefficients = getCoeff();
    const typeGraph = document.getElementById("select").value;
    ctx.beginPath(); 
    build(x, coefficients, typeGraph); 
} 

const build = (coordX, coeffs, type) =>{
    if( coordX <= axes.x0 ){
        let y = calculateCoord(coeffs, type, coordX); 
        drawGrapf( coordX+axes.x0, axes.y0-y); 
        drawGrapf( axes.x0-coordX, axes.y0+y); 
        build( coordX+difference);
    }else{
        alert("Ваш график готов!"); 
    }      
}
 
const drawGrapf = (x, y) =>{ 
    ctx.fill(x, y, point, point); 
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

const calculateCoord = (coefficients, type, x) =>{
    const calculate = calculators[type]; 
    const calculatedY = calculate(coefficients, x); 
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
        if( x <= 0 || a <= 0 ) return; 
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

}; 
 
*/
export { addCoefficient, calculators, receiveCoeff }; 
const addCoefficient = (selected) =>{
    let toPaste = document.getElementById("toPaste"); 
    let toDelete = document.getElementById("pasted");
    let selectedValue = selected.value;   
    if( toDelete !== null ){
        toDelete.remove(); 
      }
    let form = document.createElement('div');
    if( selectedValue =="linear" ){
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
    }
    if( selectedValue =="quadratic" ){
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
    }
    if( selectedValue =="inverse" ){
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
    }
    if( selectedValue =="degree" ){
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
    }
    if( selectedValue =="trigonometric" ){
        form.innerHTML = `
        <div id="pasted">
            <form action="">
            <select name="trigonom" id="trigonometricType" onchange="">
                <option value="k*sin(b*x)" selected>sin(x)</option>
                <option value="k*cos(b*x)">cos(x)</option>
                <option value="k*(tg(b*x)">tg(x)</option>
                <option value="k*ctg(b*x)">ctg(x)</option><br>
                <form>
                    <p>k =
                        <input type="number" id="kTrigonom">
                    </p>
                    <p>b = 
                        <input type="number" id="bTrigonom">
                    </p>
                    <p>a = 
                        <input type="number" id="aTrigonom">
                    </p>
                </form>
                </select>
        </div>
        `; 
    }
    if( selectedValue =="log" ){
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
    }
    if( selectedValue =="exponential" ){
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
    }
    toPaste.append(form);
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
    trigonometric: () =>{
        const k = document.getElementById("kTrigonom").value;
        const b = document.getElementById("bTrigonom").value; 
        const a = document.getElementById("aTrigonom").value; 
        return { a, k, b}; 
    },
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
    sin: (coefficients, x) =>{
        let y = coefficients.k* Math.sin(coefficients.b* x)+coefficients.a; 
        return y; 
    }, 
    cos: (coefficients, x) => {
        let y = coefficients.k* Math.cos(coefficients.b* x)+coefficients.a; 
        return y; 
    }, 
    tg: (coefficients, x) =>{
        let y = coefficients.k* Math.tan(coefficients.b* x)+coefficients.a; 
        return y; 
    }, 
    ctg: (coefficients, x) =>{
        if( Math.tan(x) !== 0){
            let y = coefficients.k* (1/Math.tan(coefficients.b* x))+coefficients.a; 
            return y; 
        }
    },
}; 
 



