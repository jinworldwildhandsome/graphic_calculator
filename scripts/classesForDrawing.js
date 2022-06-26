"use strict";
export { StandartEquation, fabricUnusualFunc };

import { calculators } from "./functions.js";

class Canvas {
  constructor(axes, coefficients, type) {
    this.coefficients = coefficients;
    this.axes = axes;
    this.type = type;
  }
  drawAxes(ctx) {
    const { xCenter, yCenter, xMax, yMax } = this.axes;
    ctx.beginPath();
    ctx.moveTo(xCenter, 0);
    ctx.lineTo(xCenter, yMax);
    ctx.moveTo(0, yCenter);
    ctx.lineTo(xMax, yCenter);
    ctx.stroke();
    ctx.beginPath();
  }
  clearCanvas(ctx) {
    const { xCenter, yCenter, xMax, yMax } = this.axes;
    ctx.clearRect(0, 0, xMax, yMax);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
  }
  calculateY(x) {
    return calculators[this.type](this.coefficients, x);
  }
  changeColorSize(arrValues, ctx) {
    ctx.strokeStyle = arrValues[1];
    ctx.lineWidth = arrValues[2];
  }
  drawConnectDots(x, y, xCenter, ctx) {
    setTimeout(() => {
      if (x == xCenter) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }, 100);
  }
}

class StandartEquation extends Canvas {
  drawFullGraf(coordX, ctx, scale) {
    const { xCenter, yCenter, xMax, yMax } = this.axes;
    let y = yCenter - this.calculateY(coordX) / scale;
    let x = xCenter + coordX;
    this.drawConnectDots(x, y, xCenter, ctx);
  }
}

const fabricUnusualFunc = (type, coefficients, axes) => {
  return exceptionDeterminant[type](coefficients, axes);
};

const exceptionDeterminant = {
  inverse: (coefficients, axes, type) => {
    return new InverseEquation(axes, coefficients, type);
  },
  degree: (coefficients, axes, type) => {
    return new DegreeEquation(axes, coefficients, type);
  },
  trigonometric: (coefficients, axes) => {
    const trigonomType = document.getElementById("trigonometricType").value;
    console.log(trigonomType);
    return new TrigonimetricEquation(axes, coefficients, trigonomType);
  },
  log: (coefficients, axes, type) => {
    console.log(type);
    return new LogEquation(axes, coefficients, type);
  },
};

class InverseEquation extends Canvas {
  drawLeft(x, y, ctx) {
    const { xCenter, yCenter, xMax, yMax } = this.axes;
    setTimeout(() => {
      if (x == 0) {
        ctx.moveTo(x, y);
      }
      if (x == xCenter) {
        k > 0 ? ctx.lineTo(x, yMax) : ctx.lineTo(x, 0);
        ctx.closePath();
      } else {
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }, 1000);
  }
  drawRight(x, y, ctx) {
    const { xCenter, yCenter, xMax, yMax } = this.axes;
    setTimeout(() => {
      if (x == xCenter) {
        ctx.beginPath();
        k > 0 ? ctx.moveTo(xCenter, 0) : ctx.moveTo(xCenter, yMax);
      } else {
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }, 1000);
  }
  drawFullGraf(xStart, ctx, scale) {
    const { k, b } = this.coefficients;
    const { xCenter, yCenter, xMax, yMax } = this.axes;
    const y = yCenter - (k / xStart + b) * scale * 0.1;
    const x = xStart + xCenter;
    if (xStart < xCenter) {
      this.drawLeft(x, y, ctx);
    }
    if (xStart == xCenter) {
      this.drawLeft(x, y, ctx);
      this.drawRight(x, y, ctx);
    }
    if (xStart > xCenter) {
      this.drawRight(x, y, ctx);
    }
  }
}

class DegreeEquation extends Canvas {
  drawFullGraf(xStart, ctx, scale) {
    const { a, k, b } = this.coefficients;
    const { xCenter, yCenter, xMax, yMax } = this.axes;
    let y;
    if (k >= 4) {
      y = yCenter - (Math.pow(xStart, k) * a + b) / Math.pow(10, k) / scale;
    }
    if (k < 4) {
      y = yCenter - (Math.pow(xStart, k) * a + b);
    }
    let x = xStart + xCenter;
    this.drawConnectDots(x, y, ctx);
  }
  drawConnectDots(x, y, ctx) {
    setTimeout(() => {
      if (x == 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }, 100);
  }
}

class TrigonimetricEquation extends Canvas {
  drawConnectDots(x, y, ctx) {
    setTimeout(() => {
      if (x == 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }, 100);
  }
  drawFullGraf(xStart, ctx, scale) {
    const { xCenter, yCenter, xMax, yMax } = this.axes;
    let y = yCenter - this.calculateY(xStart) * 10 * scale;
    let x = xCenter + xStart * 10;
    this.drawConnectDots(x, y, ctx);
  }
}

class LogEquation extends StandartEquation {
  drawFullGraf(coordX, ctx, scale) {
    const { xCenter, yCenter, xMax, yMax } = this.axes;
    let y = yCenter - (this.calculateY(coordX) * 2) / scale;
    let x = xCenter + coordX;
    this.drawConnectDots(x, y, xCenter, ctx);
  }
}