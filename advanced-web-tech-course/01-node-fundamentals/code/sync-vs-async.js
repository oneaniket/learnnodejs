// sync-vs-async.js
// Run:  node sync-vs-async.js
//
// Goal: SEE the difference between synchronous and asynchronous code.

// --- Synchronous: runs strictly top-to-bottom ---
console.log("Sync A");
console.log("Sync B");
console.log("Sync C");
// The three lines above always print in order, because each finishes
// before the next begins.

// --- Asynchronous: setTimeout defers its callback ---
// Even with a 0 ms delay, the callback does NOT run now. It is scheduled
// to run AFTER the current (synchronous) code has finished.
setTimeout(() => {
  console.log("Async (setTimeout 0ms) — I run LAST");
}, 0);

// This line is synchronous, so it runs before the timeout callback above.
console.log("Sync D — I run before the async line");

// Expected output:
// Sync A
// Sync B
// Sync C
// Sync D — I run before the async line
// Async (setTimeout 0ms) — I run LAST
