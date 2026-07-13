// async-styles.js
// Run:  node async-styles.js
//
// Goal: the SAME async task written three ways — callback, Promise, async/await.
// All three fetch a fake user after a short delay. Compare readability.

// A tiny helper that resolves after `ms` milliseconds (non-blocking).
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------- 1) CALLBACK style (oldest) ----------
// The result is delivered by calling `callback(error, data)`.
function getUserCallback(id, callback) {
  setTimeout(() => {
    if (id <= 0) return callback(new Error("invalid id"));
    callback(null, { id, name: "Ada (callback)" });
  }, 300);
}

// ---------- 2) PROMISE style ----------
// Returns a Promise; consumer uses .then()/.catch().
function getUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) return reject(new Error("invalid id"));
      resolve({ id, name: "Ada (promise)" });
    }, 300);
  });
}

// ---------- 3) ASYNC/AWAIT style (modern, cleanest) ----------
// An async function can `await` a Promise as if it were synchronous,
// but WITHOUT blocking the event loop.
async function getUserAsync(id) {
  await delay(300); // pause here, thread stays free
  if (id <= 0) throw new Error("invalid id");
  return { id, name: "Ada (async/await)" };
}

// Demo: run all three in sequence.
async function main() {
  // 1) callback
  getUserCallback(1, (err, user) => {
    if (err) return console.error("callback error:", err.message);
    console.log("callback  ->", user);
  });

  // 2) promise
  getUserPromise(1)
    .then((user) => console.log("promise   ->", user))
    .catch((err) => console.error("promise error:", err.message));

  // 3) async/await (with try/catch for errors)
  try {
    const user = await getUserAsync(1);
    console.log("async/await ->", user);
  } catch (err) {
    console.error("async error:", err.message);
  }
}

main();
