# Module 4 — Practice

Setup: `cd 04-crud-mvc && npm install && cp .env.example .env` (edit `.env`),
then `npm start`.

## Exercise the API

1. Create three tasks with different priorities using `curl`. Paste the
   commands and the `_id` returned for each.

2. Read all tasks. Then read a single task by its id. What status code do you
   get for a **non-existent** but valid-looking id? What about a **malformed**
   id like `abc`?

3. Update one task to `completed: true`. Confirm with a follow-up GET.

4. Delete a task, then try to GET it again. What status code comes back?

## Trace the MVC layers

5. Follow a single `POST /api/tasks` request through the code. List, in order,
   every file it touches from `server.js` to the database and back.

6. In one sentence each, state the single responsibility of the **model**, the
   **controller**, and the **routes** file.

## Extend it

7. Add a new field `dueDate` (Date) to the model. Update the create controller
   so a client can set it. Test creating a task with a due date.

8. Add a controller + route for `PATCH /api/tasks/:id/toggle` that flips
   `completed` between true and false. (Hint: find it, flip, save.)

9. Add server-side filtering: `GET /api/tasks?priority=high` should return only
   high-priority tasks. (Extend the `findAll` controller.)

## Concept (short answer)

10. What problem does the MVC pattern solve? Describe what this same app would
    look like if all the code were in one file, and why that is worse.
