import { HashTable } from "./../HashTable.js";
describe("HashTable_class", () => {
  // Tests that a value can be added to an empty hash table.
  it("test_add_value_to_empty_hash_table", () => {
    let hashTable = new HashTable(10);
    hashTable.add("test");
    expect(hashTable.read(hashTable.add("test"))).toBe("test");
  });

  // Tests that a value can be read from a hash table.
  it("test_read_value_from_hash_table", () => {
    let hashTable = new HashTable(10);
    hashTable.add("test");
    expect(hashTable.read(hashTable.add("test"))).toBe("test");
  });

  // Tests that deleting a value that does not exist in the hash table does not cause errors.
  it("test_delete_nonexistent_value", () => {
    let hashTable = new HashTable(10);
    expect(() => hashTable.delete("nonexistent")).not.toThrow();
  });
});
