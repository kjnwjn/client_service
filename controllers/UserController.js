// const responseJson = require("../utils/jsonResponse");
const { findById, createNew, findAll, updateOne, updateMany } = require("../model/user.query");
const { findById: findByIdFaculty } = require("../model/faculty.query");
const jsonResponse = require("../utils/jsonResponse");
const { generateRandomString } = require("../utils/helper");
const userSchema = require("../services/validateSchema/userSchema");
const updateUserSchema = require("../services/validateSchema/updateUserSchema");
const axios = require("axios");

module.exports = {
    userGetOne: function (req, res, next) {
        /*
            #swagger.tags = ['User']
        */
        const { id_user } = req.params;
        findById(id_user, (err, result) => {
            if (err) return next(err);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `get user ${id_user} successfully`,
                data: result,
            });
        });
    },
    userGetAll: function (req, res, next) {
        /*
            #swagger.tags = ['User']
        */
        findAll((err, result) => {
            if (err) return next(err);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `get list user successfully`,
                data: result,
            });
        });
    },
    userCreateNew: async (req, res, next) => {
        /*
            #swagger.tags = ['User']
        */
        const { error } = userSchema.validate(req.body);
        if (error) {
            return jsonResponse({ req, res })
                .status(error.status || 500)
                .json({ message: error.details[0].message || "Internal Server Error" });
        }

        if (req.body.id_faculty) {
            const result = await findByIdFaculty(req.body.id_faculty);
            if (!result) {
                return jsonResponse({ req, res }).json({ message: `Faculty ${req.body.id_faculty} does not exits!` });
            }
        }

        // const purePassword = generateRandomString(6);
        // const hashPassword = bcrypt.hashSync(purePassword, bcrypt.genSaltSync(10));
        const id_user = `${generateRandomString(6)}`;

        const bodyData = {
            id_user,
            fullName: req.body.fullName,
            gender: req.body.gender,
            id_faculty: req.body.id_faculty,
            role: req.body.role,
        };

        createNew(bodyData, (error, payload) => {
            const { dataValues, ...rest } = payload ? payload : {};
            if (error) return next(error);
            if (error) return next(error);
            axios
                .post(`${process.env.SECURITY_SERVICE}/new-account`, {
                    username: id_user,
                    password: id_user,
                    role: "FACULTY IT",
                })
                .then((data) => {
                    if (data.data.status) {
                        dataValues.username = data.data.data.username;
                        dataValues.password = data.data.data.password;
                        return jsonResponse({ req, res }).json({ status: true, message: `User ${id_user} has been created successfully!`, data: dataValues });
                    } else {
                        return jsonResponse({ req, res }).json({ message: data.data.msg });
                    }
                })
                .catch((err) => next(err));
        });
    },
    updateUserData: async (req, res, next) => {
        /*
            #swagger.tags = ['User']
        */
        const { error } = updateUserSchema.validate(req.body);
        if (error) {
            return jsonResponse({ req, res })
                .status(error.status || 500)
                .json({ message: error.details[0].message || "Internal Server Error" });
        }

        if (req.body.id_faculty) {
            const result = await findByIdFaculty(req.body.id_faculty);
            if (!result) {
                return jsonResponse({ req, res }).json({ message: `Faculty ${req.body.id_faculty} does not exits!` });
            }
        }
        let id_user = req.body.id_user;
        let dataPending = req.body;
        delete dataPending.id_user;
        const keyUpdate = Object.keys(dataPending);
        const valueUpdate = Object.values(dataPending);

        updateMany(id_user, keyUpdate, valueUpdate, (err, result) => {
            if (err) return next(err);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `Update user successfully`,
            });
        });
    },
};
