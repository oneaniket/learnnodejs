const express = require("express");
const app = express();

app.use(express.json());


app.get("/users/:id", (req, res) => {
  res.json({
    id: req.params.id,
  });
});

app.get("/users/:userId/orders/:orderId", (req, res) => {
  res.json({
    userId: req.params.userId,
    orderId: req.params.orderId,
  });
});

app.get("/users", (req, res) => {
  res.json({
    role: req.query.role,
    page: req.query.page,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
