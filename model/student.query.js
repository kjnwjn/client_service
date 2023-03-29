const { sequelize } = require("../configs/db");
const { DataTypes } = require("sequelize");
const { isNull } = require("../utils/helper");
const { Student, Class } = require("./defineModel");

module.exports = {
    findById: async function (id, callback = null) {
        try {
            const student = await Student.findByPk(id);
            if (!callback) return student;
            if (student) {
                return callback(null, student);
            } else {
                return callback(new Error(`student ${id} doesn't exits`), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
    createNew: async function (
        { id_student = null, username = null, password = null, gender = 1, fullName = null, address = "", phoneNumber = null, email = "", id_class = null, id_faculty = null, course_year = null, access_token = "", refresh_token = "" },
        callback
    ) {
        try {
            const checkNull = isNull([id_student, username, password, gender, fullName, address, phoneNumber, email, id_class, id_faculty, course_year, access_token, refresh_token]);
            if (checkNull.checked) {
                const student = await Student.create({ id_student, username, password, gender, fullName, address, phoneNumber, email, id_class, id_faculty, course_year });
                callback(null, student);
            } else {
                return callback(new Error(checkNull.msg), null);
            }
        } catch (error) {
            callback(error, null);
        }
    },
    findAll: async function (callback = null) {
        try {
            const data = await Student.findAll({
                attributes: { exclude: ["username", "password", "access_token", "refresh_token"] },
            });
            if (!callback) return data;
            if (data) {
                return callback(null, data);
            } else {
                return callback(new Error(`Student data does not exist or empty!`), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
    updateOne: async (id = null, field = {}, callback) => {
        try {
            const checkNull = isNull([id, field]);
            let toUpdate = {};
            toUpdate[Object.keys(field)[0]] = Object.values(field)[0];
            if (checkNull.checked) {
                const student = await Student.update(Object.assign(toUpdate), {
                    where: {
                        id_student: id,
                    },
                });
                return callback(null, student);
            } else {
                return callback(new Error(checkNull.msg), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
    updateMany: async (id_student = null, keys = [], values = [], callback) => {
        try {
            const checkNull = isNull([id_student, keys, values]);
            // let toUpdate = {};
            let toUpdate = {};
            keys.forEach((key, index) => {
                toUpdate[key] = values[index];
            });
            if (checkNull.checked) {
                const student = await Student.update(toUpdate, {
                    where: {
                        id_student,
                    },
                });
                return callback(null, student);
            } else {
                return callback(new Error(checkNull.msg), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
};