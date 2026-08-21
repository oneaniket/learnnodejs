class Animal {
    constructor(protected name: string, readonly legs: number) { }

    describe(): string {
        return `${this.name} has ${this.legs} legs`;
    }

    makeSound(): string {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name, 4);
    }

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
    fly(): string {
        return `${this.name} flies away`;
    }
}

class Fish extends Animal {
    constructor(name: string) {
        super(name, 0)
    }

    makeSound(): string {
        return `${this.name} splish splashes`;
    }
    swim(): string {
        return `${this.name} swims`;
    }
}


const dog = new Dog("Rex");
const bird = new Bird("Robin");

const fish = new Fish("Great White");

// console.log(dog.describe());
// console.log(dog.makeSound());
// console.log(bird.makeSound());
// console.log(bird.fly());

console.log(fish.swim());
console.log(fish.makeSound());



// const zoo: Animal[] = [dog, bird, new Animal("Mystery", 6)];
// console.log("\nZoo sounds:");
// for (const a of zoo) {
//     console.log(" -", a.makeSound());
// }

// abstract class Shape {
//     abstract area(): number;

//     describe(): string {
//         return `This shape has area ${this.area().toFixed(2)}`;
//     }
// }

// class Circle extends Shape {
//     constructor(private radius: number) {
//         super();
//     }
//     area(): number {
//         return Math.PI * this.radius ** 2;
//     }
// }

// class Rectangle extends Shape {
//     constructor(private w: number, private h: number) {
//         super();
//     }
//     area(): number {
//         return this.w * this.h;
//     }
// }

// console.log("\nShapes:");
// console.log(" -", new Circle(2).describe());
// console.log(" -", new Rectangle(3, 4).describe());

// interface Drivable {
//     speed: number;
//     drive(): string;
// }

// class Car implements Drivable {
//     speed = 0;
//     drive(): string {
//         this.speed = 60;
//         return `Driving at ${this.speed} km/h`;
//     }
// }
// console.log("\n" + new Car().drive());
