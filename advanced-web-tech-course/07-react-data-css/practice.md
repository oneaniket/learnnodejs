# Module 7 — Practice

Setup: `cd 07-react-data-css && npm install && npm start`.

## Work with the list

1. Add two more users to `src/data.js`. Confirm they appear without touching any
   other file. Why did no other file need to change?

2. Remove the `key` prop from the `.map()` in `UserList.js`. Open the browser
   console — what warning appears? Put the key back.

3. Sort the users alphabetically by name before rendering. (Hint: `[...users]
   .sort(...)` inside `App.js`.)

## Props & components

4. Add a `phone` field to each user in `data.js` and display it in `UserCard`.

5. Create a new component `RoleTag.js` that takes a `role` prop and renders it
   styled. Use it inside `UserCard` instead of the inline `<span>`.

## CSS

6. Change the grid so cards are at least `300px` wide. Resize the window — how
   does the layout respond?

7. Give **admin** users a different card background color using conditional
   `className` (e.g. `user-card admin`). Add the `.admin` CSS rule.

8. Add a hover effect that changes the card border color.

## Filtering (combines list + logic)

9. In `App.js`, show only **active** users. (Hint: `users.filter(u => u.active)`
   before passing to `UserList`.)

## Concept (short answer)

10. Why does React need a `key` on list items? What can go wrong without a
    stable key?

11. What are props, and can a child component change the props it receives?
