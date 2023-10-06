const express = require('express');
const app = express();
const PORT = 3000;

//importing the requests routes
const router = require('./routes/routes');

require('dotenv').config();

const connectDb = require('./config/db');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// importing the router for routing the requests to respective route
app.use('/api', router);


//Starting the server, server listenign for incoming requests
app.listen(PORT, (err) => {
    console.log('Server listening on port: ' + PORT);
    connectDb();
})