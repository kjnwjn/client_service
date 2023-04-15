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
const { EXCHANGE_TYPE, EXCHANGE_NAME, QUEUE: queueName } = require("../configs/variables");
let queueUtils = require("../services/rabbitMq/queueUtils");
const axios = require("axios");

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
        try {
            const { error } = accountSchema.validate(req.body);
            if (error) {
                return jsonResponse({ req, res })
                    .status(error.status || 500)
                    .json({ message: error.details[0].message || "Internal Server Error" });
            }

            if (req.body.id_class) {
                const result = await findByIdClass(req.body.id_class);
                if (!result) {
                    return jsonResponse({ req, res }).json({ message: `Class ${req.body.id_class} does not exits!` });
                }
            }
            if (req.body.id_faculty) {
                const result = await findByIdFaculty(req.body.id_faculty);
                if (!result) {
                    return jsonResponse({ req, res }).json({ message: `Faculty ${req.body.id_faculty} does not exits!` });
                }
            }

            const id_student = `${req.body.course_year}${generateRandomString(6)}`;

            const bodyData = {
                id_student,
                fullName: req.body.fullName,
                email: req.body.email,
                gender: req.body.gender,
                id_class: req.body.id_class,
                id_faculty: req.body.id_faculty,
                course_year: req.body.course_year,
            };

            createNew(bodyData, (error, payload) => {
                const { dataValues, ...rest } = payload ? payload : {};
                if (error) return next(error);
                axios
                    .post(`${process.env.SECURITY_SERVICE}/account/new-account`, {
                        username: id_student,
                        password: id_student,
                        role: "STUDENT",
                    })
                    .then((data) => {
                        if (data.data.status) {
                            dataValues.username = data.data.data.username;
                            dataValues.password = data.data.data.password;
                            return jsonResponse({ req, res }).json({ status: true, message: `Student ${id_student} has been created successfully!`, data: dataValues });
                        } else {
                            return jsonResponse({ req, res }).json({ message: data.data.msg });
                        }
                    })
                    .catch((err) => next(err));
            });
        } catch (err) {
            return next(err);
        }
        // res.end();
    },

    updateStudentData: async (req, res, next) => {
        /*
            #swagger.tags = ['Student']
        */
        const { error } = updateAccountSchema.validate(req.body);
        if (error) {
            return jsonResponse({ req, res })
                .status(error.status || 500)
                .json({ message: error.details[0].message || "Internal Server Error" });
        }
        if (req.body.id_class) {
            const result = await findByIdFaculty(req.body.id_class);
            if (!result) {
                return jsonResponse({ req, res }).json({ message: `Class ${req.body.id_class} does not exits!` });
            }
        }

        if (req.body.id_faculty) {
            const result = await findByIdFaculty(req.body.id_faculty);
            if (!result) {
                return jsonResponse({ req, res }).json({ message: `Faculty ${req.body.id_faculty} does not exits!` });
            }
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
    studentImport: async (req, res, next) => {
        /*
            #swagger.tags = ['Student']
            #swagger.consumes = ['multipart/form-data']  
            #swagger.parameters['file'] = {
                in: 'formData',
                type: 'file',
                required: 'true',
                description: 'Upload excel file data. Only excel format is allowed.',
        } */
        // #swagger.description = 'Admin can user this endpoint for importing list of accounts to database instead of register for each one.'
        const rows = await xlsxFile(req.file.path);

        if (
            rows[0][0].toUpperCase() !== "STUDENT ID" ||
            rows[0][1].toUpperCase() !== "GENDER" ||
            rows[0][2].toUpperCase() !== "FULL NAME" ||
            rows[0][3].toUpperCase() !== "ADDRESS" ||
            rows[0][4].toUpperCase() !== "PHONE NUMBER" ||
            rows[0][5].toUpperCase() !== "EMAIL" ||
            rows[0][4].toUpperCase() !== "COURSE YEAR"
        )
            return jsonResponse({ req, res }).json({ message: "Invalid format excel file" });

        try {
            rows.forEach(async (element, index) => {
                if (index > 0) {
                    await createNew({
                        id_student: element[0].toString(),
                        gender: element[1].toString().toUpperCase() == "MALE" ? 1 : 0,
                        fullName: element[2].toString(),
                        address: element[3].toString(),
                        phoneNumber: element[4].toString(),
                        email: element[5].toString(),
                    });
                }
            });
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: "All accounts has been import successfully!",
                    vn: "Đã nhập danh sách tài khoản thành công!",
                },
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                statusCode: 500,
                msg: { en: "Interal Server Error" },
                error: error.message,
            });
        }
    },
};
