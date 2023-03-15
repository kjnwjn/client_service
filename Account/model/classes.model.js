const { sequelize } = require("../configs/db");
const { DataTypes } = require('sequelize');


const Class = sequelize.define(
    "Classes",
    {
        id :{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,

        },
        // Model attributes are defined here
        id_class: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_falcuty: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
        created_at: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
        updated_at	: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
       
    },{
            
        underscored: true,
        }
    
);



exports.classModel = Class;



