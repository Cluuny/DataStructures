//Importación
import { Graph } from "./Graph.js";
//Declaración de variables
let goblalGraph = new Graph(),
  q1 = new Graph(),
  q2 = new Graph(),
  q3 = new Graph();

goblalGraph.addNode(q1);
goblalGraph.addNode(q2);
goblalGraph.addNode(q3);
goblalGraph.addConnectionBetween(q1, q2);
goblalGraph.addConnectionBetween(q1, q3);
goblalGraph.addConnectionBetween(q2, q3);
//--------------- Q1 ----------------
let cornersQ1 = [1, 2, 3, 4, 5, 6, 7, 8];
q1.addNode(...cornersQ1);
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
//--------------- Q2 ----------------
let cornersQ2 = [9, 10, 11, 12, 13, 14, 15, 16];
q2.addNode(...cornersQ2);
//---------------1 cuadra---------------
q2.addConnectionBetween(16, 15, 50);
q2.addConnectionBetween(16, 13, 50);
q2.addConnectionBetween(13, 14, 25);
q2.addConnectionBetween(15, 14, 55);
//---------------1 - 2---------------
q2.addConnectionBetween(13, 12, 50);
q2.addConnectionBetween(14, 11, 55);
//---------------2 cuadra---------------
q2.addConnectionBetween(12, 11, 55);
q2.addConnectionBetween(11, 10, 50);
q2.addConnectionBetween(10, 9, 55);
q2.addConnectionBetween(9, 12, 50);
//--------------------------------------
console.log(goblalGraph.graph);
//--------------- Q3 ----------------
