
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Read all users
app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync('users.json'));
    res.json(users);
});

// Add new user
app.post('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync('users.json'));
    const newUser = { id: Date.now(), ...req.body };
    users.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.json(newUser);
});

// Update user
app.put('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync('users.json'));
    const userIndex = users.findIndex(u => u.id == req.params.id);
    if (userIndex === -1) return res.status(404).send("User not found");
    users[userIndex] = { id: users[userIndex].id, ...req.body };
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.json(users[userIndex]);
});

// Delete user
app.delete('/users/:id', (req, res) => {
    let users = JSON.parse(fs.readFileSync('users.json'));
    users = users.filter(u => u.id != req.params.id);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.send("User deleted successfully");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));