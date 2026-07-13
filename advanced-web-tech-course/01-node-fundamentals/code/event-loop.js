// event-loop.js
// Run:  node event-loop.js
//
// Goal: understand the ORDER in which the event loop runs different tasks.
//
// The rule to remember:
//   1) All synchronous code first (the "call stack").
//   2) Then ALL microtasks   (Promises, process.nextTick).
//   3) Then macrotasks        (setTimeout, setInterval, I/O), one round at a time.

console.log("1: start"); // synchronous -> runs immediately

// MACROTASK: a timer. Its callback waits until sync + microtasks are done.
setTimeout(() => {
  console.log("5: setTimeout (macrotask)");
}, 0);

// MICROTASK: a resolved Promise. Runs after sync code, before any timer.
Promise.resolve().then(() => {
  console.log("4: promise .then (microtask)");
});

// process.nextTick is an EVEN-HIGHER-priority microtask in Node:
// it runs before regular Promise microtasks.
process.nextTick(() => {
  console.log("3: process.nextTick (runs before promises)");
});

console.log("2: end"); // synchronous -> runs immediately

// Expected output (memorize this ordering):
// 1: start
// 2: end
// 3: process.nextTick (runs before promises)
// 4: promise .then (microtask)
// 5: setTimeout (macrotask)
