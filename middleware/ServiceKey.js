const jsonResponse = require("../utils/jsonResponse");
const { SERVICE_KEY } = require("../configs/variables");

module.exports = function (req, res, next) {
    const apiKey = req.query.api_key;
    if (!apiKey) return jsonResponse({ req, res }).status(401).json({ message: "API key must be provided." });
    if (SERVICE_KEY.includes(apiKey)) return next();
    return jsonResponse({ req, res }).status(401).json({ message: "Invalid API key." });
};
