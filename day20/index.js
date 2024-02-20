 const express = require('express');
const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

 const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

 const User = mongoose.model('User', userSchema);

 const app = express();

 app.get('/average-age', async (req, res) => {
    try {
         const result = await User.aggregate([
            {
                $group: {
                    _id: null,
                    averageAge: { $avg: "$age" }
                }
            }
        ]);

        // Extract average age from the result
        const averageAge = result[0].averageAge;

        // Return JSON response with average age
        res.json({ averageAge });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
