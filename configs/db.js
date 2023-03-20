const { Sequelize } = require("sequelize");
const { DB_NAME, DB_USER, DB_PASSWORD, HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: HOST,
    dialect: "mysql",
    dialectModule: require("mysql2"),
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Connection has been established successfully!");
    } catch (error) {
        console.log("\x1b[31m%s\x1b[0m", "Failed to connect to database!");
        console.log("🚀 ~ file: db.js:16 ~ connect ~ error:", error);
    }
};
exports.connect = connect;
exports.sequelize = sequelize;
