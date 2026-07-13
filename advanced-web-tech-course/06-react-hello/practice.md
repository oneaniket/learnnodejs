# Module 6 — Practice

Setup: `cd 06-react-hello && npm install && npm start` (opens localhost:3000).

## Understand the boot chain

1. Open `public/index.html`. Which element does React render into? Delete the
   `id="root"` and reload — what breaks and why? (Put it back after.)

2. In `src/index.js`, what does `root.render(<App />)` do?

## Build components

3. Change `Greeting.js` to display your own name instead of "World". Save and
   watch the browser hot-reload.

4. Create a new component `Footer.js` that renders your course code
   (`RPSCSOP602`). Import and show it in `App.js` below the card.

5. In `App.js`, add a variable `const year = 2026` and display
   `Made in {year}` using JSX curly braces.

6. Create a component `Clock.js` that shows the current time using
   `new Date().toLocaleTimeString()` inside JSX. (It will not tick yet — that
   needs state, coming in Module 8.)

## Compose

7. Create `ProfileCard.js` that composes `Greeting` plus a `<p>` with a short
   bio. Render two `ProfileCard`s in `App.js`.

## Concept (short answer)

8. What is JSX, and why do we write `className` instead of `class`?

9. Why are components useful? Give one real UI example where the same component
   would be reused many times.
