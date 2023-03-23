// const responseJson = require("../utils/jsonResponse");
const { findById } = require("../model/student.query");
const { findById: findByIdClass, createNew: createNewClass, findAll: findAllClass, updateMany: updateManyClass } = require("../model/class.query");
const { findById: findByIdFaculty } = require("../model/faculty.query");
const jsonResponse = require("../utils/jsonResponse");
const bcrypt = require("bcrypt");
const { generateRandomString } = require("../utils/helper");
const classSchema = require("../services/validateSchema/classSchema");

module.exports = {
    classGetOne: function (req, res, next) {
        /*
            #swagger.tags = ['Class']
        */
        const { id_class } = req.params;
        findByIdClass(id_class, (err, result) => {
            if (err) return next(err);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `get class ${id_class} successfully`,
                data: result,
            });
        });
    },
    classGetAll: function (req, res, next) {
        /*
            #swagger.tags = ['Class']
        */
        findAllClass((err, result) => {
            if (err) return next(err);
            console.log(result);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `get list class successfully`,
                data: result,
            });
        });
    },
    classCreateNew: async (req, res, next) => {
        /*
            #swagger.tags = ['Class']
        */
        const { error } = classSchema.validate(req.body);
        if (error) {
            return jsonResponse({ req, res })
                .status(error.status || 500)
                .json({ message: error.details[0].message || "Internal Server Error" });
        }

        if (req.body.id_faculty) {
            const result = await findByIdClass(req.body.id_faculty);
            if (!result) {
                return next(result);
            }
        }
        const id_class = `${req.body.course_year}${req.body.id_faculty}${generateRandomString(4)}`;
        const bodyData = {
            id_class: id_class,
            id_faculty: req.body.id_faculty,
        };

        createNewClass(bodyData, (error, payload) => {
            if (error) return next(error);
            return jsonResponse({ req, res }).json({ status: true, message: `Class ${id_class} has been created successfully!`, data: payload });
        });
    },
    updateClassData: async (req, res, next) => {
        /*
            #swagger.tags = ['Class']
        */
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
            const result = await findByIdFaculty(req.body.id_class);
            if (!result) {
                return next(result);
            }
        }
        let id_class = req.body.id_class;
        let dataPending = req.body;
        delete dataPending.id_class;
        const keyUpdate = Object.keys(dataPending);
        const valueUpdate = Object.values(dataPending);

        updateManyClass(id_class, keyUpdate, valueUpdate, (err, result) => {
            if (err) return next(err);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `Update class successfully`,
            });
        });
    },
};
