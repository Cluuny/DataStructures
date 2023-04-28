//Importación
import { Graph } from "./Graph.js";
import { Queue } from "./../Queue.js";
import { Stack } from "./../Stack.js";
class MapGrap extends Graph {
  constructor({ isDirected = false } = {}) {
    super(isDirected);
  }
}
//Declaración de variables
let goblalGraph = new MapGrap(),
  q1 = new MapGrap(),
  q2 = new MapGrap(),
  q3 = new MapGrap();
//--------------- Q1 ----------------
let corners = [1, 2, 3, 4, 5, 6, 7, 8];
q1.addNode(...corners);
//---------------1 cuadra---------------
q1.addConnectionBetween(1, 2, 50);
q1.addConnectionBetween(2, 3, 50);
q1.addConnectionBetween(3, 4, 50);
q1.addConnectionBetween(4, 1, 50);
//---------------1 - 2---------------
q1.addConnectionBetween(4, 5, 50);
q1.addConnectionBetween(3, 6, 50);
//---------------2 cuadra---------------
q1.addConnectionBetween(5, 6, 50);
q1.addConnectionBetween(6, 7, 50);
q1.addConnectionBetween(7, 8, 50);
q1.addConnectionBetween(8, 5, 50);
//--------------------------------------
console.log(q1.graph);
console.log(q1.shortWayBetween(8, 1));
console.log(q1.shortWayBetween(1, 8));
//--------------- Q2 ----------------
//--------------- Q3 ----------------
