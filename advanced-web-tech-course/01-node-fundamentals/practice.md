# Module 1 — Practice

## Predict-the-output (do these BEFORE running)

1. Write down the output, then run to check:
   ```js
   console.log("a");
   setTimeout(() => console.log("b"), 0);
   Promise.resolve().then(() => console.log("c"));
   console.log("d");
   ```
   Explain **why** `c` prints before `b`.

2. Add a `process.nextTick(() => console.log("e"))` to the snippet above.
   Where does `e` appear in the output, and why?

## Hands-on

3. Run [`code/blocking.js`](code/blocking.js). Change the block from 3000 ms to
   5000 ms. What happens to the timer callback? Explain in one sentence.

4. In [`code/non-blocking.js`](code/non-blocking.js), change the slow work from
   2000 ms to 3500 ms. How many heartbeats print now? Why did the count change?

5. Rewrite this callback code using **async/await**:
   ```js
   function readConfig(cb) {
     setTimeout(() => cb(null, { theme: "dark" }), 200);
   }
   readConfig((err, cfg) => console.log(cfg));
   ```

6. Write a function `fetchThree()` that awaits three `delay(300)` calls
   **one after another**, then measures total time with `Date.now()`. Roughly
   how long does it take? Now make them run **at the same time** using
   `Promise.all`. How long now? Explain the difference.

## Concept (short answer)

7. Node.js is single-threaded. How can it handle thousands of simultaneous
   network requests without one slow request blocking the others?

8. Give one real example of code that would **block** the event loop, and
   explain how you would rewrite it to be non-blocking.
