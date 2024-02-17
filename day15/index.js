const express = require('express');
const app = express();
const port = 3000;

// Middleware function to log request details
app.use((req, res, next) => {
    // Capture timestamp
    const timestamp = new Date().toISOString();
    // Log request details
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next(); // Call next middleware
});

// Example route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
