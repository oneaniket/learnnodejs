# Module 0 — Setup & Tooling

**Time: 30 minutes** · No practical, but nothing else works until this is done.

By the end you will have Node.js, a code editor, and MongoDB ready.

---

## 1. Install Node.js (the JavaScript runtime)

Node.js lets you run JavaScript **outside the browser** — on your machine, on a
server. It is the foundation of every backend module in this course.

1. Go to <https://nodejs.org> and download the **LTS** version (18 or newer).
2. Install it.
3. Verify in a terminal:

```bash
node -v      # should print v18.x or higher
npm -v       # npm = Node Package Manager, installed with Node
```

> **What is `npm`?** It downloads and manages the third-party code
> ("packages") your project depends on, such as Express or React.

---

## 2. Install a code editor

Use **VS Code** (<https://code.visualstudio.com>). Recommended extensions:

- **ESLint** — flags mistakes as you type.
- **Prettier** — auto-formats code.
- **MongoDB for VS Code** — browse your database inside the editor.

---

## 3. Install MongoDB (the database)

You have **two options** — pick one.

### Option A — MongoDB Atlas (cloud, easiest, recommended)

No install needed. Runs in the cloud, free tier is enough for this course.

1. Sign up at <https://www.mongodb.com/atlas>.
2. Create a **free (M0) cluster**.
3. Create a database user (username + password).
4. Under **Network Access**, allow your IP (or `0.0.0.0/0` for learning only).
5. Click **Connect → Drivers** and copy the connection string. It looks like:

```
mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/coursedb
```

You will paste this into a `.env` file in later modules.

### Option B — MongoDB Community (local install)

- macOS (Homebrew):
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community
  brew services start mongodb-community
  ```
- Windows / Linux: follow <https://www.mongodb.com/docs/manual/installation/>.

Local connection string:

```
mongodb://127.0.0.1:27017/coursedb
```

Verify with the Mongo shell:

```bash
mongosh            # opens a shell connected to your local server
```

---

## 4. How each code folder works

Backend modules are standalone Node projects. To run one:

```bash
cd 01-node-fundamentals/code
npm install        # install that module's dependencies (if any)
node event-loop.js # run a file
```

React modules are created with **Create React App** and run with `npm start`.

> **`.env` files hold secrets** (like your DB password). They are listed in
> `.gitignore` so they are **never** pushed to GitHub. Each backend module
> ships a `.env.example` — copy it to `.env` and fill in your values.

---

## 5. Quick sanity check

Create a file `hello.js` anywhere and run it:

```js
// hello.js
console.log("Node is working:", process.version);
```

```bash
node hello.js
# Node is working: v20.x.x
```

If you see your Node version printed, you are ready. Go to
**[Module 1](../01-node-fundamentals/README.md)**.
