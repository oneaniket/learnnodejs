// demo.js
// Setup: cd 03-mongodb-models && npm install && cp .env.example .env
//        (edit .env with your MongoDB connection string)
// Run:   node code/demo.js
//
// Goal: prove the models work — connect, create documents, watch validation
// reject a bad one, use referencing (.populate) and embedding.

require("dotenv").config(); // loads MONGODB_URI from the .env file
const mongoose = require("mongoose");
const { User, Post, Order } = require("./models");

async function main() {
  // 1) CONNECT to MongoDB using the URI from .env.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB\n");

  // Start clean so the demo can be run repeatedly.
  await User.deleteMany({});
  await Post.deleteMany({});
  await Order.deleteMany({});

  // 2) CREATE a valid user. The model validates before saving.
  const ada = await User.create({
    name: "Ada Lovelace",
    email: "ADA@example.com", // will be lowercased by the schema
    age: 36,
    // role omitted -> defaults to "student"
  });
  console.log("Created user:", ada.name, "| role:", ada.role, "| email:", ada.email);

  // 3) VALIDATION in action: this document breaks the rules (age > 120,
  //    missing name). Mongoose throws instead of saving garbage.
  try {
    await User.create({ email: "bad@example.com", age: 999 });
  } catch (err) {
    console.log("Validation correctly rejected bad user:");
    // err.errors holds one entry per failed field
    for (const field in err.errors) {
      console.log("   -", field + ":", err.errors[field].message);
    }
  }

  // 4) REFERENCING: a post points to Ada by her _id.
  const post = await Post.create({
    title: "Notes on the Analytical Engine",
    body: "The engine can do more than calculate...",
    author: ada._id, // store the reference
  });

  // .populate() swaps the stored _id for the full User document.
  const populated = await Post.findById(post._id).populate("author");
  console.log("\nPost:", populated.title);
  console.log("  written by (populated):", populated.author.name);

  // 5) EMBEDDING: an order with its items embedded inside it.
  const order = await Order.create({
    customer: "Grace Hopper",
    items: [
      { product: "Compiler book", quantity: 2, price: 30 },
      { product: "COBOL manual", price: 45 }, // quantity defaults to 1
    ],
  });
  console.log("\nOrder for", order.customer);
  console.log("  items:", order.items.length, "| computed total:", order.total);

  // 6) Done — close the connection so the program exits.
  await mongoose.disconnect();
  console.log("\nDisconnected. Demo complete.");
}

// Run and surface any unexpected error.
main().catch((err) => {
  console.error("Demo failed:", err.message);
  process.exit(1);
});
