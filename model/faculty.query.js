const { sequelize } = require("../configs/db");
const { DataTypes } = require("sequelize");

const { Student, Class, Faculty } = require("./defineModel");
module.exports = {
    findById: async function (id, callback = null) {
        try {
            const facultyElement = await Faculty.findByPk(id);
            if (!callback) return facultyElement;
            if (facultyElement) {
                return callback(null, facultyElement);
            } else {
                return callback(new Error(`faculty ${id} doesn't exits`), null);
            }
        } catch (error) {
            callback(error, null);
        }
    },
};
