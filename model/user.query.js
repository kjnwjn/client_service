const { sequelize } = require("../configs/db");
const { DataTypes } = require("sequelize");
const { isNull } = require("../utils/helper");
const { User } = require("./defineModel");

module.exports = {
    findById: async function (id, callback = null) {
        try {
            const user = await User.findByPk(id);
            if (!callback) return user;
            if (user) {
                return callback(null, user);
            } else {
                return callback(new Error(`user ${id} doesn't exits`), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
    createNew: async function ({ id_user = null, gender = 1, full_name = null, address = "", phone_number = null, role = "", id_faculty = null }, callback) {
        try {
            const checkNull = isNull([id_user, gender, full_name, address, phone_number, role, id_faculty]);
            if (checkNull.checked) {
                const user = await User.create({ id_user, gender, full_name, address, phone_number, role, id_faculty });
                callback(null, user);
            } else {
                console.log(checkNull.msg);
                return callback(new Error(checkNull.msg), null);
            }
        } catch (error) {
            callback(error, null);
        }
    },
    findAll: async function (callback = null) {
        try {
            const data = await User.findAll();
            if (!callback) return data;
            if (data) {
                return callback(null, data);
            } else {
                return callback(new Error(`User data does not exist or empty!`), null);
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
                const user = await User.update(Object.assign(toUpdate), {
                    where: {
                        id_user: id,
                    },
                });
                return callback(null, user);
            } else {
                return callback(new Error(checkNull.msg), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
    updateMany: async (id_user = null, keys = [], values = [], callback) => {
        try {
            const checkNull = isNull([id_user, keys, values]);
            // let toUpdate = {};
            let toUpdate = {};
            keys.forEach((key, index) => {
                toUpdate[key] = values[index];
            });
            if (checkNull.checked) {
                const user = await User.update(toUpdate, {
                    where: {
                        id_user,
                    },
                });
                return callback(null, user);
            } else {
                return callback(new Error(checkNull.msg), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
};
