# TypeScript Beginner to Moderate

A practical TypeScript learning guide designed to take you from **beginner to moderate level** through explanations, examples, exercises, and small projects.

## Learning Path

1. TypeScript basics
2. Types and type inference
3. Arrays, objects, tuples, and enums
4. Functions
5. Union, intersection, and literal types
6. Interfaces and type aliases
7. Classes and OOP
8. Generics
9. Type narrowing
10. Utility types
11. Modules
12. Async TypeScript
13. Error handling
14. Working with APIs
15. TypeScript with Node.js
16. Moderate-level TypeScript patterns
17. Small real-world project

---

# Lesson 1 — TypeScript Basics

## What is TypeScript?

TypeScript is essentially **JavaScript with a type system**.

JavaScript allows this:

```javascript
let age = 25;

age = "twenty five";
```

TypeScript can prevent this mistake:

```typescript
let age: number = 25;

age = "twenty five";
```

TypeScript reports:

```text
Type 'string' is not assignable to type 'number'.
```

The basic flow is:

```text
TypeScript
    ↓ compile
JavaScript
    ↓
Node.js / Browser
```

---

## 1. Basic Types

Common TypeScript types include:

```typescript
string
number
boolean
null
undefined
object
```

Example:

```typescript
let username: string = "Rahul";

let age: number = 30;

let isAdmin: boolean = true;
```

The syntax is:

```typescript
variableName: type
```

For example:

```typescript
let city: string = "Mumbai";
```

---

## 2. Type Inference

You do not always need to explicitly write a type.

```typescript
let username = "Rahul";
```

TypeScript automatically infers:

```typescript
username: string
```

This will therefore fail:

```typescript
username = 100;
```

With an error similar to:

```text
Type 'number' is not assignable to type 'string'.
```

This behavior is called **type inference**.

In normal code, prefer:

```typescript
let username = "Rahul";
```

instead of writing an obvious type unnecessarily:

```typescript
let username: string = "Rahul";
```

---

## 3. `const` vs `let`

Use `const` when a variable will not be reassigned.

```typescript
const name = "John";
```

Use `let` when the value needs to change.

```typescript
let age = 25;

age = 26;
```

This is invalid:

```typescript
const age = 25;

age = 30;
```

A good rule is:

```text
Use const by default.
Use let when the value needs to change.
```

---

## 4. Arrays

An array of strings:

```typescript
const fruits: string[] = [
    "apple",
    "banana",
    "orange"
];
```

An array of numbers:

```typescript
const numbers: number[] = [
    10,
    20,
    30
];
```

This works:

```typescript
numbers.push(40);
```

This does not:

```typescript
numbers.push("hello");
```

Another valid syntax is:

```typescript
const numbers: Array<number> = [1, 2, 3];
```

Both approaches are equivalent.

For most cases, this style is easier to read:

```typescript
number[]
string[]
```

---

## 5. Objects

Consider this object:

```typescript
const user = {
    name: "Rahul",
    age: 30
};
```

You can explicitly describe its structure:

```typescript
const user: {
    name: string;
    age: number;
} = {
    name: "Rahul",
    age: 30
};
```

This is invalid:

```typescript
user.age = "thirty";
```

because `age` must be a number.

---

## 6. Functions

JavaScript example:

```javascript
function add(a, b) {
    return a + b;
}
```

Someone could accidentally call:

```javascript
add("10", "20");
```

and receive:

```text
1020
```

instead of:

```text
30
```

TypeScript lets us define parameter and return types:

```typescript
function add(a: number, b: number): number {
    return a + b;
}
```

This works:

```typescript
add(10, 20);
```

This does not:

```typescript
add("10", "20");
```

---

## 7. Functions Returning Nothing

Use `void` when a function is not expected to return a useful value.

```typescript
function logMessage(message: string): void {
    console.log(message);
}
```

Another example:

```typescript
function greet(name: string): void {
    console.log(`Hello ${name}`);
}
```

---

## 8. Optional Parameters

Use `?` when a parameter is optional.

```typescript
function greet(name: string, age?: number) {
    console.log(name);

    if (age) {
        console.log(age);
    }
}
```

