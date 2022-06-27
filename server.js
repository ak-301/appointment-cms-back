const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
    
app.use(cors(corsOptions))

app.use(express.json());

const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database!");  
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Server up and running!"});
});
require('./routes/order.routes.js')(app);
// listen for requests
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});