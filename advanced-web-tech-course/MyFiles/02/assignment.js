const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://root:hutaoftw@127.0.0.1:27017/Users?authSource=admin")

const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use("/", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
