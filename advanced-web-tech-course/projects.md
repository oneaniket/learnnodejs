# Course Projects — Advanced Web Technologies (RPSCSOP602)

**Level: Master's** · **Covers CO1 – CO5** · **Effort: 25–35 hours per project**

Seven full-stack capstone projects. Each one is a complete application that
exercises **all nine modules** of the course — Node.js and the event loop,
HTTP status codes, MongoDB schema design, CRUD with MVC, TypeScript, React
components, data lists and CSS, forms and state, and the frontend–backend
integration from the capstone module.

These are not extended practicals. Every project has a **hard core** — one
genuinely difficult engineering problem that cannot be solved by copying the
Module 9 task manager and renaming things. That core is different in each
project, so seven students can build seven projects and learn seven different
lessons.

Every project also carries a **mandatory authentication and authorization
layer**. The mechanism is the same everywhere — password hashing, JWT, route
middleware — but the *authorization shape* differs per project: role-based in
one, field-level in another, relationship-based in a third. Bolting the same
login form onto seven apps teaches nothing; deciding who may do what in seven
different domains teaches quite a lot.

**Pick one. Build it properly.** Depth beats breadth.

---

## Contents

- [What every project must contain](#what-every-project-must-contain)
- [Shared repository layout](#shared-repository-layout)
- [Technology baseline](#technology-baseline)
- [Authentication & authorization — required in every project](#authentication--authorization--required-in-every-project)
- [Project index](#project-index)
- [P1 — Library Management System](#p1--library-management-system)
- [P2 — Restaurant Order & Kitchen Display](#p2--restaurant-order--kitchen-display)
- [P3 — E-Commerce Catalog & Cart](#p3--e-commerce-catalog--cart)
- [P4 — Student Result Management System](#p4--student-result-management-system)
- [P5 — Expense Tracker (TypeScript end to end)](#p5--expense-tracker-typescript-end-to-end)
- [P6 — Clinic Appointment Booking](#p6--clinic-appointment-booking)
- [P7 — Blog CMS with Revision History](#p7--blog-cms-with-revision-history)
- [Cross-cutting deliverables](#cross-cutting-deliverables)
- [Grading rubric](#grading-rubric)

---

## What every project must contain

Regardless of which project you pick, the following must be present and will be
checked. The right-hand column tells you which module taught it.

| # | Requirement | Module |
| - | ----------- | ------ |
| 1 | A documented **async/event-loop decision** — one place where you deliberately kept work off the main thread, or measured a blocking operation and fixed it | [1](../01-node-fundamentals/README.md) |
| 2 | **Correct HTTP semantics** — `200 / 201 / 204 / 400 / 404 / 409 / 422 / 500`, plus at least two meaningful custom response headers | [2](../02-http-express/README.md) |
| 3 | **At least three Mongoose models**, using **both** referencing (`ObjectId` + `ref` + `populate`) **and** embedding, with the choice justified in writing | [3](../03-mongodb-models/README.md) |
| 4 | Strict **MVC layering** — `models/ controllers/ routes/`, plus a service layer where the project calls for it. Full CRUD on every primary resource | [4](../04-crud-mvc/README.md) |
| 5 | **TypeScript**: the entire backend is TypeScript, and a shared `types/` module defines the API contract used by both halves. At least one generic and one class hierarchy with inheritance | [5](../05-typescript/README.md) |
| 6 | A React frontend built from **composed components** — no single 300-line `App.js` | [6](../06-react-hello/README.md) |
| 7 | At least one **data list rendered with `.map()`** and stable keys, plus hand-written **CSS** (grid or flexbox, responsive, no UI framework doing the work for you) | [7](../07-react-data-css/README.md) |
| 8 | At least two **controlled forms** with client-side validation, using `useState`, props, and lifting state up | [8](../08-react-forms/README.md) |
| 9 | Frontend and backend as **separate programs** talking over HTTP/JSON, with **CORS**, a single frontend data-layer module, and loading + error states in the UI | [9](../09-fullstack/README.md) |
| 10 | **Authentication and authorization** — hashed passwords, JWT, route middleware, roles, ownership checks, protected frontend routes. See [the section below](#authentication--authorization--required-in-every-project) | 2, 4, 5, 8, 9 |

If any of the ten is missing, the project is incomplete regardless of how
polished the rest is.

---

## Shared repository layout

Every project uses the same shape. It is the Module 4 MVC structure, promoted to
TypeScript and given a frontend.

```
my-project/
├── shared/
│   └── types.ts                 # the API contract — imported by BOTH halves
├── backend/
│   ├── src/
│   │   ├── models/              # M — Mongoose schemas, no HTTP knowledge
│   │   │   └── user.model.ts    # password hash, roles — never returns the hash
│   │   ├── controllers/         # C — request in, response out, no query building
│   │   │   └── auth.controller.ts
│   │   ├── services/            # business rules — no `req`, no `res`
│   │   │   └── auth.service.ts  # hashing, token issue/verify/rotate
│   │   ├── routes/              # method + path -> controller. No logic.
│   │   ├── middleware/
│   │   │   ├── authenticate.ts  # verifies the token, populates req.user
│   │   │   ├── authorize.ts     # role check — authorize("admin","staff")
│   │   │   ├── ownership.ts     # "is this row yours?" — per project
│   │   │   ├── validate.ts
│   │   │   └── errorHandler.ts
│   │   ├── db.ts
│   │   └── app.ts               # exports the app WITHOUT listening
│   ├── src/server.ts            # the only file that calls app.listen()
│   ├── __tests__/
│   ├── seed.ts                  # seeds one user per role
│   ├── .env.example
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/                 # every fetch() lives here, nowhere else
│   │   │   └── client.js        # attaches the token, handles 401 centrally
│   │   ├── auth/                # AuthContext, useAuth, ProtectedRoute
│   │   ├── components/
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── README.md
└── DESIGN.md
```

### The layering contract (graded)

| Layer | May do | May **never** do |
| ----- | ------ | ---------------- |
| Model | Schema, validation, hooks, virtuals, indexes | Import Express; know about status codes |
| Service | Business rules, transactions, orchestration | Reference `req` or `res` — checked with `grep` |
| Controller | Parse request, call service, send response | Build raw Mongoose queries inline |
| Routes | Map method + path to a handler, and declare its guards | Contain an `if` — including an `if (user.role === ...)` |
| Middleware | Authenticate, authorize, validate, handle errors | Contain domain rules that belong in a service |
| Frontend component | Render, own local UI state | Call `fetch` directly — that belongs in `api/` |

Authorization is declared in the routes layer and enforced in middleware, so the
permission model of the whole API is readable in one file:

```ts
router.post("/",          authenticate, authorize("librarian"), ctrl.issue);
router.get("/:id/loans",  authenticate, ownsMemberRecord,       ctrl.loans);
```

A role check written as an `if` inside a controller is a layering violation.

`app.ts` must export the app without calling `listen`, exactly as
[`04-crud-mvc/src/app.js`](../04-crud-mvc/src/app.js) does, so tests can import
it.

---

## Technology baseline

```bash
# backend
npm i express mongoose dotenv cors
npm i bcrypt jsonwebtoken cookie-parser express-rate-limit   # auth
npm i -D typescript ts-node @types/node @types/express @types/cors \
        @types/bcrypt @types/jsonwebtoken @types/cookie-parser \
        jest ts-jest supertest @types/supertest mongodb-memory-server

# frontend
npx create-react-app frontend
npm i react-router-dom            # protected routes
```

MongoDB: Atlas free tier (M0) or local Community — see
[Module 0](../00-setup/README.md). **P6 requires a replica set**, so use Atlas
for that one.

No UI component library. The CSS is yours — that is Practical 6.

---

## Authentication & authorization — required in every project

Two different questions, often confused, and the distinction is graded:

- **Authentication** — *who are you?* Wrong or missing credentials → **`401
  Unauthorized`**.
- **Authorization** — *are you allowed to do this?* Correctly identified, but
  not permitted → **`403 Forbidden`**.

Module 2's [practice.md](../02-http-express/practice.md) asks you to explain
that difference. Here you implement it.

### The `User` model

| Field | Notes |
| ----- | ----- |
| `email` | unique, lowercase, `match:` validated (the Module 3 pattern) |
| `passwordHash` | **never** `password`. `select: false` so it cannot leak by accident |
| `role` | `enum` — the values differ per project, see each project below |
| `refreshTokenVersion` | integer, incremented to invalidate all sessions |
| `isActive`, `lastLoginAt` | |

Two rules on this model:

1. Hash in a `pre('save')` hook — Module 6's middleware lesson, applied to
   security. Hashing in a controller is a layering violation.
2. Override `toJSON` so the hash can never reach a response even if some future
   query forgets `select: false`. Defence in depth.

```ts
userSchema.pre("save", async function () {
  if (!this.isModified("passwordHash")) return;   // don't re-hash a hash
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
});
```

That `isModified` guard is the bug everyone ships: without it, every profile
update re-hashes the hash and locks the user out permanently.

### Endpoints (identical in all seven projects)

| Method | Path | Success | Failure |
| ------ | ---- | ------- | ------- |
| POST | `/api/auth/register` | `201` | `409` if the email is taken, `422` on a weak password |
| POST | `/api/auth/login` | `200` + tokens | `401` |
| POST | `/api/auth/refresh` | `200` + a new access token | `401` |
| POST | `/api/auth/logout` | `204` | — |
| GET | `/api/auth/me` | `200` current user | `401` |
| PATCH | `/api/auth/password` | `204` | `401` if the current password is wrong |

### Token design

- **Access token** — JWT, short-lived (15 min), carries `{ sub, role }`.
- **Refresh token** — long-lived (7 days), sent as an `httpOnly` cookie,
  rotated on every use, and carrying `refreshTokenVersion` so a password change
  kills every existing session.
- Secrets come from `.env`. A hardcoded JWT secret is an automatic deduction.

### Required security practices

- **bcrypt with a cost factor of at least 12.** Never MD5, never SHA-256 alone,
  never plaintext, never a home-made hash.
- **Uniform login failure.** "Wrong password" and "no such account" must return
  the same status and the same message. Different responses let an attacker
  enumerate which emails are registered.
- **Rate limit** `/api/auth/login` — 5 attempts per 15 minutes per IP → `429 Too
  Many Requests`.
- **Never log a token or a password**, including in your request logger.
  Redact them explicitly.
- **Server-side authorization only.** Hiding a button in React is a UX
  nicety, not a control. Every protected endpoint must reject the request on its
  own, and you must prove it with a `curl` that bypasses your UI entirely.

### Ownership checks — the part most people get wrong

Role checks are easy. The hard case is a correctly-authenticated user with the
correct role reading **someone else's row**:

```
GET /api/members/507f.../loans      # logged in as a different member
```

Roles alone say yes. That is **IDOR** (Insecure Direct Object Reference), and it
is the single most common real-world API vulnerability. Every project below
names its own IDOR target — find it, exploit it deliberately with `curl`, then
close it and prove the same `curl` now returns `403`.

Related, and already present in the course code: `update` in
[`task.controller.js`](../04-crud-mvc/src/controllers/task.controller.js)
forwards raw `req.body` into `findByIdAndUpdate`. In an app with a `User` model,
that lets a client `PATCH` their own `role` to `admin`. **Whitelist updatable
fields on every update endpoint.**

### Frontend requirements

- An `AuthContext` holding the current user, with a `useAuth()` hook.
- A `ProtectedRoute` wrapper that redirects anonymous users to `/login` and
  remembers where they were going.
- Login and registration as **controlled forms** with validation — Practical 7,
  doing something real.
- One `api/client.js` that attaches the access token to every request and, on a
  `401`, transparently refreshes once and retries; if the refresh also fails, it
  logs out. Components must never see this.
- The UI adapts to role: a waiter and a manager see different navigation.
- Session survives a page refresh.

### Deliverables

1. **A permission matrix** in `DESIGN.md` — every endpoint × every role, with
   each cell marked allow / deny / own-records-only. This is the document that
   proves you thought about it rather than sprinkling middleware around.
2. **A token-storage decision.** `localStorage` versus `httpOnly` cookie —
   compare the XSS and CSRF exposure of each, state which you shipped and why.
   There is no free option; the grade is for the argument.
3. **Auth tests**, in `__tests__`:
   - a protected endpoint returns `401` with no token,
   - `403` with a valid token of the wrong role,
   - `403` for the project's IDOR case,
   - an expired token is rejected,
   - a tampered signature is rejected,
   - a token issued before a password change no longer works.
4. **A short threat write-up** covering NoSQL injection (what does
   `{"email": {"$ne": null}}` do to a naive login query?), mass assignment, and
   your rate-limiting choice.

---

## Project index

| # | Project | Hard core | Authorization shape | Difficulty |
| - | ------- | --------- | ------------------- | ---------- |
| [P1](#p1--library-management-system) | Library Management | Relationships, referential integrity, derived state | Plain role-based + own-records | ★★★☆☆ |
| [P2](#p2--restaurant-order--kitchen-display) | Restaurant Orders | Embedded subdocuments, state machine, live polling | **Field-level** — same route, different writable fields per role | ★★★★☆ |
| [P3](#p3--e-commerce-catalog--cart) | E-Commerce Catalog | Query layer, indexing, pagination, URL-synced filters | **Guest → user transition**, cart merge on login | ★★★★☆ |
| [P4](#p4--student-result-management-system) | Student Results | Aggregation pipelines, reporting, CSV import | **Relationship-based** — faculty may grade only their own courses | ★★★★☆ |
| [P5](#p5--expense-tracker-typescript-end-to-end) | Expense Tracker | Type-safe contract across the wire, generics, discriminated unions | **Tenancy isolation** — every query scoped by owner | ★★★☆☆ |
| [P6](#p6--clinic-appointment-booking) | Appointment Booking | Concurrency, double-booking, transactions | **Sensitive records** + authorization inside a transaction | ★★★★★ |
| [P7](#p7--blog-cms-with-revision-history) | Blog CMS | Mongoose middleware, soft delete, versioning, audit | **Ownership × document state** — rights change once published | ★★★★☆ |

No two projects have the same authorization problem. Read the shape column
before choosing.

---

## P1 — Library Management System

> Librarians manage books and members; members borrow and return; the system
> tracks who has what and what is overdue.

### The hard core: relationships and derived state

Module 3 taught referencing and `populate`; Module 4 then used a single model
with no relationships at all. This project lives in that gap. The difficulty is
not writing CRUD — it is deciding what is stored versus computed, and what
happens when you delete something that other documents point at.

### Models

| Model | Fields | Relationship |
| ----- | ------ | ------------ |
| `Book` | `isbn` (unique), `title`, `author`, `category`, `copiesTotal` | — |
| `Member` | `name`, `email` (unique), `membershipType` enum, `joinedAt` | — |
| `Loan` | `issuedAt`, `dueDate`, `returnedAt` (nullable), `fineAmount` | **references** `Book` + `Member` |
| `Reservation` | embedded queue inside `Book` | **embedded** |

You must use referencing for `Loan` and embedding for the reservation queue, and
justify both choices in `DESIGN.md`.

### API surface

| Method | Path | Notes |
| ------ | ---- | ----- |
| CRUD | `/api/books`, `/api/members` | Full five operations each |
| POST | `/api/loans` | Issue. `409` if no copy available, `422` if member is over their borrow limit |
| PATCH | `/api/loans/:id/return` | Compute the fine on return |
| GET | `/api/members/:id/loans?active=true` | Populated, but selective |
| GET | `/api/books/:id/availability` | Derived |
| POST | `/api/books/:id/reserve` | Join the queue |

### Frontend

Book catalogue as a responsive card grid with a search box and category filter;
member detail page listing active loans with overdue rows visually flagged; an
"Issue book" form and a "Register member" form.

### The hard parts

1. **Derived vs stored availability.** `copiesAvailable = copiesTotal − active
   loans`. Compute per request, or maintain a denormalised counter? Implement
   one, explain the failure mode of the other.
2. **Delete with dependents.** `DELETE /api/books/:id` while loans are active.
   Implement all three policies — block with `409`, cascade, orphan-nullify —
   behind a query flag, and argue which a real library wants.
3. **Fine calculation belongs in a service**, not a controller and not a
   component. The frontend must never compute money.
4. **Over-population.** A populated loan list must not embed the entire member
   document in every row. Control `populate` field selection and measure the
   payload size difference.

### Roles & authorization

| Role | May do |
| ---- | ------ |
| `member` | Browse the catalogue; read **their own** loans and reservations; reserve a book |
| `librarian` | Everything a member can, plus issue, return, waive a fine, CRUD books |
| `admin` | Everything, plus CRUD members and role changes |

The `Member` document and the `User` account are the same person — decide
whether to merge them into one model or link them with a reference, and defend
it. Merging is simpler; linking survives a librarian who is also a borrower.

**IDOR target:** `GET /api/members/:id/loans`. A logged-in member passing another
member's id must get `403`, not that member's borrowing history. Exploit it with
`curl` first, then fix it, then show both transcripts.

**Second case:** fine waiving. A member must not be able to `PATCH` their own
`fineAmount` to `0`. This is the mass-assignment hole from Module 4 with money
attached.

### Project-specific deliverable

A short document showing the JSON payload size of the loan list before and after
you constrained `populate`, in bytes.

---

## P2 — Restaurant Order & Kitchen Display

> Waiters place orders from a menu; the kitchen sees incoming orders on a live
> board and advances them through preparation to served.

### The hard core: embedded subdocument CRUD, a state machine, and live updates

Two screens with different jobs, sharing one dataset. Order items are embedded,
not referenced — so you get to do CRUD *inside* a document, which nothing in the
course has covered. And the kitchen board must update without a manual refresh,
which is where Module 1's event loop stops being theory.

### Models

| Model | Shape |
| ----- | ----- |
| `MenuItem` | `name`, `category`, `price`, `available` — referenced and shared |
| `Order` | `tableNumber`, `status` enum `placed→preparing→served→paid`, embedded `items[]`, `placedAt`, timestamps per transition |
| `OrderItem` (embedded) | `menuItem` ref, `nameSnapshot`, `unitPrice`, `quantity`, `notes` |

`total` is a **virtual**, never a stored field (the Module 3 pattern).

### API surface

| Method | Path | Notes |
| ------ | ---- | ----- |
| CRUD | `/api/menu` | Full |
| POST | `/api/orders` | `201` |
| GET | `/api/orders?status=preparing` | Kitchen board feed |
| POST | `/api/orders/:id/items` | Add a line to an existing order |
| PATCH | `/api/orders/:id/items/:itemId` | Change quantity or notes |
| DELETE | `/api/orders/:id/items/:itemId` | Remove a line |
| PATCH | `/api/orders/:id/status` | Advance the state machine |

### Frontend

Two routes. **Waiter view:** menu grid, click to add to a draft order, quantity
controls, submit. **Kitchen view:** columns per status, cards moving between
them, colour-coded by how long the order has been waiting.

### The hard parts

1. **Price snapshotting.** The menu price changes tomorrow; a paid order's total
   must not move. Store `unitPrice` at insert time and explain in `DESIGN.md`
   why `populate` alone is the wrong tool here.
2. **Two ways to update a subdocument.** Implement both — (a) `findById`,
   mutate `doc.items.id(itemId)`, `save()`; (b) a one-shot `updateOne` with the
   `$` positional operator. Benchmark them, and state which is correct under
   concurrent requests and why.
3. **A real state machine.** Illegal transitions (`paid → preparing`) return
   `409`. The transition table lives in the service layer, in one place, and is
   the single source of truth.
4. **Live updates without a refresh.** Poll `GET /api/orders` from the kitchen
   view with `useEffect` + `setInterval`, remembering to clear the interval on
   unmount. Then support conditional requests: the server sends an `ETag` or
   `Last-Modified` header and returns **`304 Not Modified`** when nothing has
   changed. This is Practical 3 doing real work.
5. **Event-loop evidence.** Add an endpoint that generates the end-of-day
   summary. Implement it once with a synchronous loop over every order and once
   asynchronously. Show, with timings, that the blocking version makes the
   kitchen board stop updating — the Module 1 lesson, in your own app.

### Roles & authorization — field-level

This is the project's distinctive authorization problem: three roles hit the
**same order document**, and each may write a different subset of its fields.
Route-level role checks are not enough.

| Role | May write | May **not** |
| ---- | --------- | ----------- |
| `waiter` | Create orders; add/edit/remove items **while `status = placed`** | Change status past `preparing`; touch `unitPrice`; edit the menu |
| `kitchen` | Advance `status` `placed → preparing → served` **only** | Add, remove or edit any item; change any price |
| `manager` | Everything, including `paid`, discounts, and menu CRUD | — |

So `PATCH /api/orders/:id` cannot simply be `authorize("kitchen","manager")`.
Build a **per-role field whitelist** applied before the update reaches the model,
and prove with `curl` that a kitchen token sending `{"items": [...]}` gets
`403` rather than a silently ignored field. Silently dropping the field is a
weaker answer — say why you chose whichever you shipped.

**IDOR target:** a waiter reading or modifying another waiter's open order.
Decide whether that is actually wrong in a restaurant — it may legitimately be
allowed — and document the decision either way. Not every cross-user access is a
vulnerability; knowing the difference is the point.

**Audit requirement:** every status transition records who performed it. A
disputed bill needs a name attached.

---

## P3 — E-Commerce Catalog & Cart

> A shopper browses a large product catalogue, filters and sorts it, and builds
> a cart. An admin manages the products.

### The hard core: a query layer that survives real data volume

`findAll` in [`task.controller.js`](../04-crud-mvc/src/controllers/task.controller.js)
supports one hardcoded filter and an unbounded `find()`. That is fine for twenty
tasks and useless for fifty thousand products. This project is about the
distance between those two.

### Models

`Product` (`name`, `slug` unique, `description`, `category` ref, `price`,
`stock`, `tags[]`, `rating`, `images[]`), `Category` (`name`, `parent` ref —
self-referencing), `Cart` (`sessionId`, embedded `items[]` with quantity and
price snapshot).

### The endpoint that carries the project

```
GET /api/products?category=laptops&minPrice=30000&maxPrice=80000
    &tags=gaming,ssd&q=thin&sort=-price,name&page=3&limit=24&fields=name,price,images
```

### Requirements

- A reusable `buildQuery(query, allowedFields)` helper. It is neither controller
  code nor model code — decide where it belongs in the MVC layout and defend the
  placement.
- **Whitelist** filterable fields. `?__proto__[x]=1` or an unlisted field must
  never reach MongoDB.
- Response envelope `{ data, page, limit, total, totalPages }`, plus an
  `X-Total-Count` response header.
- `limit` capped server-side. An uncapped `limit` is a denial-of-service vector.
- Full-text search across `name` and `description` via a MongoDB text index.

### Frontend

Product grid with responsive CSS grid, a filter sidebar (category checkboxes,
price range, tag chips), a sort dropdown, and pagination controls. **Filter
state must be synchronised with the URL query string** so a filtered view can be
shared as a link and survives a page refresh. Include a skeleton loading state.

### The hard parts

1. **Measure it.** Seed 50,000 products. Report `.explain("executionStats")` for
   a category+price+sort query **before and after** adding a compound index —
   quote `totalDocsExamined` both times.
2. **Pagination at depth.** Compare offset pagination against cursor
   (`_id`-based) pagination at page 1 and page 2000, with timings. Explain why
   the curves differ.
3. **Debounced search.** The search box must not fire a request per keystroke.
   Implement debouncing in the frontend and cancel in-flight requests that have
   been superseded.
4. **Self-referencing category tree.** Rendering a nested category sidebar from
   a flat `parent`-ref collection needs either a recursive component or
   `$graphLookup`. Pick one and say why.

### Roles & authorization — the guest-to-user transition

Most of this catalogue is **public**, which makes it the only project where you
must reason about anonymous access rather than locking everything down.

| Role | May do |
| ---- | ------ |
| anonymous | Browse, search, filter; hold a cart keyed by an anonymous session id |
| `customer` | All of the above, plus a persistent cart, checkout, and **their own** order history |
| `admin` | Product and category CRUD, stock adjustment, all orders |

**The interesting problem:** a guest fills a cart, then logs in. Their anonymous
cart and their stored cart both exist. Merge them, replace one, or ask the user?
Pick a policy, implement it **atomically**, and handle the case where merging
would exceed available stock.

Implement an `optionalAuth` middleware — it populates `req.user` when a valid
token is present and passes through cleanly when it is absent, without ever
returning `401`. Distinguishing this from `authenticate` is the design point.

**IDOR targets, two of them:**
- `GET /api/orders/:id` — one customer reading another's order, complete with
  delivery address and phone number.
- `GET /api/carts/:sessionId` — guessing another shopper's session id. Session
  ids must therefore be cryptographically random, not sequential. Show how you
  generate them.

**Also required:** the admin product-write endpoints must be unreachable with a
customer token. Prove it with `curl`, since your React admin panel simply will
not render the button — and that proves nothing.

---

## P4 — Student Result Management System

> Faculty enter marks; the system computes grades, ranks, and produces
> analytics for a course and for a student.

### The hard core: aggregation, not JavaScript loops

Every endpoint in this repository returns raw documents; nothing computes
anything. This project is where MongoDB stops being a JSON bucket. The rule that
defines the project: **every report is a single aggregation pipeline.** Fetching
all documents and calling `.reduce()` in JavaScript scores zero.

### Models

`Student` (`rollNumber` unique, `name`, `program`, `semester`), `Course`
(`code` unique, `title`, `credits`, `maxMarks`), `Enrollment` (`student` ref,
`course` ref, `semester`, embedded `assessments[]` — internal, midterm, final —
`totalMarks`, `grade`, `completedAt`).

### API surface

Full CRUD on all three, plus:

| Endpoint | Pipeline |
| -------- | -------- |
| `GET /api/reports/course/:id/summary` | count, average, pass rate, highest, lowest |
| `GET /api/reports/course/:id/histogram` | `$bucket` over grade bands |
| `GET /api/reports/student/:id/transcript` | `$lookup` + credit-weighted GPA |
| `GET /api/reports/toppers?semester=4&limit=10` | `$lookup` + `$group` + `$sort` |
| `GET /api/reports/enrollments-by-month?year=2026` | `$group` on `$month`, **zero-filled** for empty months |
| `POST /api/enrollments/import` | Bulk CSV import |

### Frontend

Marks-entry form with per-field validation against `maxMarks`; a sortable
results table with conditional row styling by grade band; a course dashboard
with a hand-rolled CSS bar chart (no charting library — the bars are `div`s with
computed widths, which is Practical 6); a transcript view.

### The hard parts

1. **Where do pipelines live?** They are data logic.
   [`task.model.js`](../04-crud-mvc/src/models/task.model.js) contains zero query
   code, so this is genuinely open. Model file, repository module, or
   controller? Pick, implement, defend.
2. **Prove the pipeline earns its place.** Implement `toppers` twice — pipeline
   versus `find()` + JavaScript reduce — over 10,000 enrollments. Report
   wall-clock time and peak Node memory for both, and explain *where the work
   happened* in each case.
3. **Bulk import without blocking.** A 10,000-row CSV must not freeze the event
   loop. Stream it, batch the writes with `bulkWrite`, and report progress.
   Demonstrate the server still answers other requests during the import — this
   is Module 1's entire point, applied.
4. **Grade computation as a class hierarchy.** `abstract class GradingScheme`
   with `AbsoluteGrading` and `RelativeGrading` subclasses that override the same
   method. This is Practical 9 doing real work rather than printing animal
   sounds.

### Roles & authorization — relationship-based

Roles are not sufficient here, and that is the lesson. "Faculty may enter marks"
is wrong; the correct rule is **"faculty may enter marks for courses they
teach."** Permission depends on a relationship between the user and the specific
document, so it cannot be decided from the JWT alone — it needs a database
lookup per request.

| Role | May do |
| ---- | ------ |
| `student` | Read **only their own** transcript, marks and rank |
| `faculty` | Read the full roster and enter or amend marks **for their assigned courses only**; read aggregate reports for those courses |
| `hod` | Everything within their own department |
| `admin` | CRUD students, courses and assignments; run any report |

Add `Course.faculty` as a reference, then write an `ownsCourse` middleware that
loads the course and compares. Cache the lookup if you can justify the
invalidation.

**IDOR target:** `GET /api/reports/student/:id/transcript` with another
student's id. Marks are protected personal data — this must be `403`, and it is
the single most important check in the project.

**Second case, subtler:** `GET /api/reports/course/:id/toppers` returns ranked
names and marks. Should a student see their classmates' marks? Decide, and if
the answer is no, return a rank-only projection for the `student` role while
faculty see the full table. Same pipeline, different `$project` stage by role.

**Third case:** marks entry must be **append-only once published**. A faculty
member amending a published mark writes an audit entry with the old value, the
new value and a reason. Grade tampering is the threat model.

**Bulk import** inherits all of this: a CSV row referencing a course the
uploader does not teach must be rejected — per row, with a report of which rows
failed and why. Rejecting the whole file is acceptable only if you argue for it.

---

## P5 — Expense Tracker (TypeScript end to end)

> Users record income and expenses across accounts and categories, set monthly
> budgets, and see where the money went.

### The hard core: one type definition, honoured on both sides of the wire

Module 5 teaches TypeScript in isolation — a folder of `.ts` files that print to
a console. Nothing connects it to the API. This project closes that loop: the
API contract is a TypeScript module that **both** halves import, so a backend
field rename becomes a frontend compile error.

Lower conceptual difficulty than P6, higher discipline requirement. Choose it if
you want to get genuinely good at types.

### Models

`Account` (`name`, `type` enum `cash|bank|card`, `openingBalance`), `Category`
(`name`, `kind` enum `income|expense`, `colour`), `Transaction` (`account` ref,
`category` ref, `amount`, `date`, `note`, embedded `splits[]` for a transaction
divided across categories), `Budget` (`category` ref, `month`, `limitAmount`).

### TypeScript requirements — the substance of this project

- **A discriminated union** for transactions:
  ```ts
  type Txn =
    | { kind: "income"; amount: number; source: string }
    | { kind: "expense"; amount: number; categoryId: string }
    | { kind: "transfer"; amount: number; fromId: string; toId: string };
  ```
  Handle it with an exhaustive `switch` and a `never` check, so adding a fourth
  variant becomes a compile error at every site that must change.
- **A generic API envelope** `ApiResponse<T>` and a generic
  `paginate<T>(model, query): Promise<Paginated<T>>` used by every list
  endpoint.
- **A class hierarchy** for recurring rules: `abstract class RecurrenceRule`
  with `nextOccurrence(from: Date): Date`, implemented by `Daily`, `Weekly`,
  `Monthly` subclasses (Practical 9).
- `strict: true`. No `any`. `npm run check` must pass clean, and the CI-style
  check is part of the grade.
- The **shared types module** is imported by backend and frontend both. Demonstrate
  the payoff: rename a field in `shared/types.ts` and screenshot the compile
  errors it produces on both sides.

### Frontend

Transaction entry form with a category picker and a split-transaction sub-form
(dynamic rows — add and remove); a filterable transaction list grouped by date;
budget progress bars coloured by percentage consumed; a month switcher.

### The hard parts

1. **Split transactions must always sum to the parent amount.** Enforce it in a
   custom Mongoose validator *and* in the form, and explain why both are needed.
2. **Money is not a float.** Store minor units (paise) as integers. Write the
   conversion at the API boundary, once. Show the classic `0.1 + 0.2` failure in
   your `DESIGN.md` as justification.
3. **Running balance.** Computed per account. Decide: stored, aggregated on
   read, or computed in the frontend. Defend it.

### Roles & authorization — tenancy isolation

This project has almost no role hierarchy and the strictest data boundary on the
list: **every document belongs to exactly one user, and no user may ever see
another's row.** There is no admin who can read your transactions. That single
constraint turns out to be harder to guarantee than a role matrix, because it
must hold on *every query you will ever write* — one forgotten `userId` filter
leaks another person's finances.

| Role | May do |
| ---- | ------ |
| `user` | Full CRUD over **their own** accounts, categories, transactions and budgets |
| `admin` | Manage accounts and read platform metrics — **never** transaction contents |

**Do not solve this with an `if` in each controller.** You will forget one.
Solve it structurally, and argue for your choice:

- a `pre(/^find/)` query hook injecting the owner from request context
  (`AsyncLocalStorage`), the Module 7 middleware idea applied to security; or
- a repository layer where every method takes `userId` as a **required** first
  parameter, so TypeScript refuses to compile a query that omits it.

The second option is the reason this project is TypeScript-first: the compiler
enforces the security property. Show a screenshot of the compile error when a
query forgets its owner. That screenshot is the deliverable.

**IDOR target:** `GET /api/transactions/:id`, `PATCH /api/budgets/:id`, and
`DELETE /api/accounts/:id` with another user's id. All three must be `403`.

Prefer **`404` over `403`** here and explain why: telling an attacker "that
transaction exists but is not yours" is itself a leak. This is a genuine
trade-off against debuggability — argue it rather than asserting it.

**Extra credit — shared budgets.** Let a user invite another to a shared
household budget with `viewer` or `editor` rights. Strict per-row ownership now
becomes per-row ACLs, and the whole isolation model has to be redesigned. Only
attempt this after the simple version is complete and tested.

---

## P6 — Clinic Appointment Booking

> Patients book slots with doctors; doctors have working hours; the same slot
> must never be booked twice.

### The hard core: concurrency

This is the hardest project on the list, and it is hard for a reason no
single-user test will ever reveal. Two patients click "Book" on the same slot at
the same millisecond. The Module 4 controller pattern — check, then write —
loses that race every time. You cannot fix it in the controller.

**Requires MongoDB Atlas** (transactions need a replica set).

### Models

`Doctor` (`name`, `speciality`, embedded `workingHours[]` per weekday,
`slotMinutes`), `Patient` (`name`, `phone` unique), `Appointment` (`doctor` ref,
`patient` ref, `startsAt`, `endsAt`, `status` enum
`booked|cancelled|completed|no-show`), `Holiday`.

### API surface

| Method | Path | Notes |
| ------ | ---- | ----- |
| CRUD | `/api/doctors`, `/api/patients` | Full |
| GET | `/api/doctors/:id/slots?date=2026-09-01` | **Computed**, not stored |
| POST | `/api/appointments` | `409` on a taken slot, `422` outside working hours |
| PATCH | `/api/appointments/:id/cancel` | Frees the slot |
| PATCH | `/api/appointments/:id/reschedule` | Atomic: free the old slot, take the new one, or do neither |

### Frontend

Doctor list with speciality filter; a day/week slot grid where taken slots are
visibly disabled; booking form with confirmation; a "my appointments" view with
cancel. The UI must handle a `409` gracefully — the slot was taken while the
user was deciding, so refresh the grid and say so plainly.

### The hard parts

1. **Slot generation is derived.** Do not store empty slots. Generate them from
   working hours minus existing appointments minus holidays. Handle a slot
   pattern that does not divide evenly into the working window.
2. **Win the race — three ways.** Implement and compare:
   - a naive check-then-write (and *prove* it breaks),
   - a unique compound index on `{doctor, startsAt}` catching `E11000` and
     mapping it to `409`,
   - a Mongoose session + transaction.

   Write up which you shipped and why.
3. **Prove it with a script.** Fire 50 concurrent bookings at one slot using
   `Promise.all`. Exactly one must succeed and 49 must return `409`. Show the
   naive version's output alongside it. This is the deliverable that decides the
   grade.
4. **Reschedule is atomic** — old slot freed and new slot taken, or neither.
   A crash halfway must not lose the appointment.
5. **Time zones.** Store UTC, render local. Book an appointment, change your
   machine's time zone, reload, and confirm it still shows the right time.

### Roles & authorization — sensitive records, and auth inside a transaction

Medical data carries the strictest confidentiality requirement of any project
here, and the authorization interacts directly with the hard core.

| Role | May do |
| ---- | ------ |
| `patient` | Book, view and cancel **their own** appointments; browse doctors and free slots |
| `doctor` | View **their own** schedule and their patients' appointment history; mark completed or no-show | 
| `receptionist` | Book and cancel on behalf of any patient; view the day's schedule | 
| `admin` | Doctor CRUD, working hours, holidays |

**The intersection with the hard core — this is the part that makes P6 hardest.**
Your booking path is a transaction: check the slot, check working hours, write
the appointment. Where does the authorization check go? If it sits *outside* the
transaction, a permission that changes mid-flight is evaluated against stale
state. If it sits *inside*, it must be part of the same session. State where you
put it and why, and make sure your 50-concurrent-booking script runs **with
authentication on** — that is the realistic test, and tokens change the timing.

**IDOR targets:**
- `GET /api/appointments/:id` — one patient reading another's appointment,
  which reveals which doctor and therefore likely diagnosis.
- `PATCH /api/appointments/:id/cancel` — cancelling a stranger's appointment.
  Denial of service against an individual.
- `GET /api/doctors/:id/schedule` — a patient enumerating a doctor's full
  patient list.

**Free-slot enumeration:** `GET /api/doctors/:id/slots` must show which slots are
*free* without revealing who occupies the others. Return availability only,
never the occupant.

**Audit trail:** every read of a patient's record is logged with the reader's
identity. In healthcare, read access is auditable, not just writes. Implement it
and explain why reads matter here but not in P3.

**Rate limit booking**, not just login. An authenticated script booking every
slot on every doctor is a valid attack even with perfect authorization.

### Concept write-up

Node is single-threaded, so why is there a race condition at all? Answer it
properly, in terms of `await` yielding to the event loop between the read and
the write. This is Practical 4 examined at Master's level.

---

## P7 — Blog CMS with Revision History

> Authors write posts through a draft-and-publish workflow; every edit is
> recoverable; nothing is ever truly deleted; readers comment.

### The hard core: Mongoose middleware doing work the controllers never see

The Module 4 delete is permanent — the data is simply gone. Real systems cannot
do that: audit, compliance, undo. The constraint that defines this project:
**soft delete, versioning and audit are implemented in Mongoose middleware, not
in controller code.** If a controller mentions `deletedAt`, you have missed the
point.

### Models

`Post` (`title`, `slug` unique, `body`, `author` ref, `status` enum
`draft|published|archived`, `tags[]`, `version`, `deletedAt` nullable,
`publishedAt`), `Revision` (`post` ref, `version`, `title`, `body`, `changedAt`,
`changedBy`), `Comment` (`post` ref, `parent` ref for threading, `body`,
`approved`), `AuditLog` (`collection`, `documentId`, `action`, `before`,
`after`, `at`).

### Middleware you must write

| Hook | Job |
| ---- | --- |
| `pre('save')` | Bump `version`, write a `Revision` |
| `pre(/^find/)` | Auto-append `{ deletedAt: null }` so deleted posts vanish from **every** read without touching a controller |
| `post('save')`, `post('findOneAndUpdate')` | Write an `AuditLog` entry |
| `pre('validate')` | Generate a unique slug from the title |
| Query helper | `.withDeleted()` to opt out of the soft-delete filter |

### API surface

CRUD, plus `DELETE /api/posts/:id` (soft), `POST /api/posts/:id/restore`,
`GET /api/posts/:id/revisions`, `GET /api/posts/:id/revisions/:v`,
`POST /api/posts/:id/revert/:v`, `GET /api/posts/:id/diff?from=3&to=5`,
threaded comment endpoints, and a moderation queue.

### Frontend

Post editor with autosave-to-draft (debounced); a revision sidebar with a
side-by-side diff view (write the line diff yourself — it is a good algorithm
exercise); a published post list with tag filter; a threaded comment tree
(recursive component); a moderation dashboard; a trash view using
`.withDeleted()`.

### The hard parts

1. **The trap you will hit.** `findByIdAndUpdate` does **not** fire
   `pre('save')`. You will discover this the hard way when revisions silently
   stop being written. Document the difference between document middleware and
   query middleware, and how you resolved it.
2. **Unique slug on a soft-deleted document.** A unique index plus soft delete
   collide: delete `my-post`, create `my-post` again, and it fails. Solve it
   with a partial index and explain the fix.
3. **Revert is an edit, not a rewrite.** Reverting to v3 creates v6 with v3's
   content. History is append-only. Justify that design.
4. **Threaded comments.** Choose between a `parent` reference with a recursive
   fetch, and a materialised path. Implement one, and say what the other would
   have cost.
5. **Autosave must not hammer the API.** Debounce, and skip the request when
   nothing actually changed.

### Roles & authorization — ownership crossed with document state

The distinctive problem here: **permission depends on both who you are and what
state the document is in.** An author owns their draft completely and owns their
published post barely at all.

| Role | Draft (own) | Draft (others') | Published (own) | Published (others') |
| ---- | ----------- | --------------- | --------------- | ------------------- |
| `reader` | — | — | read | read |
| `author` | full CRUD | — | read; propose an edit | read |
| `editor` | read | read | edit, unpublish | edit, unpublish |
| `admin` | full | full | full | full |

Note the cell that carries the project: an author editing their **own published**
post. Allowing a silent edit means published history can be rewritten. Choose
one and defend it:

- edits create a new draft revision requiring editorial approval, or
- edits are allowed but every one is public in the revision history.

Whichever you pick, the permission check must consult `post.author`,
`post.status` **and** `req.user.role` together. A `authorize("author")` on the
route is not enough — write a policy function and unit-test its truth table
directly, separately from the HTTP layer. That truth table is a deliverable.

**IDOR targets:**
- `GET /api/posts/:id` for an unpublished draft — an anonymous reader must get
  `404`, not `403`. A `403` confirms the draft exists and leaks the slug of
  unannounced content.
- `POST /api/posts/:id/revert/:v` — reverting someone else's post.
- `GET /api/posts/:id/revisions` — revision history can contain text that was
  deliberately removed before publication. Restrict it accordingly.

**Soft delete meets authorization:** the `pre(/^find/)` hook hides deleted posts
from everyone. `.withDeleted()` must be reachable **only** by editors and above —
otherwise your trash view becomes a public archive of retracted content. This is
the sharpest interaction between the two halves of the project.

**Comments** bring their own model: a reader may edit their own comment within
15 minutes of posting, an editor may moderate any comment, and unapproved
comments are visible only to their author and to editors. Rate-limit comment
creation.

**XSS, seriously.** This project stores user-authored HTML and renders it back.
If you use `dangerouslySetInnerHTML`, you must sanitise server-side on write,
and demonstrate a stored-XSS payload being neutralised. Storing Markdown and
rendering it safely is the easier correct answer — either way, show the
before-and-after.

---

## Cross-cutting deliverables

Every project repository must contain the following.

### Tests — non-negotiable

[`04-crud-mvc/src/app.js`](../04-crud-mvc/src/app.js) already exports the app
without calling `listen`, specifically so a test file can import it. Use that.

```bash
npm i -D jest ts-jest supertest mongodb-memory-server
```

Minimum coverage: one test per CRUD verb on every primary resource, plus the
`400`, `404` and `409` paths, plus **one test that exercises your project's hard
core** — the race condition, the state machine, the pipeline, the middleware —
plus the **six auth tests** listed in the auth section. Write a `loginAs(role)`
test helper; without it the auth suite becomes unbearable to maintain, which is
itself a lesson.

### Documents

| File | Contents |
| ---- | -------- |
| `README.md` | Setup for both halves, environment variables, full endpoint table, one sample `curl` per endpoint, screenshots |
| `DESIGN.md` | Every design decision your project told you to defend. Include the schema diagram, the embed-vs-reference justification, the **permission matrix**, and the token-storage argument. **This is the CO2/CO4 evidence.** |
| `SECURITY.md` | Threat write-up: NoSQL injection, mass assignment, IDOR (with the before/after `curl` transcripts), rate limiting, and what you knowingly left out |
| `MODULES.md` | A table mapping each of the nine modules to the specific file and line where you used it |
| `seed.ts` | One command that gives a grader realistic running data, **including one seeded account per role** with the credentials printed in `README.md` |
| `.env.example` | Committed, with placeholder values — `JWT_SECRET=changeme`, never a real one. `.env` itself stays gitignored |

### Engineering hygiene

- Meaningful git history — incremental commits, not one `final upload`.
- No secrets in any commit, ever. Check before pushing.
- A request-logging middleware and a `/health` endpoint.
- Consistent error response shape across every endpoint.
- Loading and error states in every view that fetches. A spinner that never
  resolves is a bug.

---

## Grading rubric

| Weight | Criterion | What is actually checked |
| ------ | --------- | ------------------------ |
| 20% | **Hard core** | Did you solve the project's defining problem, with the evidence it asked for? |
| 15% | **Auth & authorization** | Hashing, tokens, the permission matrix, and the IDOR case demonstrably closed |
| 12% | **Architecture & MVC** | The layering contract holds. `grep -r "req\." src/services/` returns nothing |
| 12% | **Data modelling** | Both embedding and referencing used, correctly, and justified |
| 10% | **HTTP correctness** | Right status code for every case, including `401` vs `403`, `409`, `422`, `429` |
| 8% | **TypeScript** | `strict: true` passes, shared contract genuinely shared, no stray `any` |
| 10% | **React** | Composed components, keyed lists, controlled forms, hand-written responsive CSS |
| 8% | **Tests** | They pass; one covers the hard core, and the auth suite is complete |
| 5% | **Documentation** | `DESIGN.md` argues rather than describes; `MODULES.md` is honest |

### Automatic deductions

- Passwords stored in plaintext, or hashed with MD5/SHA alone.
- A JWT secret hardcoded in source, or any secret committed to git.
- A protected endpoint that a `curl` with no token can reach.
- An **IDOR that still works** — this alone caps the project at a pass.
- A role check written as an `if` inside a controller instead of middleware.
- Raw `req.body` passed into an update, leaving `role` client-settable.
- Authorization enforced only by hiding buttons in React.
- Tokens or passwords appearing in server logs.
- `fetch` called directly from a component instead of the `api/` layer.
- A report computed with a JavaScript loop where the project required a pipeline.
- Business logic in a route file.
- A single `App.js` over 300 lines.

### Viva questions you should expect

1. Show me the line that rejects a valid token belonging to the wrong user.
2. `401` or `403` — for an expired token? For a deleted account? Justify each.
3. Why is your access token short-lived if you also have a refresh token?
4. I change my password on my laptop. Why does my phone's session die?
5. Demonstrate your IDOR — the broken version, then the fixed one.
6. What does `{"email": {"$ne": null}}` do to a naive login query, and what in
   your code stops it?

---

## Course outcome mapping

| Outcome | Where it is demonstrated |
| ------- | ------------------------ |
| **CO1** — working of Node.js | The async/event-loop deliverable; non-blocking I/O under load; `MODULES.md` §1–2 |
| **CO2** — apply the MVC pattern | Layering contract; service layer; authorization declared in routes and enforced in middleware; `DESIGN.md` |
| **CO3** — classify React/Node code, modify per the database | Component decomposition; TypeScript contract; role-driven UI |
| **CO4** — design schemas and perform CRUD | Three-plus models, embed vs reference, indexes, full CRUD, ownership fields |
| **CO5** — combine frontend and backend | Two programs, CORS with credentials, one data layer, authenticated flow end to end |

---

## Suggested schedule

| Week | Work |
| ---- | ---- |
| 1 | Pick a project. Design the schema **and the permission matrix**. Write `DESIGN.md` §1. Set up both repos |
| 2 | Backend models + CRUD + tests. `shared/types.ts` |
| 3 | **Auth and authorization**, backend only — register, login, refresh, middleware, roles, ownership, the six auth tests |
| 4 | **The hard core.** Nothing else until it works and is measured |
| 5 | Frontend: components, CSS, forms, `AuthContext`, protected routes |
| 6 | Wire the halves. Error and loading states. Seed data. Evidence, benchmarks, `SECURITY.md`, screenshots |

Build auth in week 3, **before** the hard core and before any UI. Retrofitting
authorization onto finished endpoints is how the ownership checks get missed —
which is exactly how it happens in industry, and exactly what the IDOR
deliverable is there to catch.

---

Course home: [README.md](../README.md) · Module notes: [0](../00-setup/README.md)
· [1](../01-node-fundamentals/README.md) · [2](../02-http-express/README.md)
· [3](../03-mongodb-models/README.md) · [4](../04-crud-mvc/README.md)
· [5](../05-typescript/README.md) · [6](../06-react-hello/README.md)
· [7](../07-react-data-css/README.md) · [8](../08-react-forms/README.md)
· [9](../09-fullstack/README.md)
