const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Serve index.html when visiting the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Set the port to listen on
const port = process.env.PORT || 3000;
app.listen(3000, '0.0.0.0', () => {
    console.log("Server running at http://0.0.0.0:3000");
});
