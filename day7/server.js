const express = require('express');
const requestLoggerMiddleware = require('./requestLoggerMiddleware');

const app = express();

// Use the request logger middleware
app.use(requestLoggerMiddleware);

// Define your routes and other middleware
// ...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
