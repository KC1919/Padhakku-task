const express = require('express');
const app = express();
const PORT = 3000;

const router = require('./routes/routes');


const cookieParser = require('cookie-parser');

require('dotenv').config();

const connectDb = require('./config/db');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(cookieParser());


app.use('/api', router);


app.listen(PORT, (err) => {
    console.log('Server listening on port: ' + PORT);
    connectDb();
})

