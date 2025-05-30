import Node from "./Node.js";

export default class HashMap {
  loadFactor = 0.8;

  constructor() {
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
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
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] == undefined) {
      // if the bucket is empty then we insert a head node
      this.buckets[index] = new Node(key, value);
      return;
    }

    // else we insert a new node
    let currentNode = this.buckets[index];
    // but first we must check if there is already an existing key
    if (currentNode.key === key) {
      currentNode.value = value;
      return;
    }

    while (currentNode.nextNode != null) {
      currentNode = currentNode.nextNode;
      if (currentNode.key === key) {
        currentNode.value = value;
        return;
      }
    }
    // once it reaches at the tail we insert a new node at the next node of the current node
    currentNode.nextNode = new Node(key, value);

    // checks to see for hash growth
    if (this.length() === Math.ceil(this.capacity * this.loadFactor)) {
      this.capacity *= 2;
      this.buckets.length = this.capacity;
      console.log("bucket di na lang ako");
      const bucketsCopy = this.entries();
      this.clear();
      bucketsCopy.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let currentNode = this.buckets[index];

    if (currentNode == null) {
      return null;
    }

    if (currentNode.key === key) {
      return currentNode.value;
    }

    while (currentNode.nextNode != null) {
      currentNode = currentNode.nextNode;
      if (currentNode.key === key) {
        return currentNode.value;
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let currentNode = this.buckets[index];

    if (currentNode == null) {
      return false;
    }

    if (currentNode.key === key) {
      return true;
    }

    while (currentNode.nextNode != null) {
      currentNode = currentNode.nextNode;
      if (currentNode.key === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let currentNode = this.buckets[index];

    if (currentNode == null) {
      return false;
    }

    if (currentNode.key === key) {
      if (currentNode.nextNode == null) {
        this.buckets[index] = undefined;
        return true;
      }
      this.buckets[index] = currentNode.nextNode;
      return true;
    }

    while (currentNode.nextNode != null) {
      if (currentNode.nextNode.key === key) {
        currentNode.nextNode = currentNode.nextNode.nextNode;
        return true;
      }
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  length() {
    let length = 0;
    this.buckets.forEach((bucket) => {
      if (bucket != undefined) {
        let currentNode = bucket;
        length++;

        while (currentNode.nextNode != null) {
          currentNode = currentNode.nextNode;
          length++;
        }
      }
    });
    return length;
  }

  clear() {
    // loop through the buckets and remove ALL OF THEM!!!
    this.buckets = this.buckets.map((item) => {
      item = undefined;
    });
    this.capacity = 16;
    this.buckets.length = this.capacity;
  }

  keys() {
    const keys = [];
    this.buckets.forEach((bucket) => {
      if (bucket != undefined) {
        let currentNode = bucket;
        keys.push(currentNode.key);

        while (currentNode.nextNode != null) {
          currentNode = currentNode.nextNode;
          keys.push(currentNode.key);
        }
      }
    });
    return keys;
  }

  values() {
    const values = [];
    this.buckets.forEach((bucket) => {
      if (bucket != undefined) {
        let currentNode = bucket;
        values.push(currentNode.value);

        while (currentNode.nextNode != null) {
          currentNode = currentNode.nextNode;
          values.push(currentNode.value);
        }
      }
    });
    return values;
  }

  entries() {
    const entries = [];
    this.buckets.forEach((bucket) => {
      if (bucket != undefined) {
        let currentNode = bucket;
        entries.push([currentNode.key, currentNode.value]);

        while (currentNode.nextNode != null) {
          currentNode = currentNode.nextNode;
          entries.push([currentNode.key, currentNode.value]);
        }
      }
    });
    return entries;
  }
}
