const ip = require("ip");

module.exports = {
    SALT: 2023,
    PORT: process.env.PORT || 3000,
    BASE_URL: `http://${ip.address()}:${process.env.PORT || 3000}`,
    SERVICE_KEY: ["wGlWnNDcrU0K4zOF8ywGl", "iCkXIeYOYsIOrGGla92Sr", "OHQeb6rmvXlGyfGWsTLT", "EPg4NcR5ab9HF4QhHb7F", "WnNDcrU0okPhTVA27BLe3IJ8y"],
};
