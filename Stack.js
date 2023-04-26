class Stack {
  constructor(length = 0) {
    this.stack = new Array(length);
  }
  add(item) {
    this.stack.push(item);
  }
  getAt(index) {
    if (index === undefined) {
      return this.stack[this.stack.length - 1];
    } else {
      let arrAux = [];
      for (let i = this.stack.length - 1; i > index; i--) {
        arrAux.push(this.stack[i]);
        this.stack.pop();
      }
      let value = this.stack[this.stack.length - 1];
      arrAux = arrAux.reverse();
      this.stack.push(...arrAux);
      return value;
    }
  }
  update(value, index) {
    if (index === undefined || index > this.stack.length) {
      this.stack[this.stack.length - 1] = value;
      return true;
    } else {
      let arrAux = [];
      for (let i = this.stack.length - 1; i > index; i--) {
        arrAux.push(this.stack[i]);
        this.stack.pop();
      }
      this.stack[this.stack.length - 1] = value;
      arrAux = arrAux.reverse();
      this.stack.push(...arrAux);
      return true;
    }
  }
  delete(index) {
    if (index === undefined || index > this.stack.length) {
      return this.stack.pop();
    } else {
      let arrAux = [];
      for (let i = this.stack.length - 1; i > index; i--) {
        arrAux.push(this.stack[i]);
        this.stack.pop();
      }
      let deletedData = this.stack.pop();
      arrAux = arrAux.reverse();
      this.stack.push(...arrAux);
      return deletedData;
    }
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}
export { Stack };
