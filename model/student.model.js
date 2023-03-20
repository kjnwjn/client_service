const { sequelize } = require("../configs/db");
const { DataTypes } = require("sequelize");

const Student = sequelize.define(
    "students",
    {
        id_student: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        username: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        gender: { type: DataTypes.BOOLEAN, allowNull: true },
        fullName: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: true },
        phoneNumber: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        id_class: { type: DataTypes.STRING, allowNull: false },
        id_faculty: { type: DataTypes.STRING, allowNull: false },
        course_year: { type: DataTypes.NUMBER, allowNull: false },
        access_token: { type: DataTypes.STRING, allowNull: true },
        refresh_token: { type: DataTypes.STRING, allowNull: true },
    },
    { underscored: true }
);

module.exports = {
    findById: async function (id, callback) {
        try {
            const student = await Student.findByPk(id);
            callback(null, student);
        } catch (error) {
            callback(error, null);
        }
    },
};
