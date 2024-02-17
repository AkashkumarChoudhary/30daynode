const jwt = require('jsonwebtoken');

/**
  
 * @param {Object} req 
   @param {Object} res 
   @param {Function} next 
 */
function authenticationMiddleware(req, res, next) {
   const token = req.headers['authorization'];

   if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
     const decoded = jwt.verify(token, 'your_secret_key'); // Change 'your_secret_key' with your actual secret key

     req.user = decoded;

     next();
  } catch (error) {
     return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

module.exports = authenticationMiddleware;
