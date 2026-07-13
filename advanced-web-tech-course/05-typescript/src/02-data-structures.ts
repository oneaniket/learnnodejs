// 02-data-structures.ts  (Practical 8: data structures)
// Run:  npx ts-node src/02-data-structures.ts
//
// Goal: typed arrays, tuples, records, Map, Set, and generics.

// ---------- Arrays ----------
const nums: number[] = [5, 2, 9, 1];
const sorted = [...nums].sort((a, b) => a - b); // typed as number[]
console.log("sorted:", sorted);

// ---------- Tuple: fixed length, fixed types per position ----------
const person: [string, number] = ["Ada", 36];
console.log(`name=${person[0]}, age=${person[1]}`);

// ---------- Record: an object used as a lookup table ----------
const prices: Record<string, number> = { apple: 30, banana: 10, cherry: 50 };
console.log("banana price:", prices["banana"]);

// ---------- Map: keyed collection (keys can be any type) ----------
const scores = new Map<string, number>();
scores.set("Ada", 95);
scores.set("Grace", 88);
console.log("Ada's score:", scores.get("Ada"));
console.log("all scores:", [...scores.entries()]);

// ---------- Set: stores only UNIQUE values ----------
const tags = new Set<string>(["ts", "node", "ts", "react"]);
console.log("unique tags:", [...tags]); // "ts" appears once

// ---------- Generics: reusable, type-safe functions ----------
// <T> is a stand-in for whatever type the caller supplies.
function first<T>(items: T[]): T | undefined {
  return items[0];
}
console.log("first number:", first<number>([10, 20, 30]));
console.log("first word:", first<string>(["a", "b", "c"]));

// A generic container class.
class Box<T> {
  constructor(private value: T) {}
  get(): T {
    return this.value;
  }
}
const numberBox = new Box<number>(42);
const stringBox = new Box<string>("hello");
console.log("boxes:", numberBox.get(), stringBox.get());

// ---------- Array methods stay fully typed ----------
interface Product {
  name: string;
  price: number;
}
const cart: Product[] = [
  { name: "Book", price: 30 },
  { name: "Pen", price: 5 },
];
// TypeScript knows `p` is a Product, so `p.price` is checked.
const total = cart.reduce((sum, p) => sum + p.price, 0);
console.log("cart total:", total);
