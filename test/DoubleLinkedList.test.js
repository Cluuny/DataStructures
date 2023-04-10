import { DoubleLinkedList } from '../DoubleLinkedList.js';
describe("DoubleLinkedList", () => {
  console.log(new DoubleLinkedList)
  it("should add a node to the end of the list", () => {
    const list = new DoubleLinkedList();
    list.add(1);
    expect(list.head.value).toBe(1);
    expect(list.last.value).toBe(1);

    list.add(2);
    expect(list.head.value).toBe(1);
    expect(list.head.next.value).toBe(2);
    expect(list.last.value).toBe(2);
    expect(list.last.prev.value).toBe(1);
  });
  // Tests that the last node in the list is deleted. 
  it("test_delete_last_node", () => {
    const list = new DoubleLinkedList();
    list.add(1);
    list.add(2);
    list.delete();
    expect(list.last.value).toBe(1);
    expect(list.last.next).toBe(null);
  });

  // Tests that a node is added to the end of the list. 
  it("test_add_node_to_end", () => {
    const list = new DoubleLinkedList();
    list.add(1);
    list.add(2);
    list.add(3);
    expect(list.last.value).toBe(3);
    expect(list.last.prev.value).toBe(2);
  });

  // Tests that a node is added at a specific index. 
  it("test_add_node_at_index", () => {
    const list = new DoubleLinkedList();
    list.add(1);
    list.add(2);
    list.addAt(3, 1);
    expect(list.nodeAt(1).value).toBe(3);
    expect(list.nodeAt(2).value).toBe(2);
  });
  // Tests that the value of a node at a specific index can be replaced.  
  it("test_replace_node_at_specific_index", () => {
    const list = new DoubleLinkedList();
    list.add(1);
    list.add(2);
    list.add(3);
    list.replaceNodeAt(1, 4);
    expect(list.nodeAt(1).value).toBe(4);
  });

  // Tests that a node can be retrieved at a specific index.  
  it("test_retrieve_node_at_specific_index", () => {
    const list = new DoubleLinkedList();
    list.add(1);
    list.add(2);
    list.add(3);
    expect(list.nodeAt(1).value).toBe(2);
  });
});
