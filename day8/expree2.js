/const express = require('express');
const app = express();

// Error handling middleware
function errorHandler(err, req, res, next) {
  if (err.message === 'Invalid positive integer') {
    return res.status(400).json({ error: 'Parameter must be a positive integer' });
  }
  next(err);
}

// Middleware to check if the parameter is a positive integer
function checkPositiveInteger(req, res, next) {
  const number = parseInt(req.query.number);
  if (Number.isNaN(number) || number <= 0 || !Number.isInteger(number)) {
    const err = new Error('Invalid positive integer');
    return next(err);
  }
  next();
}

// Express route to handle requests with a positive integer parameter
app.get('/positive', checkPositiveInteger, (req, res) => {
  const number = parseInt(req.query.number);
  res.json({ message: `${number} is a positive integer` });
});

// Using the error handling middleware
app.use(errorHandler);

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
