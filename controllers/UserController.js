// const responseJson = require("../utils/jsonResponse");
const { findById, createNew, findAll, updateOne, updateMany } = require("../model/user.query");
const { findById: findByIdFaculty } = require("../model/faculty.query");
const jsonResponse = require("../utils/jsonResponse");
const { generateRandomString } = require("../utils/helper");
const { body } = require("express-validator");
const userSchema = require("../services/validateSchema/userSchema");
// const changePassSchema = require("../services/validateSchema/changePassSchema");
const updateUserSchema = require("../services/validateSchema/updateUserSchema");
const { EXCHANGE_TYPE, EXCHANGE_NAME, QUEUE: queueName } = require("../configs/variables");
let queueUtils = require("../services/rabbitMq/queueUtils");

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
            /*
            #swagger.tags = ['User']
        */
            const { dataValues, ...rest } = payload ? payload : {};
            if (error) return next(error);
            // queueUtils
            //     .publishMessageToExchange(
            //         EXCHANGE_NAME.FAN_OUT_CREATE_CLIENT_DATA,
            //         EXCHANGE_TYPE.FANOUT,
            //         "",
            //         { durable: false },
            //         { noAck: true },
            //         {
            //             data: bodyData,
            //         }
            //     )
            //     .then((data) => {
            //         console.log(data);
            //     })
            //     .catch((error) => {
            //         next(error);
            //     });

            return jsonResponse({ req, res }).json({ status: true, message: `User ${id_user} has been created successfully!`, data: dataValues });
        });
    },
    // userUpdatePassword: async (req, res, next) => {
    //     /*
    //         #swagger.tags = ['User']
    //     */
    //     const { error } = changePassSchema.validate(req.body);
    //     if (error) {
    //         return jsonResponse({ req, res })
    //             .status(error.status || 500)
    //             .json({ message: error.details[0].message || "Internal Server Error" });
    //     }
    //     const id_user = req.body.id_user;
    //     const old_password = req.body.old_password;
    //     const new_password = req.body.new_password;

    //     const user = await findById(id_user, (err, result) => {
    //         if (err) return next(err);
    //         return result.dataValues;
    //     });
    //     const isCorrect = await bcrypt.compare(old_password, user.password);
    //     if (!isCorrect) {
    //         return jsonResponse({ req, res }).json({
    //             message: `Password is incorrect!`,
    //         });
    //     }
    //     const hashNewPassword = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
    //     updateOne(id_user, { password: hashNewPassword }, (err, result) => {
    //         console.log("🚀 ~ file: AccountController.js:104 ~ updateOne ~ result:", result);
    //         if (err) return next(err);
    //         return jsonResponse({ req, res }).json({
    //             status: true,
    //             message: `Change password successfully`,
    //         });
    //     });
    // },
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
