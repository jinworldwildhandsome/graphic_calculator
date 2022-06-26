"use strict";
export { Stack };
class Stack {
  constructor() {
    this.cache = new Map();
    this.counter = 0;
    this.keys = [];
  }
  generateKey(name, counter) {
    return name.toString() + counter;
  }
  memoize(funcType, ...info) {
    const key = this.generateKey(funcType, this.counter);
    this.keys.push(key);
    const values = Object.assign({}, { ...info }, { funcType });
    this.cache.set(key, values);
    this.counter++;
  }
  getFromMemory() {
    if (this.counter === 1)
      alert("All functions are there or you haven't painted any yet!");
    const previousFunc = this.cache.get(this.keys[this.counter - 2]);
    --this.counter;
    this.cache.delete(this.keys[this.counter]);
    this.keys.splice(this.counter, 1);
    return previousFunc;
  }
}


