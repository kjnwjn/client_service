// const responseJson = require("../utils/jsonResponse");
const { findById, createNew, findAll, updateOne, updateMany } = require("../model/student.query");
const { findById: findByIdClass, findOneByIdFaculty } = require("../model/class.query");
const { findById: findByIdFaculty } = require("../model/faculty.query");
const jsonResponse = require("../utils/jsonResponse");
const { generateRandomString } = require("../utils/helper");
const { body } = require("express-validator");
const accountSchema = require("../services/validateSchema/accountSchema");
const updateAccountSchema = require("../services/validateSchema/updateAccountSchema");
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
                    return jsonResponse({ req, res }).json({
                        message: `Faculty ${req.body.id_faculty} does not exits!`,
                    });
                }
            }
            const { fullName, gender, id_class, id_faculty, course_year } = req.body;

            const isClassExist = await findOneByIdFaculty({ id_class, id_faculty });

            if (!isClassExist) {
                return jsonResponse({ req, res }).json({
                    message: `Class ${id_class} does not exits in faculty ${id_faculty}!`,
                });
            }
            const id_student = `${req.body.course_year}${generateRandomString(6)}`;
            const email = `${id_student}@student.abc.edu.vn`;

            const bodyData = {
                id_student,
                fullName: fullName,
                email: email,
                gender: gender,
                id_class: id_class,
                id_faculty: id_faculty,
                course_year: course_year,
            };

            createNew(bodyData, (error, payload) => {
                const { dataValues, ...rest } = payload ? payload : {};
                if (error) return next(error);
                axios
                    .post(`${process.env.ACCOUNT_SERVICE}/new-account`, {
                        username: id_student,
                        password: id_student,
                        role: "STUDENT",
                    })
                    .then((data) => {
                        console.log(data);
                        if (data.data.status) {
                            dataValues.username = data.data.data.username;
                            dataValues.password = data.data.data.password;
                            return jsonResponse({ req, res }).json({
                                status: true,
                                message: `Student ${id_student} has been created successfully!`,
                                data: dataValues,
                            });
                        } else {
                            return jsonResponse({ req, res }).json({ message: data.data.message });
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
            rows[0][6].toUpperCase() !== "ID CLASS" ||
            rows[0][6].toUpperCase() !== "ID FACULTY" ||
            rows[0][7].toUpperCase() !== "COURSE YEAR"
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
                        id_class: element[6].toString(),
                        id_faculty: element[7].toString(),
                        course_year: element[8].toString(),
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
                msg: { en: "Internal Server Error" },
                error: error.message,
            });
        }
    },
};
