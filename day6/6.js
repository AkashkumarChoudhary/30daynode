const express = require('express');
const app = express();

app.get ('/greet' , (req , res ) => {
    const name = req.query.name;
    if(name){
        res.send(`Hello, ${name}!`);
    }else {
        res.send('Hello,Guest!');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});