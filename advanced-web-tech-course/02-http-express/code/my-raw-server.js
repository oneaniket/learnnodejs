// Import Express
const express = require('express');
const app = express();
app.use(express.json());

// Define the port
const PORT = 3000;

// Define a route for GET requests to "/"
app.get('/', (req, res) => {
    res.status(200).set('Content-Type', 'text/plain');
    res.send('Hello World from Urmil');
    // res.end(body) sends the body and finishes the response.
});

app.get("/users/:id", (req, res) => {
    res.json({
        id: req.params.id,
    });
});

app.get("/userQuery", (req,res) => {
    res.json(req.query)
});

app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: "aniket" }, 
        { id: 2, name: "urmil" }
    ])
});

app.post("/user", (req, res) => {
    const newUser = req.body;

    res.status(201).json({
        message: "User created",
        user: newUser,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});