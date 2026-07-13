// models.js
// The data models (schemas) for this module. Imported by demo.js.
//
// A SCHEMA describes the shape + rules of a document.
// A MODEL is the tool built from a schema that talks to a collection.

const mongoose = require("mongoose");

// -------------------- USER MODEL --------------------
// Demonstrates: field types, `required`, `unique`, range/enum validation,
// defaults, and an automatic timestamp.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // document is rejected if name is missing
    trim: true, // removes leading/trailing spaces automatically
  },
  email: {
    type: String,
    required: true,
    unique: true, // no two users may share an email
    lowercase: true, // stored in lowercase
  },
  age: {
    type: Number,
    min: 0, // validation: cannot be negative
    max: 120, // validation: upper bound
  },
  role: {
    type: String,
    enum: ["student", "admin"], // only these two values are allowed
    default: "student", // used when none is provided
  },
  createdAt: {
    type: Date,
    default: Date.now, // set automatically at creation time
  },
});

// -------------------- POST MODEL (REFERENCING) --------------------
// A post REFERENCES its author by storing the author's ObjectId.
// Use referencing when the related data is large or shared.
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, default: "" },
  author: {
    type: mongoose.Schema.Types.ObjectId, // stores a User's _id
    ref: "User", // tells Mongoose which model to .populate() from
    required: true,
  },
});

// -------------------- ORDER MODEL (EMBEDDING) --------------------
// An order EMBEDS its line items directly. Use embedding when the sub-data
// is small and always read together with the parent.
const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  items: [
    // an array of embedded sub-documents (no separate collection)
    {
      product: { type: String, required: true },
      quantity: { type: Number, default: 1, min: 1 },
      price: { type: Number, required: true, min: 0 },
    },
  ],
});

// A VIRTUAL field: computed, not stored. Here: the order total.
orderSchema.virtual("total").get(function () {
  return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
});

// Build the models from the schemas and export them.
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = { User, Post, Order };
