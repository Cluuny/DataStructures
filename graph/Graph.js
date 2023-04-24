class Graph {
  constructor() {
    this.graph = new Map();
  }
  addNode(value) {
    if (!this.graph.has(value)) {
      this.graph.set(value, new Array());
      return true;
    }
    return false;
  }
  addConnectionBetween(nodeA, nodeB) {
    if (nodeA === nodeB) {
      this.cycle(nodeA);
    } else if (this.graph.has(nodeA) && this.graph.has(nodeB)) {
      const connectA = this.graph.get(nodeA);
      const connectB = this.graph.get(nodeB);
      connectA.push(nodeB);
      connectB.push(nodeA);
    } else {
      this.addNode(nodeA);
      this.addNode(nodeB);
      this.addConnectionBetween(nodeA, nodeB);
    }
    return true;
  }
  cycle(node) {
    if (this.graph.has(node)) {
      const connectA = this.graph.get(node);
      connectA.push(node);
      return true;
    }
    return false;
  }
  getConnections(node) {
    if (this.graph.has(node)) {
      return this.graph.get(node);
    }
    return false;
  }
  deleteNode(value) {
    if (this.graph.has(value)) {
      this.graph.delete(value);
      let nodeConnections = this.graph.values();
      for (const nodeConnection of nodeConnections) {
        if (nodeConnection.includes(value)) {
          nodeConnection.splice(nodeConnection.indexOf(value), 1);
        }
      }
      return true;
    }
    return false;
  }
  deleteConnectionBetween(nodeA, nodeB) {
    if (this.graph.has(nodeA) && this.graph.has(nodeB)) {
      let connectA = this.graph.get(nodeA);
      let connectB = this.graph.get(nodeB);
      connectA.splice(connectA.indexOf(nodeB), 1);
      connectB.splice(connectB.indexOf(nodeA), 1);
      return true;
    }
    return false;
  }
}
export { Graph };
let newGraph = new Graph();
newGraph.addNode(1);
newGraph.addNode(2);
newGraph.addNode(3);
newGraph.addNode(2);
newGraph.addConnectionBetween(2, 3);
newGraph.addConnectionBetween(2, 2);
newGraph.addConnectionBetween(1, 2);
console.log(newGraph.graph);
