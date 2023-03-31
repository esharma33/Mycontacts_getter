//console.log("Radhe Radhe!");
const express = require('express');
const connectDb = require('./config/dbConnections');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // to read the bosy of the request made.
app.use('/api/contacts', require( "./routes/contactroutes"));
app.use('/api/users', require( "./routes/userroutes"));

app.use(errorHandler);

//    // res.send("Get all contacts") // for normal request sending message
//    //for json
//   // res.json({message: "Get all contacts"});
// //for json along with status code
// res.status(200).json({message: "Get all contacts"});


app.listen(port,()=>{

    console.log(`Server running on port ${port}`);
});