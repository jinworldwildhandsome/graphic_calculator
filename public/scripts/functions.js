const addCoefficient = (selected) => {
  let toPaste = document.getElementById("toPaste");
  let toDelete = document.getElementById("pasted");
  let selectedValue = selected.value;
  if (toDelete !== null) {
    toDelete.remove();
  }
  let form = document.createElement("div");
  form.innerHTML = innerHTMLvalues[selectedValue];
  toPaste.append(form);
};

const innerHTMLvalues = {
  linear: `
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

  quadratic: `
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
            </select>
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

const coeffsByTypes = {
  linear: {
    k: "kLin",
    b: "bLin",
  },
  quadratic: {
    a: "aQuad",
    b: "bQuad",
    c: "cQuad",
  },
  inverse: {
    k: "kInverse",
    b: "bInverse",
  },
  log: {
    a: "aLog",
    b: "bLog",
    k: "kLog",
  },
  exponential: {
    a: "aExponent",
    k: "kExponent",
    b: "bExponent",
  },
  degree: {
    a: "aDegree",
    k: "kDegree",
    b: "bDegree",
  },
  trigonometric: {
    k: "kTrigonom",
    b: "bTrigonom",
    a: "aTrigonom",
  },
};
const toNumber = (coefficients) => {
  const keys = Object.keys(coefficients);
  const numberCoeffs = {};
  for (const key of keys) {
    numberCoeffs[key] = +coefficients[key];
  }
  return numberCoeffs;
};
const receiveCoeff = (type) => {
  const coeffRecever = {};
  const functionType = coeffsByTypes[type];
  for (const name in functionType) {
    const id = functionType[name];
    coeffRecever[name] = document.getElementById(id).value;
  }
  const coefsNumbers = toNumber(coeffRecever);
  return coefsNumbers;
};

const calculators = {
  linear: (coefficients, x) => {
    return coefficients.k * x + coefficients.b;
  },
  quadratic: (coefficients, x) => {
    return coefficients.a * x * x + coefficients.b * x + coefficients.c;
  },
  log: (coefficients, x) => {
    return (
      (coefficients.k * Math.log(x)) / Math.log(coefficients.a) + coefficients.b
    );
  },
  exponential: (coefficients, x) => {
    return Math.exp(x) * coefficients.k + coefficients.b;
  },
  degree: (coefficients, x) => {
    return Math.pow(x, coefficients.k) * coefficients.a + coefficients.b;
  },
  sin: (coefficients, x) => {
    console.log(coefficients + "1");
    return coefficients.k * Math.sin(coefficients.b * x) + coefficients.a;
  },
  cos: (coefficients, x) => {
    return coefficients.k * Math.cos(coefficients.b * x) + coefficients.a;
  },
  tg: (coefficients, x) => {
    return coefficients.k * Math.tan(coefficients.b * x) + coefficients.a;
  },
  ctg: (coefficients, x) => {
    return coefficients.k * (1 / Math.tan(coefficients.b * x)) + coefficients.a;
  },
};
export { addCoefficient, calculators, receiveCoeff, innerHTMLvalues };