// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection string
const mongoURI = 'mongodb://localhost/mydatabase'; // Replace 'mydatabase' with your actual database name

// Function to establish MongoDB connection
function connectToMongoDB() {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    // Event handling for connection errors
    db.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });

    // Event handling for successful connection
    db.once('open', () => {
        console.log('Connected to MongoDB successfully');
    });
}

// Call connectToMongoDB function to establish connection
connectToMongoDB();

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
