# Module 9 — Practice (Capstone)

Run **both** halves (two terminals): backend on `:4000`, frontend on `:3000`.
See the module README for the exact commands.

## Verify the data flow

1. Add a task in the UI. Then open `http://localhost:4000/api/tasks` in the
   browser. Is your task there? What does this prove about where the data lives?

2. Add a task, then **refresh** the page. Why do the tasks survive the refresh
   (unlike Module 8, where they vanished)?

3. Stop the backend and try to add a task in the UI. What error appears, and
   which line in `App.js` shows it?

## Extend the feature (frontend + backend)

4. Add a `priority` field (low/medium/high) end to end:
   - Backend: add it to `task.model.js`.
   - Backend: accept it in `task.controller.js` `create`.
   - Frontend: add a `<select>` to `TaskForm.js` and send it in `tasksApi.js`.
   - Frontend: show it in `TaskList.js`.
   List every file you changed.

5. Add an **edit** feature: let the user click a task title to edit it, then
   `PUT` the new title. (Backend already supports update.)

6. Add a filter (All / Active / Completed) in the UI using state. (No backend
   change needed — filter the tasks already in state.)

## Backend only

7. Add a `GET /api/tasks/stats` route that returns `{ total, completed,
   remaining }`. Test it with `curl`.

8. Add server-side validation: reject a title longer than 100 characters with
   status `400`.

## Concept (short answer)

9. Draw (or describe in words) the full path of a **delete** request from the
   button click to MongoDB and back to the updated UI.

10. What is CORS, and why do we need `app.use(cors())` in this project but not in
    Module 4?

11. What does `useEffect(() => { ... }, [])` do, and why is the empty array
    important here?

12. Map each of the 5 Course Outcomes (CO1–CO5) to a specific piece of this
    full-stack app.
