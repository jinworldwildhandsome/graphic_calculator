
class EventEmitter {
  constructor() {
    this.events = new Map();
    this.wrappers = new Map();
  }

  on(name, fn) {
    const event = this.events.get(name);
    if (event) event.add(fn);
    else this.events.set(name, new Set([fn]));
  }

  emit(name, ...args) {
    const event = this.events.get(name);
    if (!event) return;
    for (const fn of event.values()) {
      fn(...args);
    }
  }
}
export { EventEmitter };