import { Queue } from "./../Queue.js";
class Graph {
  constructor({ isDirected = false } = {}) {
    this.graph = new Map();
    this.isDirected = isDirected;
    this._DEFAULT_WEIGHT = 0;
  }
  addNode(value) {
    if (!this.graph.has(value)) {
      this.graph.set(value, new Map());
      return true;
    }
    return false;
  }
  addConnectionBetween(nodeA, nodeB, weight = this._DEFAULT_WEIGHT) {
    if (nodeA === nodeB) {
      this._handleCycle(nodeA, weight);
    } else if (this.graph.has(nodeA) && this.graph.has(nodeB)) {
      const connectionsA = this.graph.get(nodeA);
      const connectionsB = this.graph.get(nodeB);
      if (this.isDirected) {
        this._addDirectedConnection(connectionsA, nodeB, weight);
      } else {
        this._addUndirectedConnection(
          connectionsA,
          connectionsB,
          nodeA,
          nodeB,
          weight
        );
      }
    } else {
      this.addNode(nodeA);
      this.addNode(nodeB);
      this.addConnectionBetween(nodeA, nodeB, weight);
    }
    return true;
  }
  _addDirectedConnection(whereConnect, node, weight) {
    whereConnect.set(node, weight);
    return true;
  }
  _addUndirectedConnection(connectionsA, connectionsB, nodeA, nodeB, weight) {
    connectionsA.set(nodeB, weight);
    connectionsB.set(nodeA, weight);
    return true;
  }
  _handleCycle(node, weight = 0) {
    if (this.graph.has(node)) {
      const connections = this.graph.get(node);
      connections.set(node, weight);
      return true;
    }
    return false;
  }
  getConnections(node) {
    return this.graph.has(node) ? this.graph.get(node) : undefined;
  }
  updateWeight(nodeA, nodeB, weight = 0) {
    const nodeAExists = this.graph.has(nodeA);
    const nodeBExists = this.graph.has(nodeB);
    if (!nodeAExists && !nodeBExists) {
      return this.addConnectionBetween(nodeA, nodeB, weight);
    } else {
      let connectA = this.graph.get(nodeA);
      let connectB = this.graph.get(nodeB);
      connectA.set(nodeB, weight);
      connectB.set(nodeA, weight);
      return true;
    }
  }
  deleteNode(value) {
    const nodeExists = this.graph.has(value);
    if (nodeExists) {
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
    const nodeAExists = this.graph.has(nodeA);
    const nodeBExists = this.graph.has(nodeB);
    if (nodeAExists && nodeBExists) {
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
