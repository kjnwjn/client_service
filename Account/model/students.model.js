const { sequelize } = require("../configs/db");
const { DataTypes } = require('sequelize');


const Student = sequelize.define(
    "students",
    {
        id :{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,

        },
        // Model attributes are defined here
        id_student: {
            type: DataTypes.STRING,
            allowNull: false,
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
            allowNull: false,
        },
        id_class: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_faculty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
    },{
            
        underscored: true,
        }
    
);



exports.studentModel = Student;