Both calls are valid:

```typescript
greet("Rahul");

greet("Rahul", 30);
```

You can think of:

```typescript
age?: number
```

as approximately:

```typescript
number | undefined
```

---

## 9. Default Parameters

You can give function parameters default values.

```typescript
function greet(
    name: string,
    country: string = "India"
) {
    console.log(`${name} from ${country}`);
}
```

Calling:

```typescript
greet("Rahul");
```

prints:

```text
Rahul from India
```

Calling:

```typescript
greet("John", "USA");
```

prints:

```text
John from USA
```

---

## 10. The `any` Type

`any` disables much of TypeScript's type checking.

```typescript
let value: any = 10;

value = "hello";
value = true;
value = {};
```

Using `any` can remove many of the safety benefits TypeScript provides.

Avoid it when possible.

Example to avoid:

```typescript
function printUser(user: any) {
    console.log(user.name);
}
```

Later, this can be improved with an interface:

```typescript
interface User {
    name: string;
}
```

---

## 11. Union Types

A union allows multiple possible types.

```typescript
let id: string | number;
```

Both are valid:

```typescript
id = 100;

id = "user-100";
```

This is invalid:

```typescript
id = true;
```

Read:

```typescript
string | number
```

as:

```text
string OR number
```

Function example:

```typescript
function printId(id: string | number) {
    console.log(id);
}
```

Valid calls:

```typescript
printId(123);

printId("abc123");
```

Invalid call:

```typescript
printId(true);
```

---

## 12. Type Narrowing

Consider:

```typescript
function printId(id: string | number) {
    console.log(id.toUpperCase());
}
```

TypeScript reports an error because `number` does not have a `toUpperCase()` method.

We can first check the value's type:

```typescript
function printId(id: string | number) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id);
    }
}
```

Inside:

```typescript
if (typeof id === "string")
```

TypeScript knows `id` is a string.

Inside the `else` block, TypeScript knows `id` is a number.

This is called **type narrowing**.

---

## 13. Type Aliases

Instead of repeating an object structure:

```typescript
const user: {
    name: string;
    age: number;
} = {
    name: "Rahul",
    age: 30
};
```

Create a reusable type:

```typescript
type User = {
    name: string;
    age: number;
};
```

Then use it:

```typescript
const user: User = {
    name: "Rahul",
    age: 30
};
```

You can reuse it:

```typescript
const user2: User = {
    name: "John",
    age: 25
};
```

---

# Exercises

## Exercise 1 — Product Type

Create a `Product` type containing:

```text
name
price
inStock
```

Use these types:

```text
name    → string
price   → number
inStock → boolean
```

Then create this product:

```text
MacBook
120000
true
```

Starter code:

```typescript
type Product = {
    // your code
};

const product: Product = {
    // your code
};
```

---

## Exercise 2 — Calculate Total

Create a function:

```typescript
calculateTotal(price, quantity)
```

Requirements:

- `price` must be a number.
- `quantity` must be a number.
- The function must return a number.

Example:

```typescript
calculateTotal(100, 3);
```

Expected result:

```text
300
```

---

## Exercise 3 — Print User ID

Create:

```typescript
function printUserId(id)
```

The `id` can be either:

```text
string
number
```

If the ID is a string, print it in uppercase.

Example:

```typescript
printUserId("abc");
```

Output:

```text
ABC
```

For:

```typescript
printUserId(123);
```

Output:

```text
123
```

---

# Next Lesson

After completing these exercises, continue with:

- Interfaces
- Tuples
- Enums
- Literal types
- `unknown`
- `never`
- Better object modeling

---

## Recommended Practice

Create a TypeScript file for each lesson:

```text
typescript-learning/
├── lesson-01-basics.ts
├── lesson-02-interfaces.ts
├── lesson-03-functions.ts
├── exercises/
│   ├── exercise-01.ts
│   ├── exercise-02.ts
│   └── exercise-03.ts
└── README.md
```

Compile TypeScript with:

```bash
npx tsc filename.ts
```

Then run the generated JavaScript:

```bash
node filename.js
```

Happy learning! 🚀
