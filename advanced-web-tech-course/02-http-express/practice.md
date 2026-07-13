# Module 2 — Practice

Start the server first: `cd 02-http-express && npm install && node code/express-server.js`

## Read the codes

1. Run `curl -i http://localhost:3000/success` and `curl -i http://localhost:3000/not-found`.
   Write down the **first line** of each response. What is the difference?

2. What status code does `POST /users` return, and **why is it not 200**?

3. `curl -i http://localhost:3000/no-content`. Why is there no JSON body?

## Add your own routes

4. Add a route `GET /forbidden` that returns **403 Forbidden** with a JSON
   message. Test it with `curl -i`.

5. Add `GET /redirect-me` that returns **301** and redirects to `/success`
   (hint: `res.redirect(301, "/success")`). Test with `curl -i -L`.

6. Extend `GET /users/:id`: if the `id` is negative, return **400** with the
   message `"id must be positive"`. Test both a valid and an invalid id.

## Headers

7. Hit `GET /headers-demo` and list every custom header the server sent.
   Which one changes on each request, and why?

8. Add a header `X-Course: RPSCSOP602` to the `/success` route and confirm it
   appears in `curl -i`.

## Concept (short answer)

9. A user submits a form with a missing required field. Which status code
   should the server return, 400 or 500? Justify.

10. Explain the difference between `401 Unauthorized` and `403 Forbidden`.
