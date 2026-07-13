// server.js  —  the entry point. Connects to the DB, then starts the server.

require("dotenv").config(); // load MONGODB_URI and PORT from .env
const app = require("./src/app");
const { connectDB } = require("./src/db");

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // 1) Connect to MongoDB first. If this fails, we do not start the server.
    await connectDB(process.env.MONGODB_URI);

    // 2) Start listening for HTTP requests.
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start:", err.message);
    process.exit(1);
  }
}

start();
