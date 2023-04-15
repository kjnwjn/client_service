// const responseJson = require("../utils/jsonResponse");
// const { findById } = require("../model/student.query");
// const { findById: findById, createNew: createNewFaculty, findAll: findAllFaculty, updateMany: updateManyClass } = require("../model/faculty.query");
const { findById, findAll, createNew } = require("../model/faculty.query");
const jsonResponse = require("../utils/jsonResponse");
// const bcrypt = require("bcrypt");
const { generateRandomString } = require("../utils/helper");
const facultySchema = require("../services/validateSchema/facultySchema");

module.exports = {
    facultyGetOne: function (req, res, next) {
        /*
            #swagger.tags = ['Faculty']
        */
        const { id_faculty } = req.params;
        findById(id_faculty, (err, result) => {
            if (err) return next(err);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `get faculty ${id_faculty} successfully`,
                data: result,
            });
        });
    },
    facultyGetAll: function (req, res, next) {
        /*
            #swagger.tags = ['Faculty']
        */
        findAll((err, result) => {
            if (err) return next(err);
            console.log(result);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `get list faculty successfully`,
                data: result,
            });
        });
    },
    facultyCreateNew: async (req, res, next) => {
        /*
            #swagger.tags = ['Faculty']
        */
        const faculty_name = req.body.faculty_name || null;
        if (!faculty_name) {
            return jsonResponse({ req, res }).json({ message: `faculty_name is required!` });
        }
        const id_faculty = `${generateRandomString(6)}`;
        const bodyData = {
            faculty_name,
            id_faculty,
        };

        createNew(bodyData, (error, payload) => {
            if (error) return next(error);
            return jsonResponse({ req, res }).json({ status: true, message: `Faculty ${id_faculty} has been created successfully!`, data: payload });
        });
    },
};
