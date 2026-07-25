const express = require('express');
const app = express();
app.use(express.json());

// Define the port
const PORT = 3000;
const users = [];

app.post('/users', (req, res) => {
    try {
        const { name, email } = req.body;

        // Basic validation
        if (typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: 'Name is required and must be a string.' });
        }
        if (typeof email !== 'string' || email.trim() === '') {
            return res.status(400).json({ error: 'Email is required and must be a string.' });
        }

        // Create user object
        const newUser = {
            id: users.length + 1,
            name: name.trim(),
            email: email.trim()
        };

        // Store in local array
        users.push(newUser);

        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/users', (req, res) => {
    res.json(users);
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});