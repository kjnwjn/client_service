const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");
const RouteInitializer = require("./routes/index");
const cookieParser = require("cookie-parser");
const jsonResponse = require("./utils/jsonResponse");
const { connect: databaseInitializer } = require("./configs/db");
const corsOptions = { origin: "*", optionsSuccessStatus: 200 };

app.use(logger("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const swaggerAutogen = require("swagger-autogen");
const doc = {
    info: { title: "Account for std-portal service", description: "Description" },
    host: `localhost:${process.env.PORT}/api/v1`,
    schemes: ["http"],
};

const outputFile = "./utils/swagger_output.json";
const endpointsFiles = ["./routes/api.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);

databaseInitializer();
RouteInitializer(app);

app.use(function (req, res, next) {
    return next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    return jsonResponse({ req, res })
        .status(err.status || 500)
        .json({ message: err.message || "Internal Server Error", errors: err });
});

module.exports = app;
