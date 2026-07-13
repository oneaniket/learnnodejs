# Module 8 — Practice

Setup: `cd 08-react-forms && npm install && npm start`.

## State basics

1. Build a `Counter` component with a button that increases a count using
   `useState`. Add a second button that resets it to 0.

2. In the counter, try `count++` instead of `setCount(count + 1)`. Why does the
   number not update on screen?

## Extend the form

3. Add a third field `role` using a `<select>` with options `student` / `admin`.
   Make it part of the form state and show it in the list.

4. Add validation: the email must contain both `@` and `.`. Show a clear error
   when it does not.

5. Disable the **Add User** button while the name field is empty. (Hint:
   `disabled={!form.name.trim()}`.)

## Data flow

6. Add a **Delete** button next to each user in the list. Clicking it should
   remove that user. (Hint: `setUsers(users.filter(u => u.id !== id))`.)

7. Move the users list into its own `UserList` component that receives `users`
   as a prop. The form stays in `App`. Confirm it still works.

8. Add a live counter above the form that shows how many characters are in the
   name field as you type.

## Concept (short answer)

9. Explain the difference between **props** and **state** in one sentence each.

10. What is a "controlled input"? Why is it useful for validation?

11. What does "data down, events up" mean in React? Point to where it happens in
    this module's code.
