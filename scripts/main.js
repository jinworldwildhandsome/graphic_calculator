"use strict";

import { receiveCoeff, addCoefficient } from "./functions.js";

import { fabricUnusualFunc, StandartEquation } from "./classesForDrawing.js";

import { Stack } from "./previous.js";

import { EventEmitter } from "./eventEmmiter.js";

const mainEventEmitter = new EventEmitter();

window.onload = () => {
  const select = document.getElementById("select");
  select.onchange = () =>
    (function () {
      mainEventEmitter.emit("addHTMLobjects", elementsHtml);
    })();
  const buildButton = document.getElementById("buildGrapf");
  buildButton.onclick = () => mainEventEmitter.emit("drawAllParts", null);
  const prevDrawButton = document.getElementById("showPreviousGrapf");
  prevDrawButton.onclick = () =>
    mainEventEmitter.emit("drawPreviousGrapf", null);
};
const canvas = document.getElementById("Mycanvas");
const ctx = canvas.getContext("2d");
const Difference = 0.1;
const axes = {
  xCenter: 0.5 * canvas.width,
  yCenter: 0.5 * canvas.height,
  xMax: canvas.width,
  yMax: canvas.height,
};

const hidenHTMLelements = {
  scale: "scale",
  grapfColor: "grapfColor",
  thickness: "thickness",
  selectedFunctionType: "select",
  buildButton: "buildGrapf",
  showPreviousGrapf: "showPreviousGrapf",
  clearCanvas: "clearCanvas",
  canvas: "Mycanvas",
};

const getHTMLelements = () => {
  const keys = Object.keys(hidenHTMLelements);
  const divsToAdd = new Map();
  for (const element of keys) {
    divsToAdd.set(element, document.getElementById(hidenHTMLelements[element]));
  }
  return divsToAdd;
};

const elementsHtml = getHTMLelements();

const receiveHtmlValues = (arr) => {
  const divs = [];
  for (const divValue of arr.keys()) {
    let element = arr.get(divValue);
    divs.push(element.value);
    if (divs.length === 3) return divs;
  }
};
const addChanges = (elementsHtml) => {
  const selected = elementsHtml.get("selectedFunctionType");
  addCoefficient(selected);
  for (const divValue of elementsHtml.keys()) {
    let element = elementsHtml.get(divValue);
    element.style.visibility = "visible";
  }
};

mainEventEmitter.on("addHTMLobjects", addChanges);
const exceptions = ["trigonometric", "inverse", "degree", "log"];

function drawAllParts() {
  const type = document.getElementById("select").value;
  const coefficients = receiveCoeff(type);
  chooseDrawFunction(coefficients, type);
}

const stack = new Stack();

function chooseDrawFunction(coefficients, type) {
  const grapf = chooseEquationType(type, coefficients);
  grapf.clearCanvas(ctx);
  grapf.drawAxes(ctx);
  drawEquation(grapf);
  stack.memoize(type, coefficients);
}
const chooseEquationType = (type, coefficients) => {
  let drawedFunction;
  if (exceptions.includes(type)) {
    drawedFunction = fabricUnusualFunc(type, coefficients, axes);
  } else {
    drawedFunction = new StandartEquation(axes, coefficients, type);
  }
  return drawedFunction;
};

const drawEquation = (classEquation) => {
  const divsValues = receiveHtmlValues(elementsHtml);
  ctx.beginPath(); 
  classEquation.changeColorSize(divsValues, ctx);
  for (let x = -axes.xCenter; x <= axes.xCenter; x += Difference) {
    classEquation.drawFullGraf(x, ctx, divsValues[0]);
  }
};

mainEventEmitter.on("drawAllParts", drawAllParts);

function drawPreviousGrapf() {
  const funcInfo = stack.getFromMemory();
  console.log(funcInfo.funcType);
  const grapf = chooseEquationType(funcInfo.funcType, funcInfo[0]);
  console.log(grapf);
  drawEquation(grapf);
}

mainEventEmitter.on("drawPreviousGrapf", drawPreviousGrapf);