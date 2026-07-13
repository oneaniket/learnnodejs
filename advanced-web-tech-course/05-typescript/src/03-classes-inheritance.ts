// 03-classes-inheritance.ts  (Practical 9: classes & inheritance)
// Run:  npx ts-node src/03-classes-inheritance.ts
//
// Goal: classes, access modifiers, inheritance, super, method overriding,
// abstract classes, and interfaces with `implements`.

// ---------- A base class ----------
// Access modifiers:
//   public    (default) — accessible anywhere
//   protected — accessible in this class AND subclasses
//   private   — accessible ONLY in this class
//   readonly  — cannot be reassigned after construction
class Animal {
  // Declaring params with a modifier in the constructor auto-creates the field.
  constructor(protected name: string, readonly legs: number) {}

  // A method every animal has; subclasses may override it.
  describe(): string {
    return `${this.name} has ${this.legs} legs`;
  }

  makeSound(): string {
    return `${this.name} makes a sound`;
  }
}

// ---------- Inheritance with `extends` ----------
class Dog extends Animal {
  constructor(name: string) {
    // `super(...)` calls the parent (Animal) constructor. Required first.
    super(name, 4);
  }

  // OVERRIDE the parent method (polymorphism).
  makeSound(): string {
    return `${this.name} barks: Woof!`;
  }
}

class Bird extends Animal {
  constructor(name: string) {
    super(name, 2);
  }
  makeSound(): string {
    return `${this.name} chirps: Tweet!`;
  }
  // A method unique to Bird.
  fly(): string {
    return `${this.name} flies away`;
  }
}

const dog = new Dog("Rex");
const bird = new Bird("Robin");
console.log(dog.describe()); // inherited from Animal
console.log(dog.makeSound()); // overridden in Dog
console.log(bird.makeSound()); // overridden in Bird
console.log(bird.fly()); // Bird-only method

// Polymorphism: treat different subclasses through the base type.
const zoo: Animal[] = [dog, bird, new Animal("Mystery", 6)];
console.log("\nZoo sounds:");
for (const a of zoo) {
  // The RIGHT makeSound() runs for each actual object type.
  console.log(" -", a.makeSound());
}

// ---------- Abstract classes ----------
// An abstract class cannot be instantiated directly. It forces subclasses to
// implement the abstract method(s).
abstract class Shape {
  abstract area(): number; // no body — each shape must define it

  // A concrete method shared by all shapes.
  describe(): string {
    return `This shape has area ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(private w: number, private h: number) {
    super();
  }
  area(): number {
    return this.w * this.h;
  }
}

console.log("\nShapes:");
console.log(" -", new Circle(2).describe());
console.log(" -", new Rectangle(3, 4).describe());
// const bad = new Shape(); // ERROR: cannot create an instance of an abstract class

// ---------- Interfaces + `implements` ----------
// An interface is a contract: a class that `implements` it MUST provide
// everything the interface declares.
interface Drivable {
  speed: number;
  drive(): string;
}

class Car implements Drivable {
  speed = 0;
  drive(): string {
    this.speed = 60;
    return `Driving at ${this.speed} km/h`;
  }
}
console.log("\n" + new Car().drive());
