import { smartArrayDiff } from "./index.js";

console.log("🧩 Running smart-array-diff tests...\n");

// Primitive array test
const diff1 = smartArrayDiff([1, 2, 3], [2, 3, 4]);
console.log("Test 1:", diff1);

// String array test
const diff2 = smartArrayDiff(["apple", "banana"], ["banana", "cherry"]);
console.log("Test 2:", diff2);

// Object array with getKey
const oldData = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
];
const newData = [
    { id: 2, name: "B+" }, // updated
    { id: 3, name: "C" },  // same
    { id: 4, name: "D" },  // added
];
const diff3 = smartArrayDiff(oldData, newData, (i) => i.id);
console.log("Test 3:", diff3);

console.log("\n✅ All test cases executed successfully!");