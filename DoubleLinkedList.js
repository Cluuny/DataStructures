class Node {
  constructor(value) {
    this.value = value;
    this.index = null;
    this.next = null;
    this.prev = null;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.last = null;
  }

  nodeAt(index = undefined) {
    let current = this.head;
    while (index && index-- && current.next) {
      current = current.next;
    }
    return current;
  }

  add(value) {
    let newNode = new Node(value);
    newNode.index = 0;
    if (!this.head) {
      this.head = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      newNode.prev = this.last;
      newNode.index = ++this.last.index;
      this.last = newNode;
    }
  }

  addAt(value, index = undefined) {
    if (index === undefined || index > this.last.index) {
      this.add(value);
    } else {
      let newNode = new Node(value);
      let prevNode = this.nodeAt(index - 1);
      let nextNode = this.nodeAt(index);
      newNode.next = nextNode;
      newNode.prev = prevNode;
      prevNode.next = newNode;
      nextNode.prev = newNode;
      newNode.index = index;
      while (nextNode) {
        nextNode.index = ++index;
        nextNode = nextNode.next;
      }
    }
  }

  replaceNodeAt(index = undefined, value) {
    if (index === undefined || index > this.last.index) {
      return "No es posible actualizar el Nodo";
    } else {
      let node = this.nodeAt(index);
      node.value = value;
    }
  }

  delete(index = undefined) {
    if (!index || index > this.last.index) {
      let prevLastNode = this.nodeAt(this.last.index - 1);
      prevLastNode.next = null;
      this.last = prevLastNode;
    } else {
      let prevNode = this.nodeAt(index - 1);
      let nextNode = prevNode.next.next;
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      while (nextNode) {
        nextNode.index = --nextNode.index;
        nextNode = nextNode.next;
      }
    }
  }
}

export { DoubleLinkedList }