class HashTable {
  constructor(length) {
    this.table = new Array(length);
  }
  hash(value) {
    let sum = 0;
    for (let index = 0; index < value.length; index++) {
      sum += value.charCodeAt(index) * index;
    }
    return sum % this.table.length;
  }
  reHash(index) {
    return (index + 1) % this.table.length;
  }
  add(value) {
    let index = this.hash(value);
    if (!this.table[index]) {
      this.table[index] = value;
    } else {
      while (this.table[index]) {
        index = this.reHash(index);
      }
      this.table[index] = value;
    }
    return index;
  }
  read(index) {
    return this.table[index];
  }
  update(index, value) {
    this.table[index] = value;
  }
  delete(value) {
    let index = this.hash(value);
    let count = 0;
    if (value === this.table[index]) {
      this.table[index] = undefined;
    } else {
      while (value !== this.table[index]) {
        index = this.reHash(index);
        ++count;
        if (count >= this.table.length) return false;
      }
      this.table[index] = undefined;
    }
  }
}
export { HashTable };
