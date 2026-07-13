# Module 5 — Practice

Setup: `cd 05-typescript && npm install`. Type-check with `npx tsc --noEmit`.
Run a file with `npx ts-node src/<file>.ts`.

## Functions & types (P8)

1. Write a typed function `average(nums: number[]): number` that returns the
   mean. What does it return for an empty array — and how would you make the
   return type honest about that (hint: `number | undefined`)?

2. Define an `interface Book { title: string; author: string; year?: number }`.
   Write a function that takes a `Book[]` and returns the titles as a
   `string[]`.

3. Make the compiler catch a bug: write `const n: number = someFunction()` where
   `someFunction` returns a `string`. Paste the error message `tsc` gives.

## Data structures (P8)

4. Use a `Map<string, number>` to count how many times each word appears in the
   sentence `"the cat sat on the mat the cat"`. Print the map.

5. Use a `Set` to remove duplicates from `[1, 2, 2, 3, 3, 3, 4]` and print the
   result as a sorted array.

6. Write a generic function `last<T>(items: T[]): T | undefined` that returns
   the last element. Test it with numbers and strings.

## Classes & inheritance (P9)

7. Create a base class `Employee` with `name` and `baseSalary`, and a method
   `monthlySalary()`. Create a subclass `Manager` that adds a `bonus` and
   **overrides** `monthlySalary()` to include the bonus. Instantiate both.

8. Add an `abstract class Payment` with an abstract method `process(amount)`.
   Create `CardPayment` and `CashPayment` subclasses that implement it
   differently.

9. Define an `interface Comparable<T>` with a method `compareTo(other: T):
   number`. Make a `Version` class implement it so versions can be compared.

## Concept (short answer)

10. Give two concrete bugs that TypeScript catches at compile time that plain
    JavaScript would only reveal at runtime.

11. Explain the difference between `private`, `protected`, and `readonly`.
