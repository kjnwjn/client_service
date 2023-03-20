const { sequelize } = require("../configs/db");
const { DataTypes } = require("sequelize");

const Class = sequelize.define(
    "classes",
    {
        id_class: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        id_faculty: { type: DataTypes.STRING, allowNull: false },
        created_at: { type: DataTypes.STRING, allowNull: false },
        updated_at: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    { underscored: true }
);

exports.classModel = Class;
