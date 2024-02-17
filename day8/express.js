const express = require('express');
const app = express();
const PORT = 3000;
 
app.use(express.json());
 
app.use(function(err, req, res, next) {
  if (err instanceof PositiveIntegerError) {
    res.status(400).json({ error: 'Parameter must be a positive integer' });
  } else {
    next(err);
  }
});
 
class PositiveIntegerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PositiveIntegerError';
  }
}
 
function positiveIntegerHandler(req, res, next) {
  const { number } = req.query;

 
  if (!/^\d+$/.test(number) || parseInt(number) <= 0) {
    const error = new PositiveIntegerError('Parameter must be a positive integer');
    return next(error);
  }

 
  res.json({ message: 'Success! Provided number is a positive integer.' });
}

// Route definition
app.get('/positive', positiveIntegerHandler);

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
