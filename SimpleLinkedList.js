class Node {
  constructor(value) {
    this.value = value;
    this.index = undefined;
    this.next = null;
  }
}
class SimpleLinkedList {
  constructor() {
    this.head = null;
  }
  nodeAt(index = undefined) {
    let current = this.head;
    while (index && index-- && current.next) {
      current = current.next;
    }
    return current;
  }
  getNodeWith(value) {
    let current = this.head;
    while (!current.value) {
      current = current.next;
    }
    return current;
  }
  add(value) {
    let index = 0;
    if (!this.head) {
      this.head = new Node(value);
      this.head.index = index;
    } else {
      let current = this.head;
      while (!current.next) {
        ++index;
        current = current.next;
      }
      current.next = new Node(value);
      current.next.index = ++index;
    }
    return true;
  }
  addAt(index = undefined, value) {
    if (!index) this.add(value);
    else {
      let newNode = new Node(value);
      newNode.index = index;
      let prevNode = this.nodeAt(index - 1);
      let nextNode = prevNode.next;
      newNode.next = nextNode;
      prevNode.next = newNode;
      while (!nextNode) {
        nextNode.index = ++index;
        nextNode = nextNode.next;
      }
    }
    return true;
  }
  replaceNode(index, value) {
    let pastNode = this.nodeAt(index);
    if (!pastNode) return false;
    else {
      pastNode.value = value;
      return true;
    }
  }
  delete(index = undefined) {
    if (!index) {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      let previous = this.nodeAt(current.index - 1);
      previous.next = null;
      return true;
    } else {
      let prevNode = this.nodeAt(index - 1);
      let actNode = prevNode.next;
      let nextNode = actNode.next;
      prevNode.next = nextNode;
      while (nextNode) {
        nextNode.index = --nextNode.index;
        nextNode = nextNode.next;
      }
      return true;
    }
  }
}
export { SimpleLinkedList }
