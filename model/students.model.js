const { sequelize } = require("../configs/db");
const { DataTypes } = require("sequelize");

const Student = sequelize.define(
    "students",
    {
        // Model attributes are defined here
        id_student: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
        gender: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            // allowNull defaults to true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            // allowNull defaults to true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            // allowNull defaults to true
        },
        id_class: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_faculty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course_year: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        underscored: true,
    }
);

exports.studentModel = Student;
