const { sequelize } = require("../configs/db");
const { DataTypes } = require("sequelize");

const Class = sequelize.define(
    "Classes",
    {
        // Model attributes are defined here
        id_class: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        id_faculty: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
        created_at: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
        updated_at: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        underscored: true,
    }
);

exports.classModel = Class;
