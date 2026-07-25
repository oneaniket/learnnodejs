// Import Express
const express = require('express');
const app = express();

// Define the port
const PORT = 3000;

// Define a route for GET requests to "/"
app.get('/', (req, res) => {
    res.status(200).set('Content-Type', 'text/plain');
    res.send('Hello World from Urmil');
    // res.end(body) sends the body and finishes the response.
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});