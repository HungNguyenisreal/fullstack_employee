
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const employeeRoutes = require('./routes/employee');
const projectRoutes = require('./routes/project');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

const app = express();

mongoose.connect(config.DATABASE_CONNECT_URL, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());
app.use(authJwt());
app.use(errorHandler);


app.use(`${config.API}/accounts`, employeeRoutes);
app.use(`${config.API}/projects`, projectRoutes);

app.listen(config.PORT, err => {
    console.log('Ki dieu than ki xay ra o cong: ' + config.PORT);
})
