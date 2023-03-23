const { sequelize } = require("../configs/db");
const { DataTypes } = require("sequelize");
const { Student, Class } = require("./defineModel");
const { isNull } = require("../utils/helper");

module.exports = {
    findById: async function (id, callback = null) {
        try {
            const classElement = await Class.findByPk(id);
            if (!callback) return classElement;
            if (classElement) {
                return callback(null, classElement);
            } else {
                return callback(new Error(`class ${id} doesn't exits`), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
    createNew: async ({ id_class = null, id_faculty = null }, callback = null) => {
        try {
            const checkNull = isNull([id_class, id_faculty]);
            if (checkNull.checked) {
                const classInstance = await Class.create({ id_class, id_faculty });
                if (!callback) return classInstance;
                return callback(null, classInstance);
            } else {
                return callback(new Error(checkNull.msg), null);
            }
        } catch (error) {
            callback(error, null);
        }
    },
    findAll: async function (callback = null) {
        try {
            const data = await Class.findAll();
            if (!callback) return data;
            if (data) {
                callback(null, data);
            } else {
                callback(new Error(`Student data does not exist or empty!`), null);
            }
        } catch (error) {
            callback(error, null);
        }
    },
    updateOne: async (id = null, field = {}, callback = null) => {
        try {
            const checkNull = isNull([id, field]);
            let toUpdate = {};
            toUpdate[Object.keys(field)[0]] = Object.values(field)[0];
            if (checkNull.checked) {
                const classInstance = await Class.update(Object.assign(toUpdate), {
                    where: {
                        id_class: id,
                    },
                });
                if (!callback) return classInstance;
                return callback(null, classInstance);
            } else {
                return callback(new Error(checkNull.msg), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
    updateMany: async (id_class = null, keys = [], values = [], callback = null) => {
        try {
            const checkNull = isNull([id_class, keys, values]);
            let toUpdate = {};
            keys.forEach((key, index) => {
                toUpdate[key] = values[index];
            });
            if (checkNull.checked) {
                const classInstance = await Student.update(toUpdate, {
                    where: {
                        id_class,
                    },
                });
                if (!callback) return classInstance;
                return callback(null, classInstance);
            } else {
                return callback(new Error(checkNull.msg), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
};
