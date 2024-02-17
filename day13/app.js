// app.js

const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve HTML page with JavaScript to establish WebSocket connection
app.get('/websocket', (req, res) => {
    res.sendFile(__dirname + '/websocket.html');
});

// WebSocket server logic
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Echo back messages
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send(message); // Echo back the message
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
