import { Queue } from "./../Queue.js";
class Graph {
  constructor() {
    this.graph = new Map();
  }
  addNode(value) {
    if (!this.graph.has(value)) {
      this.graph.set(value, new Map());
      return true;
    }
    return false;
  }
  addConnectionBetween(nodeA, nodeB, weight = 0) {
    if (nodeA === nodeB) {
      this._cycle(nodeA, weight);
    } else if (this.graph.has(nodeA) && this.graph.has(nodeB)) {
      const connectA = this.graph.get(nodeA);
      const connectB = this.graph.get(nodeB);
      connectA.set(nodeB, weight);
      connectB.set(nodeA, weight);
    } else {
      this.addNode(nodeA);
      this.addNode(nodeB);
      this.addConnectionBetween(nodeA, nodeB, weight);
    }
    return true;
  }
  _cycle(node, weight = 0) {
    if (this.graph.has(node)) {
      const connections = this.graph.get(node);
      connections.set(node, weight);
      return true;
    }
    return false;
  }
  updateWeight(nodeA, nodeB, weight = 0) {
    if (this.graph.has(nodeA) && this.graph.has(nodeB)) {
      let connectA = this.graph.get(nodeA);
      let connectB = this.graph.get(nodeB);
      if (!connectA.has(nodeB) && !connectB.has(nodeA)) {
        return this.addConnectionBetween(nodeA, nodeB, weight);
      }
      connectA.set(nodeB, weight);
      connectB.set(nodeA, weight);
      return true;
    }
    return false;
  }
  getConnections(node) {
    return this.graph.has(node)
      ? new Array(...this.graph.get(node))
      : undefined;
  }
  deleteNode(value) {
    if (this.graph.has(value)) {
      this.graph.delete(value);
      for (const connections of this.graph.values()) {
        if (connections.has(value)) {
          connections.delete(value);
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
      if (connectA.has(nodeB)) {
        connectA.delete(nodeB);
      }
      if (connectB.has(nodeA)) {
        connectB.delete(nodeA);
      }
      return true;
    }
    return false;
  }
  bfs(startNode, targetNode) {
    const bfs = {
      queue: new Queue(),
      visitedNodes: new Set(),
    };
    bfs.visitedNodes.add(startNode);
    bfs.queue.enqueue(startNode);
    while (!bfs.queue.isEmpty()) {
      const actualNode = bfs.queue.dequeue();
      if (actualNode === targetNode) return true;
      const actualNeighbors = this.graph.get(actualNode);
      for (const neighbor of actualNeighbors.keys()) {
        if (!bfs.visitedNodes.has(neighbor)) {
          bfs.visitedNodes.add(neighbor);
          bfs.queue.enqueue(neighbor);
        }
      }
    }
    return false;
  }
  dfs(startNode, targetNode) {
    const visited = new Set();
    const dfsHelper = (node) => {
      visited.add(node);
      if (node === targetNode) return true;
      const neighbors = this.graph.get(node);
      for (const neighbor of neighbors.keys()) {
        if (!visited.has(neighbor)) {
          const found = dfsHelper(neighbor);
          if (found) return true;
        }
      }
      return false;
    };
    return dfsHelper(startNode);
  }
}
export { Graph };
