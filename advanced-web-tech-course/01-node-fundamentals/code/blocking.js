// blocking.js
// Run:  node blocking.js
//
// Goal: show what happens when you BLOCK the single thread with a long
// synchronous loop. During the block, nothing else can run — no timers,
// no incoming requests. This is the mistake to avoid.

console.log("Start");

// A deliberately slow SYNCHRONOUS function: it spins the CPU for `ms`
// milliseconds. Because it is synchronous, the event loop is frozen the
// entire time.
function blockFor(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    // busy-wait: doing nothing useful, just burning time on the one thread
  }
}

// We schedule a timer that WANTS to fire "immediately" (0 ms)...
setTimeout(() => {
  console.log("Timer fired — but only AFTER the block finished");
}, 0);

// ...but this blocking call runs first and holds the thread for 3 seconds,
// so the timer above cannot fire until this returns.
blockFor(3000);

console.log("End of synchronous code (after 3s block)");

// Expected output:
// Start
// End of synchronous code (after 3s block)   <-- ~3 seconds later
// Timer fired — but only AFTER the block finished
