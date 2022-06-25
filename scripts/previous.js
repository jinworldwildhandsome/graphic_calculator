"use strict"; 
 
const cache = new Map; 
const generateKey = (name, counter) => name.toString() + counter; 
const keys = []; 
let counter; 
class Stack{
    memoize( funcType, ...info){
        const key = generateKey(funcType, counter); 
        keys.push(key); 
        cache.set( key, info);
        counter++; 
    }
    getFromMemory(){ 
        if(this.counter === 0) alert("All functions are there or you haven't painted any yet!"); 
        const previousFunc = cache.get( keys[--counter]); 
        cache.delete(keys[counter]); 
        return previousFunc; 
    }
}



