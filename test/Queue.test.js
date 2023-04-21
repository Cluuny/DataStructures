import { Queue } from "../Queue.js";
describe("Queue_class", () => {
  it("test_resize", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);
    expect(queue.size()).toBe(4);
    expect(queue.getHead()).toBe(1);
    expect(queue.getTail()).toBe(4);
  });

  it("test_enqueue", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.size()).toBe(3);
    expect(queue.getHead()).toBe(1);
    expect(queue.getTail()).toBe(3);
  });

  it("test_empty_queue", () => {
    const queue = new Queue();
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(1);
    expect(queue.isEmpty()).toBe(false);
  });

  it("test_dequeue", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(false);
    expect(queue.getHead()).toBe(2);
    expect(queue.getTail()).toBe(3);
  });

  it("test_get_head", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.getHead()).toBe(1);
  });

  it("test_get_tail", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.getTail()).toBe(3);
  });

  it("test_dequeue_empty", () => {
    const queue = new Queue();
    expect(queue.dequeue()).toBe(true);
  });

  it("test_enqueue_full", () => {
    const queue = new Queue(2);
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.enqueue(3)).toBe(true);
  });

  it("test_access_empty", () => {
    const queue = new Queue();
    expect(queue.getHead()).toBeUndefined();
    expect(queue.getTail()).toBeUndefined();
  });
});
