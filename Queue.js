class Queue {
  constructor() {
    this.queue = new Array();
    this.head = undefined;
    this.tail = undefined;
  }
  enqueue(value) {
    this.queue[this.queue.length] = value;
    this.tail = value;
    return true;
  }
  getHead() {
    return this.queue[0];
  }
  getTail() {
    return this.tail
  }
  reHead(value) {
    if (!value) {
      return false;
    }
    this.queue[this.head] = value;
    return true;
  }
  dequeue() {
    return this.queue.shift() === undefined ? true : false;
  }
  size() {
    return this.queue.length;
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}
export { Queue };
