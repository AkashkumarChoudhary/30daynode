// Import necessary modules
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch(err => {
    console.error("Connection error:", err);
  });

// Define user schema with validation
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Basic email validation regex
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  }
});

// Create a Mongoose model
const User = mongoose.model('User', userSchema);

// Function to add a new user with validation
async function addUserWithValidation(user) {
  try {
    // Create a new user instance
    const newUser = new User(user);

    // Save the user to the database
    await newUser.save();
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error.message);
  }
}

// Test case
addUserWithValidation({ username: 'john_doe', email: 'akcranchi13579@gmail.com' });
