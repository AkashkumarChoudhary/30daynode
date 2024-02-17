const express = require('express');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache();

// Middleware function to cache responses
const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl; // Using request URL as the cache key

    // Check if the response is cached
    const cachedResponse = cache.get(key);
    if (cachedResponse) {
        console.log('Cache hit for', key);
        return res.send(cachedResponse);
    }

    // If response not cached, store the original res.send function
    const originalSend = res.send;
    res.send = (body) => {
        // Cache the response body
        cache.set(key, body);

        // Continue with the original res.send function
        originalSend.call(res, body);
    };

    // Move to the next middleware
    next();
};

// Example route using caching middleware
app.get('/api/data', cacheMiddleware, (req, res) => {
    // Simulated data fetching
    const data = {
        message: 'This is cached data',
        timestamp: new Date().toISOString()
    };
    res.json(data);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
