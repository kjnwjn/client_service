const ip = require("ip");

module.exports = {
    SALT: 2023,
    PORT: process.env.PORT || 3000,
    BASE_URL: `http://${ip.address()}:${process.env.PORT || 3000}`,
    SERVICE_KEY: ["wGlWnNDcrU0K4zOF8ywGl", "iCkXIeYOYsIOrGGla92Sr", "OHQeb6rmvXlGyfGWsTLT", "EPg4NcR5ab9HF4QhHb7F", "WnNDcrU0okPhTVA27BLe3IJ8y"],
    EXCHANGE_TYPE: {
        FANOUT: "fanout",
        DIRECT: "direct",
        TOPIC: "topic",
        HEADERS: "headers",
        MATCH: "match",
    },
    EXCHANGE_NAME: {
        DIRECT_GET_CLIENT_DATA: "getClientData",
        FAN_OUT_CREATE_CLIENT_DATA: "createClientData",
        FAN_OUT_SHOW_CLIENT_DATA: "showClientData",
    },
    QUEUE: {
        getStudentData: "getStudentData",
        createStudentData: "createStudentData",
        showStudentData: "showStudentData",
    },
};
