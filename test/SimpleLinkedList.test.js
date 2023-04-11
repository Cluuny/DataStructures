import { SimpleLinkedList } from '../SimpleLinkedList.js';
describe("SimpleLinkedList", () => {
  it("should add a node to the end of the list", () => {
    const list = new SimpleLinkedList();
    list.add(1);
    expect(list.head.value).toBe(1);
  });
});
