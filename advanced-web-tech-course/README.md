# Practical of Advanced Web Technologies (RPSCSOP602)

A **12-hour, hands-on** course for Master's students covering the modern
JavaScript full-stack: **Node.js, Express, MongoDB, TypeScript, and React**.

Every module is practical-first: you write and run code. Concepts are
introduced only when needed to understand the next piece of code.

---

## Course Outcomes (CO)

| CO  | You will be able to...                                                          |
| --- | ------------------------------------------------------------------------------ |
| CO1 | Demonstrate the working of Node.js                                              |
| CO2 | Apply the MVC pattern in programs                                               |
| CO3 | Classify code based on React, Node & modify based on database                   |
| CO4 | Design database schemas and perform CRUD operations using MongoDB              |
| CO5 | Combine frontend and backend to build complete apps with seamless data flow    |

---

## 12-Hour Schedule

| #   | Module                        | Time    | Practical(s)      | CO        |
| --- | ----------------------------- | ------- | ----------------- | --------- |
| 0   | Setup & Tooling               | 0.5 hr  | —                 | —         |
| 1   | Node.js Fundamentals + Event Loop | 1.5 hr | P4            | CO1       |
| 2   | HTTP & Express (status/headers)   | 1.5 hr | P3            | CO1       |
| 3   | MongoDB Data Models           | 1.0 hr  | P1                | CO4       |
| 4   | CRUD with MVC                 | 1.5 hr  | P2                | CO2, CO4  |
| 5   | TypeScript                    | 1.5 hr  | P8, P9            | CO3       |
| 6   | React: First App & Components | 1.0 hr  | P5                | CO3       |
| 7   | React: Data Lists & CSS       | 1.0 hr  | P6                | CO3       |
| 8   | React: Forms, Props & State   | 1.0 hr  | P7                | CO3       |
| 9   | Full-Stack App (combine all)  | 1.5 hr  | P10               | CO5       |
|     | **Total**                     | **12 hr** |                 |           |

### Syllabus Practical → Module map

| Practical | Description                                             | Module |
| --------- | ------------------------------------------------------- | ------ |
| P1  | Implement MongoDB data models                                 | 3      |
| P2  | Simple CRUD app with Node.js + MongoDB                        | 4      |
| P3  | Send various HTTP status codes and response headers          | 2      |
| P4  | Event loop and its role in async tasks                       | 1      |
| P5  | React first app + Hello World with components                | 6      |
| P6  | Components to display a set of data + CSS                     | 7      |
| P7  | Form in React using component props & state                  | 8      |
| P8  | Data structures and functions using TypeScript               | 5      |
| P9  | Classes and inheritance (TypeScript)                         | 5      |
| P10 | Full-stack web application combining all                     | 9      |

---

## How to use this repo

Each module folder contains:

- **`README.md`** — the concept + worked examples (this is what becomes the PDF).
- **`code/`** or **`src/`** — runnable, heavily-commented source code.
- **`practice.md`** — practice questions (and mini-tasks) for students.

### Recommended path

1. Read the module `README.md`.
2. Open the code, run it, break it, fix it.
3. Do the `practice.md` questions before moving on.

---

## Prerequisites

- Basic JavaScript (variables, functions, arrays, objects).
- A computer with **Node.js 18+** and a code editor (VS Code recommended).
- MongoDB — either installed locally or a free **MongoDB Atlas** account.

See **[Module 0](00-setup/README.md)** for full setup instructions.

---

## Generating the PDFs

All module notes can be exported to PDF:

```bash
npm install          # once, installs the md-to-pdf tool
npm run pdf          # generates pdf/*.pdf from every module README
```

PDFs are written to the `pdf/` folder.

---

## License

MIT — free to use for teaching and learning.
