import HashMap from "./HashMap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("lion", "diamond");
test.set("moon", "silver");
test.set("crazy", "kengkoy");
test.set("wew", "petmalu");
console.log(test.buckets);
console.log(test.has("crazy"));
console.log(test.length());
console.log(test.get("ice cream"));
console.log(test.has("lion"));
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
