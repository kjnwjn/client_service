require("dotenv").config();
// connect db
var { connect } = require("./configs/db");

// define cors 
var cors = require("cors");
const corsOptions = { origin: "*", optionsSuccessStatus: 200 };
const { body, validationResult } = require('express-validator');


var createError = require("http-errors");
var express = require('express');
var app = express();
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const swaggerAutogen = require('swagger-autogen')
const doc = {
    info: {
        title: "Account for stdpotal service",
        description: "Description",
    },
    host: `localhost:${process.env.PORT}/api/v1`,
    schemes: ["http"],
};


// require swagger autogen 
const outputFile = "./utils/swagger_output.json";
const endpointsFiles = ["./routes/api.js"];
swaggerAutogen(outputFile, endpointsFiles, doc)

// response function
var { responseJson } = require("./utils/response");


// connect db
connect();

// use cors options 
app.use(cors(corsOptions));

// define route
var defineRoute = require("./routes/index");
defineRoute(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    return responseJson({
        status: false,
        statusCode: err.status || 500,
        msg: { en: err.message, vn: err.message },
        data: {},
        res,
    });
});



module.exports = app;
