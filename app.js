const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
const connectDB = require('./config/db');
dotenv.config({path: './config/config.env'})

connectDB();

app.use('/', require('./routes/index'));

app.listen(3000);



