import { Queue } from "./../Queue.js";
import { Stack } from "./../Stack.js";
class Graph {
  constructor({ isDirected = false } = {}) {
    this.graph = new Map();
    this.isDirected = isDirected;
    this._DEFAULT_WEIGHT = 0;
    this.size = new Array(this.graph.keys()).length;
  }
  addNode(...values) {
    const booleanArr = [];
    for (const node of values) {
      if (!this.graph.has(node)) {
        this.graph.set(node, new Map());
        booleanArr.push(true);
      } else {
        booleanArr.push(false);
      }
    }
    return !booleanArr.includes(false);
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
  breadthFirstSearch(startNode, targetNode) {
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
  depthFirstSearch(startNode, targetNode) {
    const dfsHelper = {
      stack: new Stack(),
      visitedNodes: new Set(),
    };
    dfsHelper.visitedNodes.add(startNode);
    dfsHelper.stack.add(startNode);
    while (!dfsHelper.stack.isEmpty()) {
      const actualNode = dfsHelper.stack.delete();
      if (actualNode === targetNode) return true;
      const neighbors = this.graph.get(actualNode);
      for (const neighbor of neighbors.keys()) {
        if (!dfsHelper.visitedNodes.has(neighbor)) {
          dfsHelper.visitedNodes.add(neighbor);
          dfsHelper.stack.add(neighbor);
        }
      }
    }
    return false;
  }
  findShortWayDIJSKSTRA(rootNode, targetNode) {
    const unVisitedNodes = new Map();
    const visitedNodes = new Map();
    const previousNodes = new Map();
    for (const node of this.graph.keys()) {
      unVisitedNodes.set(node, node === rootNode ? 0 : Infinity);
    }
    let hasNeighbors = true;
    while (hasNeighbors) {
      let minDistance = Infinity;
      let actualNode = null;
      for (const node of unVisitedNodes.keys()) {
        if (unVisitedNodes.get(node) < minDistance) {
          minDistance = unVisitedNodes.get(node);
          actualNode = node;
        }
      }
      visitedNodes.set(actualNode, unVisitedNodes.get(actualNode));
      if (actualNode === targetNode) break;
      let neighbors = this.graph.get(actualNode);
      if (!neighbors || neighbors.size === 0) {
        hasNeighbors = false;
      } else {
        for (const neighbor of neighbors.keys()) {
          if (
            visitedNodes.get(actualNode) + neighbors.get(neighbor) <
            unVisitedNodes.get(neighbor)
          ) {
            unVisitedNodes.set(
              neighbor,
              visitedNodes.get(actualNode) + neighbors.get(neighbor)
            );
            previousNodes.set(neighbor, actualNode);
          }
        }
      }
      unVisitedNodes.delete(actualNode);
    }
    const shortWay = new Array();
    let currentNode = targetNode;
    while (currentNode !== rootNode) {
      shortWay.push({
        node: currentNode,
        distance: visitedNodes.get(currentNode),
      });
      currentNode = previousNodes.get(currentNode);
    }
    shortWay.push({
      node: rootNode,
      distance: visitedNodes.get(rootNode),
    });
    return shortWay.reverse();
  }
  // bellmanFord(rootNode, targetNode) {}
}
export { Graph };
