 const express = require('express');
const mongoose = require('mongoose');

 const app = express();

 const userSchema = new mongoose.Schema({
    name: String,
    email: String,
 });

const User = mongoose.model('User', userSchema);

 mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

 app.get('/users', async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();

        // Send JSON response with the array of user objects
        res.json(users);
    } catch (error) {
        // Handle errors
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start Express server and listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
