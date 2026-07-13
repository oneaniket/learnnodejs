// data.js — the "set of data" we will display.
// In a real app this would come from an API (see Module 9). Here it is a plain
// array so we can focus on rendering and styling.

const users = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com", role: "student", active: true },
  { id: 2, name: "Grace Hopper", email: "grace@example.com", role: "admin", active: true },
  { id: 3, name: "Alan Turing", email: "alan@example.com", role: "student", active: false },
  { id: 4, name: "Katherine Johnson", email: "katherine@example.com", role: "student", active: true },
  { id: 5, name: "Dennis Ritchie", email: "dennis@example.com", role: "admin", active: false },
];

export default users;
