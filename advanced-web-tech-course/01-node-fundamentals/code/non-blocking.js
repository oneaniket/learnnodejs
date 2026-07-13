// non-blocking.js
// Run:  node non-blocking.js
//
// Goal: the RIGHT way — use asynchronous APIs so the event loop stays free.
// A repeating timer keeps printing ("app is responsive") while we wait for
// a slow operation, proving the thread was never frozen.

console.log("Start");

// A heartbeat: prints every 500 ms to prove the app is still responsive.
let ticks = 0;
const heartbeat = setInterval(() => {
  ticks += 1;
  console.log(`  heartbeat ${ticks} (app is responsive)`);
}, 500);

// Simulate slow work the NON-BLOCKING way. setTimeout hands the wait to the
// event loop instead of spinning the CPU, so the heartbeat keeps firing.
function slowWorkAsync(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("slow work done"), ms);
  });
}

async function main() {
  const result = await slowWorkAsync(2000); // waits WITHOUT blocking the thread
  console.log(result);
  clearInterval(heartbeat); // stop the heartbeat so the program can exit
  console.log("End");
}

main();

// Expected output (heartbeats interleave with the wait — thread never froze):
// Start
//   heartbeat 1 (app is responsive)
//   heartbeat 2 (app is responsive)
//   heartbeat 3 (app is responsive)
//   heartbeat 4 (app is responsive)
// slow work done
// End
