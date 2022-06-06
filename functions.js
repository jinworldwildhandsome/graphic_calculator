
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
 



