"use strict"; 

const modul = require('./main.js'); 

const receiveCoeff = {
    "linear": () =>{
        k = document.getElementById("kLin").value;
        b = document.getElementById("bLin").value; 
        return { a, k, b}; 
    }, 
    "quadratic": () =>{
        a = document.getElementById("aQuard").value;
        b = document.getElementById("bQuard").value; 
        c = document.getElementById("cQuard").value; 
        return{ a, b, c}
    },
    "inverse": () =>{
        k = document.getElementById("kInverse").value;
        b = document.getElementById("bInverse").value; 
        return { k, b}; 
    },
    "log": () =>{
        a = document.getElementById("aLog").value;
        b = document.getElementById("bLog").value; 
        k = document.getElementById("kLog").value;
        return { a, k, b}; 
    },
    "exponential": () =>{
        a = document.getElementById("aExponent").value;
        k = document.getElementById("kExponent").value;
        b = document.getElementById("bExponent").value; 
        return {a, k, b}; 
    },
    "degree": () =>{
        a = document.getElementById("aDegree").value;
        k = document.getElementById("kDegree").value;
        b = document.getElementById("bDegree").value; 
        return { a, k, b}; 
    }, 
}

