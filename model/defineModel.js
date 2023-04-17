const { sequelize } = require("../configs/db");
const { DataTypes } = require("sequelize");

// // Define Model
const Faculty = sequelize.define(
    "faculty",
    {
        id_faculty: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        faculty_name: { type: DataTypes.STRING, allowNull: false },
    },
    {
        tableName: "faculty",
        underscored: true,
    }
);
const Class = sequelize.define(
    "classes",
    {
        id_class: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        id_faculty: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: "class", underscored: true }
);
const Student = sequelize.define(
    "students",
    {
        id_student: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        gender: { type: DataTypes.BOOLEAN, allowNull: true },
        fullName: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: true },
        phoneNumber: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        id_class: { type: DataTypes.STRING, allowNull: false },
        id_faculty: { type: DataTypes.STRING, allowNull: false },
        course_year: { type: DataTypes.NUMBER, allowNull: false },
    },
    { tableName: "student", underscored: true }
);

const Score = sequelize.define(
    "scores",
    {
        id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        id_student: { type: DataTypes.STRING, allowNull: false },
        id_course: { type: DataTypes.STRING, allowNull: false },
        semester: { type: DataTypes.STRING, allowNull: true },
        attendance_score: { type: DataTypes.NUMBER, allowNull: true },
        assignment: { type: DataTypes.NUMBER, allowNull: true },
        mid_tern: { type: DataTypes.NUMBER, allowNull: true },
        final_tern: { type: DataTypes.NUMBER, allowNull: true },
    },
    { tableName: "score", underscored: true }
);

const User = sequelize.define(
    "user",
    {
        id_user: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        full_name: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: true },
        gender: { type: DataTypes.BOOLEAN, allowNull: true },
        phone_number: { type: DataTypes.STRING, allowNull: true },
        role: { type: DataTypes.STRING, allowNull: true },
        id_faculty: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: "user", underscored: true }
);

// Define Associations
Student.hasMany(Score, {
    foreignKey: "id_student",
    targetKey: "id_student",
});
Score.belongsTo(Student, {
    foreignKey: "id_student",
    targetKey: "id_student",
});

Class.hasMany(Student, {
    foreignKey: "id_class",
    targetKey: "id_class",
});
Student.belongsTo(Class, {
    foreignKey: "id_class",
    targetKey: "id_class",
});

Faculty.hasMany(Class, {
    foreignKey: "id_faculty",
    targetKey: "id_faculty",
});
Class.belongsTo(Faculty, {
    foreignKey: "id_faculty",
    targetKey: "id_faculty",
});

module.exports = {
    Faculty,
    Class,
    Student,
    User,
    Score,
};
