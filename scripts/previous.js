"use strict"; 
export {Stack}; 
class Stack{
    constructor(){
        this.cache = new Map; 
        this.counter = 0;
        this.keys = [];  
    }
    generateKey (name, counter) {
        return  name.toString() + counter;
    }
    memoize( funcType, ...info){
        const key = this.generateKey(funcType, this.counter); 
        this.keys.push(key); 
        const values = Object.assign({}, {...info}, {funcType}); 
        console.log(values); 
        console.log({funcType, ...info})
        this.cache.set( key, values);
        this.counter++; 
    }
    getFromMemory(){ 
        if(this.counter === 0) alert("All functions are there or you haven't painted any yet!"); 
        console.log(this.counter + "fist")
        console.log(this.cache.get(this.keys[this.cache]))
        const previousFunc = this.cache.get( this.keys[--this.counter]); 
        console.log(this.counter + "seconds")
        console.log(previousFunc)
        this.cache.delete(this.keys[this.counter]); 
        this.keys.splice( this.counter, 1);
        return previousFunc; 
    }
}



