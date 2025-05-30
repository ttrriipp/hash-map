import Node from "./Node.js";

export default class HashMap {
  loadFactor = 0.8;

  constructor() {
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
    this.entries = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    if (this.entries === Math.ceil(this.capacity * this.loadFactor)) {
      this.capacity *= 2;
      this.buckets.length = this.capacity;
      console.log("bucket di na lang ako");
    }

    if (this.buckets[this.hash(key)] != undefined) {
      console.log(`key = ${key}`);
      console.log(`old value = ${this.buckets[this.hash(key)]}`);
      this.buckets[this.hash(key)] = value;
      console.log(`new value = ${this.buckets[this.hash(key)]}`);
      return;
    }

    this.buckets[this.hash(key)] = value;
    this.entries++;
  }
}
