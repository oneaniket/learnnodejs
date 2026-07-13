// 01-basics.ts  (Practical 8: functions & basic types)
// Run:  npx ts-node src/01-basics.ts
//
// Goal: see TypeScript's basic type annotations and typed functions.

// ---------- Primitive types ----------
// The `: type` after a variable is a type ANNOTATION. The compiler enforces it.
const username: string = "Ada";
const age: number = 36;
const isStudent: boolean = true;

// This would be a COMPILE error (uncomment to see):
// const wrong: number = "not a number";

console.log(`${username}, age ${age}, student: ${isStudent}`);

// ---------- Typed functions ----------
// Parameters and the return value are typed. Passing the wrong type is caught.
function add(a: number, b: number): number {
  return a + b;
}
console.log("add(2, 3) =", add(2, 3));

// Optional parameter (?) and default parameter.
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}` : `Hello, ${name}`;
}
console.log(greet("Ada"));
console.log(greet("Lovelace", "Ms."));

// `void` means the function returns nothing useful.
function logLine(msg: string): void {
  console.log("LOG:", msg);
}
logLine("functions are typed");

// ---------- Interfaces describe object shapes ----------
interface User {
  id: number;
  name: string;
  email?: string; // optional field
}

function describeUser(u: User): string {
  const email = u.email ?? "no email"; // ?? = "use right side if left is null/undefined"
  return `#${u.id} ${u.name} (${email})`;
}
console.log(describeUser({ id: 1, name: "Ada" }));
console.log(describeUser({ id: 2, name: "Grace", email: "grace@example.com" }));

// ---------- Union types ----------
// A value that may be one of several types.
function formatId(id: number | string): string {
  return `ID-${id}`;
}
console.log(formatId(7));
console.log(formatId("abc"));
