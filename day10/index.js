const express = require('express');
const path = require('path');

const app = express();

// Define the directory for serving static files
app.use(express.static( 'public'));

function staticFileServer(req,res){
    res.sendFile(path.resolve('./test-files/index.html'));
} 

app.get('/', staticFileServer );

// Start the server
 app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
