// db.js  —  the database connection helper.
// Kept separate so both the server and any tests can reuse it.

const mongoose = require("mongoose");

// Connect to MongoDB using the URI from the environment.
async function connectDB(uri) {
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}

module.exports = { connectDB };
