# Module 1 — Node.js Fundamentals & the Event Loop

**Time: 1.5 hours** · Covers **Practical 4** · **CO1**

> Practical 4: *Explain the concept of the event loop and its role in managing
> asynchronous tasks in Node.js.*

---

## Part A — What is Node.js? (concept, ~15 min)

Node.js is a **runtime**: a program that executes JavaScript on your machine
instead of in a browser. It uses Google's **V8** engine (the same one in
Chrome) to run the code, and adds abilities the browser does not have — reading
files, listening on network ports, talking to databases.

Two ideas make Node powerful:

1. **Single-threaded.** Your JavaScript runs on **one** thread. There is only
   one thing executing at any instant.
2. **Non-blocking / asynchronous.** Slow operations (reading a file, a network
   request, a DB query) do **not** freeze that thread. Node starts the
   operation, keeps running other code, and comes back to the result later.

How can one thread stay busy while waiting for slow work? That is the job of
the **event loop**.

---

## Part B — Synchronous vs Asynchronous (~15 min)

**Synchronous** code runs top to bottom, each line finishing before the next
starts. If a line is slow, everything waits.

```js
console.log("A");
console.log("B");
console.log("C");
// Output: A B C   (always, in order)
```

**Asynchronous** code hands slow work off and continues. The result arrives
later, via a **callback**, **Promise**, or **async/await**.

```js
console.log("A");
setTimeout(() => console.log("B"), 0); // "later", even with 0 ms delay
console.log("C");
// Output: A C B   <-- B is last, this surprises everyone at first
```

Why is `B` last? Because `setTimeout` schedules its callback to run **after**
the current code finishes. That scheduling is the event loop at work.

Run it yourself: [`code/sync-vs-async.js`](code/sync-vs-async.js)

---

## Part C — How Node handles slow work (~20 min)

Node.js does **not** perform every operation on one thread. JavaScript runs on
one main thread, while Node delegates slow operations to the operating system
or to **libuv**, Node's internal asynchronous I/O library.

### The restaurant analogy

Imagine running a restaurant alone. You take orders, cook, wash dishes, serve
customers, and collect payment. Only one customer can be served at a time.

```
Manager → Take order → Cook food → Serve food → Take next order
```

With kitchen staff, you take an order and hand the cooking work to the kitchen.
While food is cooking, you can keep taking orders from other customers.

```
Customer → Manager → Kitchen staff
                     ↓
              food is prepared
```

Node.js works similarly: JavaScript starts work, delegates slow work, and
handles the result later.

### Example: reading a file

```js
const fs = require("fs");

fs.readFile("data.txt", (err, data) => {
  if (err) return console.error(err);
  console.log(data.toString());
});

console.log("Finished");
```

JavaScript does **not** read the file itself. Node asks the operating system or
libuv to do the work, then immediately continues. `Finished` therefore prints
before the file contents.

A file read might take 50 milliseconds, 500 milliseconds, or five seconds.
JavaScript should not stop and wait for it. This is why the file-read work is
delegated instead of being performed by JavaScript itself.

Depending on the operation, the work is handled by the **operating system** or
the **libuv thread pool**. Common examples include file system work, some DNS
lookups, cryptography, and compression. These tasks happen outside the main
JavaScript thread.

### The libuv thread pool

libuv's thread pool has **four worker threads by default**. Certain delegated
tasks can run independently while the main JavaScript thread remains available.

```
File A → Worker 1
File B → Worker 2
File C → Worker 3
File D → Worker 4
```

Meanwhile, JavaScript can continue handling requests and executing more code:

```
Handle request → Run JavaScript → Accept another request → Continue
```

---

## Part D — The Event Loop (~30 min)

Think of the event loop as a **manager with a to-do list** that never stops
checking: *"Is the main code done? Is any finished background work ready to
run?"*

Node keeps a few queues. The loop empties them in a fixed order. The order you
must remember:

1. **Call stack** — the code running *right now*. Runs to completion first.
2. **Microtasks** — Promise callbacks (`.then`, `await`) and `process.nextTick`.
   Drained **completely** after the current code and **before** any timer.
3. **Macrotasks** — timers (`setTimeout`, `setInterval`) and I/O callbacks.
   Run **after** all microtasks are empty.

