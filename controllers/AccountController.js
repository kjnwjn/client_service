// const responseJson = require("../utils/jsonResponse");
const { findById, createNew, findAll, updateOne, updateMany } = require("../model/student.query");
const { findById: findByIdClass } = require("../model/class.query");
const { findById: findByIdFaculty } = require("../model/faculty.query");
const jsonResponse = require("../utils/jsonResponse");
const bcrypt = require("bcrypt");
const { generateRandomString } = require("../utils/helper");
const { body } = require("express-validator");
const accountSchema = require("../services/validateSchema/accountSchema");
const changePassSchema = require("../services/validateSchema/changePassSchema");
const updateAccountSchema = require("../services/validateSchema/updateAccountSchema");

module.exports = {
    studentGetOne: function (req, res, next) {
        /*
            #swagger.tags = ['Student']
        */
        const { id_student } = req.params;
        findById(id_student, (err, result) => {
            if (err) return next(err);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `get student ${id_student} successfully`,
                data: result,
            });
        });
    },
    studentGetAll: function (req, res, next) {
        /*
            #swagger.tags = ['Student']
        */
        findAll((err, result) => {
            if (err) return next(err);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `get list student successfully`,
                data: result,
            });
        });
    },
    studentCreateNew: async (req, res, next) => {
        /*
            #swagger.tags = ['Student']
        */
        const { error } = accountSchema.validate(req.body);
        if (error) {
            return jsonResponse({ req, res })
                .status(error.status || 500)
                .json({ message: error.details[0].message || "Internal Server Error" });
        }
        if (req.body.id_class) {
            const result = await findByIdClass(req.body.id_class);
            if (!result) {
                return next(result);
            }
        }
        if (req.body.id_faculty) {
            const result = await findByIdClass(req.body.id_faculty);
            if (!result) {
                return next(result);
            }
        }

        const purePassword = generateRandomString(6);
        const hashPassword = bcrypt.hashSync(purePassword, bcrypt.genSaltSync(10));
        const id_student = `${req.body.course_year}${generateRandomString(6)}`;

        const bodyData = {
            id_student,
            username: id_student,
            password: hashPassword,
            fullName: req.body.fullName,
            email: req.body.email,
            gender: req.body.gender,
            id_class: req.body.id_class,
            id_faculty: req.body.id_faculty,
            course_year: req.body.course_year,
        };

        createNew(bodyData, (error, payload) => {
            const { dataValues, ...rest } = payload ? payload : {};
            dataValues.password = purePassword;
            if (error) return next(error);
            return jsonResponse({ req, res }).json({ status: true, message: `Student ${id_student} has been created successfully!`, data: dataValues });
        });
    },
    studentUpdatePassword: async (req, res, next) => {
        /*
            #swagger.tags = ['Student']
        */
        const { error } = changePassSchema.validate(req.body);
        if (error) {
            return jsonResponse({ req, res })
                .status(error.status || 500)
                .json({ message: error.details[0].message || "Internal Server Error" });
        }
        const id_student = req.body.id_student;
        const old_password = req.body.old_password;
        const new_password = req.body.new_password;

        const student = await findById(id_student, (err, result) => {
            if (err) return next(err);
            return result.dataValues;
        });
        const isCorrect = await bcrypt.compare(old_password, student.password);
        if (!isCorrect) {
            return jsonResponse({ req, res }).json({
                message: `Password is incorrect!`,
            });
        }
        const hashNewPassword = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
        updateOne(id_student, { password: hashNewPassword }, (err, result) => {
            console.log("🚀 ~ file: AccountController.js:104 ~ updateOne ~ result:", result);
            if (err) return next(err);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `Change password successfully`,
            });
        });
    },
    updateStudentData: async (req, res, next) => {
        const { error } = updateAccountSchema.validate(req.body);
        if (error) {
            return jsonResponse({ req, res })
                .status(error.status || 500)
                .json({ message: error.details[0].message || "Internal Server Error" });
        }

        if (req.body.id_class) {
            const result = await findByIdClass(req.body.id_class);
            if (!result) {
                return next(result);
            }
        }
        if (req.body.id_faculty) {
            findByIdFaculty(req.body.id_faculty, (error, result) => {
                if (error) return next(error);
            });
        }
        let id_student = req.body.id_student;
        let dataPending = req.body;
        delete dataPending.id_student;
        const keyUpdate = Object.keys(dataPending);
        const valueUpdate = Object.values(dataPending);

        updateMany(id_student, keyUpdate, valueUpdate, (err, result) => {
            if (err) return next(err);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `Update student successfully`,
            });
        });
    },
};
