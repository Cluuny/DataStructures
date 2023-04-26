import { Queue } from "../Queue.js";
describe("Queue_class", () => {
  // Tests that a value is successfully added to the queue.
  it("test_enqueue", () => {
    const queue = new Queue();
    queue.enqueue(1);
    expect(queue.size()).toBe(1);
    expect(queue.getTail()).toBe(1);
  });

  // Tests that a value is successfully removed from the queue.
  it("test_dequeue", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.dequeue()).toBe(1);
    expect(queue.size()).toBe(1);
  });

  // Tests that false is returned when attempting to dequeue from an empty queue.
  it("test_dequeue_empty", () => {
    const queue = new Queue();
    expect(queue.dequeue()).toBe(false);
  });

  // Tests that null and undefined values are not added to the queue.
  it("test_enqueue_null_undefined", () => {
    const queue = new Queue();
    expect(queue.enqueue(null)).toBe(false);
    expect(queue.enqueue(undefined)).toBe(false);
    expect(queue.size()).toBe(0);
  });

  // Tests that the head of the queue is returned correctly.
  it("test_get_head", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.getHead()).toBe(1);
  });

  // Tests that the tail of the queue is returned correctly.
  it("test_get_tail", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.getTail()).toBe(2);
  });

  // Tests that multiple values can be successfully added and removed from the queue while maintaining order.
  it("test_enqueue_dequeue_multiple", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
  });

  // Tests that the isEmpty function returns true when the queue is empty and false when it is not.
  it("test_is_empty", () => {
    const queue = new Queue();
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(1);
    expect(queue.isEmpty()).toBe(false);
  });

  // Tests that false is returned when attempting to reHead with no value.
  it("test_re_head_no_value", () => {
    const queue = new Queue();
    expect(queue.reHead()).toBe(false);
  });
});
