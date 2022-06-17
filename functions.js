export { addCoefficient, calculators, receiveCoeff, innerHTMLvalues}; 

const addCoefficient = (selected) => {
    let toPaste = document.getElementById("toPaste"); 
    let toDelete = document.getElementById("pasted");
    let selectedValue = selected.value;   
    if( toDelete !== null ){
        toDelete.remove(); 
      }
    let form = document.createElement('div');
    form.innerHTML = innerHTMLvalues[selectedValue]; 
    toPaste.append(form); 

}

const innerHTMLvalues ={
    linear : `
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
        `, 

    
    quadratic:`
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
        `, 
   inverse: `
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
        `, 
    degree: `
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
        `, 
    trigonometric: `
        <div id="pasted">
            <form action="">
            <select name="trigonometricType" id="trigonometricType" onchange="">
                <option value="sin" id="sin" selected>sin(x)</option>
                <option value="cos" id="cos" >cos(x)</option>
                <option value="tg" id="tg" >tg(x)</option>
                <option value="ctg" id="ctg" >ctg(x)</option><br>
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
        `, 
        log: `
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
        `,
    exponential: `
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
        `,
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
}
const calculators = {
    linear: (coefficients, x) =>{
       return coefficients.k*x+coefficients.b; 
    }, 
    quadratic: (coefficients, x) =>{ 
        return coefficients.a*x*x+coefficients.b*x+coefficients.c; 
    },
    inverse: (/*coefficients*/ k, b, x) =>{
        if( x == 0) return; 
        let y = /*coefficients.*/k/x + /*coefficients.*/b;  
        return y; 
    },
    log: (coefficients, x) =>{ 
        return Math.log(x)/Math.log(coefficients.a) + coefficients.b; 
    },
    exponential: (coefficients, x) =>{
        return Math.exp(x)*coefficients.k + coefficients.b;  
    },
    degree: (coefficients, x) =>{
        return Math.pow(x, coefficients.k,)*coefficients.a + coefficients.b; 
    }, 
    sin: (coefficients, x) =>{
        return coefficients.k* Math.sin(coefficients.b* x)+coefficients.a; 
    }, 
    cos: (coefficients, x) => {
        return coefficients.k* Math.cos(coefficients.b* x)+coefficients.a; 
    }, 
    tg: (coefficients, x) =>{
        return coefficients.k* Math.tan(coefficients.b* x)+coefficients.a; 
    }, 
    ctg: (coefficients, x) =>{
        return coefficients.k* (1/Math.tan(coefficients.b* x))+coefficients.a; 
    },
}