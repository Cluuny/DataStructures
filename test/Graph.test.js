import { Graph } from "./../graph/Graph.js";
describe("Graph", () => {
  // Tests that a node can be added successfully.
  it("test_add_node_successfully", () => {
    let graph = new Graph();
    expect(graph.addNode(1)).toBe(true);
    expect(graph.graph.size).toBe(1);
  });

  // Tests that a connection can be added successfully between two nodes.
  it("test_add_connection_between_nodes_successfully", () => {
    let graph = new Graph();
    graph.addNode(1);
    graph.addNode(2);
    expect(graph.addConnectionBetween(1, 2)).toBe(true);
    expect(graph.graph.get(1)).toContain(2);
    expect(graph.graph.get(2)).toContain(1);
  });

  // Tests that adding a duplicate node returns false.
  it("test_add_duplicate_node", () => {
    let graph = new Graph();
    graph.addNode(1);
    expect(graph.addNode(1)).toBe(false);
    expect(graph.graph.size).toBe(1);
  });

  // Tests that adding a connection between non-existent nodes creates the nodes and connects them.
  it("test_add_connection_between_nonexistent_nodes", () => {
    let graph = new Graph();
    expect(graph.addConnectionBetween(1, 2)).toBe(true);
    expect(graph.graph.get(1)).toContain(2);
    expect(graph.graph.get(2)).toContain(1);
  });

  // Tests that a node can be deleted successfully and its connections are updated.
  it("test_delete_node_successfully", () => {
    let graph = new Graph();
    graph.addNode(1);
    graph.addNode(2);
    graph.addConnectionBetween(1, 2);
    expect(graph.deleteNode(1)).toBe(true);
    expect(graph.graph.size).toBe(1);
    expect(graph.graph.get(2)).not.toContain(1);
  });

  // Tests that deleting a non-existent node returns false.
  it("test_delete_nonexistent_node", () => {
    let graph = new Graph();
    expect(graph.deleteNode(1)).toBe(false);
  });
});