### The classic ordering example

```js
console.log("1: start");                        // sync -> call stack

setTimeout(() => console.log("2: timeout"), 0); // macrotask

Promise.resolve().then(() => console.log("3: promise")); // microtask

console.log("4: end");                          // sync -> call stack
```

**Output:**

```
1: start
4: end
3: promise
2: timeout
```

Reasoning:

- `1` and `4` are plain synchronous code → run immediately, in order.
- `3` is a Promise microtask → runs right after sync code, before any timer.
- `2` is a timer macrotask → runs last, even with `0` ms.

Run and study: [`code/event-loop.js`](code/event-loop.js)

### Why this matters

Because Node is single-threaded, **long synchronous code blocks everything** —
including the event loop, so no timers or requests get handled. The whole point
of async APIs is to keep the loop free. Compare:

- Blocking: [`code/blocking.js`](code/blocking.js) — freezes for 3 seconds.
- Non-blocking: [`code/non-blocking.js`](code/non-blocking.js) — stays responsive.

---

## Part E — How a completed operation returns to JavaScript

When delegated work finishes, Node makes its callback ready to run. The event
loop checks whether the call stack is empty; when it is, the callback can be
executed on the main JavaScript thread.

```
Completed file read → Callback queue → Event loop → Call stack → Callback runs
```

If the call stack is not empty, the callback waits. If it is empty, the event
loop moves the ready callback from the queue to the call stack for execution.

### Complete execution flow

```
JavaScript
  ↓
fs.readFile()
  ↓
Operating system / libuv thread pool
  ↓
Read file
  ↓
File read completes
  ↓
Callback becomes ready
  ↓
Event loop
  ↓
Call stack is empty
  ↓
Execute callback in JavaScript
```

### Example and output

```js
const fs = require("fs");

console.log("Start");

fs.readFile("test.txt", () => {
  console.log("File loaded");
});

console.log("End");
```

**Output:**

```
Start
End
File loaded
```

Reasoning:

1. `Start` runs immediately.
2. `fs.readFile()` delegates the file read; JavaScript does not wait.
3. `End` runs immediately.
4. When the file read completes and the call stack is clear, the event loop
   allows the callback to run.
5. `File loaded` prints last.

---

## Part F — Three ways to handle async results (~20 min)

Same task (wait, then produce a value), written three ways.

### 1. Callbacks (oldest style)

```js
function getUser(id, callback) {
  setTimeout(() => callback(null, { id, name: "Ada" }), 500);
}
getUser(1, (err, user) => {
  if (err) return console.error(err);
  console.log(user);
});
```

Nesting many callbacks becomes "callback hell". Promises fix that.

### 2. Promises

```js
function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "Ada" }), 500);
  });
}
getUser(1).then((user) => console.log(user));
```

### 3. async / await (modern, cleanest — use this)

```js
async function main() {
  const user = await getUser(1); // "pause here until the Promise resolves"
  console.log(user);
}
main();
```

`await` does **not** block the thread — the event loop keeps running other work
while this function is paused.

Full comparison: [`code/async-styles.js`](code/async-styles.js)

---

## Summary

- Node runs JavaScript on **one thread** using V8.
- Node does **not** perform every task on one thread: slow work is delegated to
  the operating system or the libuv thread pool, depending on the operation.
- Slow work is **non-blocking**; results come back later.
- The **event loop** orders that work: sync code → microtasks (Promises) →
  macrotasks (timers/IO).
- Never block the loop with long synchronous work.
- Prefer **async/await** for readable asynchronous code.

### Summary diagram

```
JavaScript
  ↓
Main JavaScript thread starts file read
  ↓
Operating system / libuv thread pool reads file
  ↓
Completed callback becomes ready
  ↓
Event loop checks the call stack
  ↓
Callback executes in JavaScript
```

---

## Check your understanding

1. What does “single-threaded” mean in Node.js?
2. Does Node.js execute every task on one thread?
3. What is the role of the event loop?
4. What is libuv and what is its thread pool?
5. Why does `fs.readFile()` not block the application?
6. What is the difference between synchronous and asynchronous execution?
7. How does Node.js achieve concurrency with one JavaScript thread?

Now do [`practice.md`](practice.md).
