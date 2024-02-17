/**
   @param {Object} req  
  @param {Object} res  
 @param {Function} next  
 */
function rateLimitMiddleware(req, res, next) {
     const limit = 5;  
    const windowMs = 60000;  
    const ipAddress = req.ip;
  
     if (!ipAddresses[ipAddress]) {
      ipAddresses[ipAddress] = [];
    }
  
    const now = Date.now();
  
     ipAddresses[ipAddress] = ipAddresses[ipAddress].filter(timestamp => {
      return timestamp > now - windowMs;
    });
  
     if (ipAddresses[ipAddress].length < limit) {
       ipAddresses[ipAddress].push(now);
      next();  
    } else {
       res.status(429).send('Too Many Requests');
    }
  }
  
  // Store IP addresses and their request timestamps
  const ipAddresses = {};
  
  // Example usage:
  // Assume app is your Express application instance
  app.use(rateLimitMiddleware);
  
  // Define your routes and other middleware below this line
  