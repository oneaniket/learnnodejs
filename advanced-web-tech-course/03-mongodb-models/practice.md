# Module 3 — Practice

Setup: `cd 03-mongodb-models && npm install && cp .env.example .env`
(edit `.env`), then `node code/demo.js`.

## Understand the demo

1. Run `demo.js`. Copy the output. Which line proves that **validation** is
   working? Which line proves **referencing** (`.populate`) is working?

2. In `models.js`, the email is stored lowercase even though we passed
   `ADA@example.com`. Which schema option causes this?

## Modify the models

3. Add a `tags` field to `postSchema` that is an **array of strings** with a
   default of `[]`. Create a post with two tags and print them.

4. Add validation to `userSchema`: `email` must match a basic email pattern.
   Use a `match:` regex option. Test it by trying to save an invalid email.

5. Add a new field `inStock` (Boolean, default `true`) to each embedded order
   item. Create an order where one item is out of stock and print it.

## Model a new relationship

6. Create a `commentSchema` where each comment references both a `Post` and a
   `User` (by `ObjectId`). Create one comment and `.populate()` both refs.

7. **Design question:** You are modeling a blog. A `User` can write many
   `Post`s. Would you *embed* the posts inside the user document or *reference*
   them? Justify your choice in 2-3 sentences.

## Concept (short answer)

8. Give two differences between a SQL table and a MongoDB collection.

9. When would embedding be a **bad** idea? Give a concrete example.
