const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../utils/swagger_output.json");
const ServiceKey = require("../middleware/ServiceKey");
const api = require("./api");
module.exports = function route(app) {
    app.use("/api/user-service/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
    app.use("/api/user-service/v1", api);
};
