import { Graph } from "./../graph/Graph.js";
describe("Graph_class", () => {
  // Tests that a node can be added successfully to the graph.
  it("test_add_node_successfully", () => {
    const graph = new Graph();
    const result = graph.addNode("A");
    expect(result).toBe(true);
  });

  // Tests that a connection can be added successfully between two nodes.
  it("test_add_connection_between_nodes_successfully", () => {
    const graph = new Graph();
    graph.addNode("A");
    graph.addNode("B");
    const result = graph.addConnectionBetween("A", "B", 5);
    expect(result).toBe(true);
  });

  // Tests that adding a duplicate node returns false.
  it("test_add_duplicate_node", () => {
    const graph = new Graph();
    graph.addNode("A");
    const result = graph.addNode("A");
    expect(result).toBe(false);
  });

  // Tests that adding a connection between non-existent nodes creates the nodes and the connection.
  it("test_add_connection_between_nonexistent_nodes", () => {
    const graph = new Graph();
    const result = graph.addConnectionBetween("A", "B", 5);
    expect(result).toBe(true);
  });

  // Tests that the weight of a connection can be updated successfully.
  it("test_update_weight_of_connection_successfully", () => {
    const graph = new Graph();
    graph.addNode("A");
    graph.addNode("B");
    graph.addConnectionBetween("A", "B", 5);
    const result = graph.updateWeight("A", "B", 10);
    expect(result).toBe(true);
  });

  // Tests that a node can be deleted successfully from the graph.
  it("test_delete_node_successfully", () => {
    const graph = new Graph();
    graph.addNode("A");
    const result = graph.deleteNode("A");
    expect(result).toBe(true);
  });

  // Tests that deleting a non-existent node returns false.
  it("test_delete_nonexistent_node", () => {
    const graph = new Graph();
    const result = graph.deleteNode("A");
    expect(result).toBe(false);
  });

  // Tests that a connection can be deleted successfully between two nodes.
  it("test_delete_connection_between_nodes_successfully", () => {
    const graph = new Graph();
    graph.addNode("A");
    graph.addNode("B");
    graph.addConnectionBetween("A", "B", 5);
    const result = graph.deleteConnectionBetween("A", "B");
    expect(result).toBe(true);
  });

  // Tests that deleting a non-existent connection returns false.
  it("test_delete_nonexistent_connection", () => {
    const graph = new Graph();
    const result = graph.deleteConnectionBetween("A", "B");
    expect(result).toBe(false);
  });

  // Tests that the BFS algorithm can find a target node starting from a start node.
  it("test_bfs_successfully", () => {
    const graph = new Graph();
    graph.addNode("A");
    graph.addNode("B");
    graph.addNode("C");
    graph.addNode("D");
    graph.addConnectionBetween("A", "B");
    graph.addConnectionBetween("B", "C");
    graph.addConnectionBetween("C", "D");
    const result = graph.breadthFirstSearch("A", "D");
    expect(result).toBe(true);
  });

  // Tests adding a single node to the graph.
  it("test_add_node", () => {
    const graph = new Graph();
    const result = graph.addNode("A");
    expect(result).toBe(true);
    expect(graph.graph.size).toBe(1);
  });

  // Tests adding multiple nodes to the graph.
  it("test_add_multiple_nodes", () => {
    const graph = new Graph();
    const result = graph.addNode("A", "B", "C");
    expect(result).toBe(true);
    expect(graph.graph.size).toBe(3);
  });

  // Tests adding a node that already exists in the graph.
  it("test_add_duplicate_node", () => {
    const graph = new Graph();
    graph.addNode("A");
    const result = graph.addNode("A");
    expect(result).toBe(false);
    expect(graph.graph.size).toBe(1);
  });

  // Tests adding a connection between two nodes, one or both of which do not exist in the graph.
  it("test_add_connection_between_nonexistent_nodes", () => {
    const graph = new Graph();
    const result = graph.addConnectionBetween("A", "B");
    expect(result).toBe(true);
  });
});
