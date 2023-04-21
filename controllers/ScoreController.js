// const responseJson = require("../utils/jsonResponse");
const { findById: StudentFindById } = require("../model/student.query");
const { findById, findByIdStudent, createNew, updateMany, findIdStudentAndIdCourse } = require("../model/score.query");
const jsonResponse = require("../utils/jsonResponse");
// const bcrypt = require("bcrypt");
// const { generateRandomString } = require("../utils/helper");
const ScoreSchema = require("../services/validateSchema/scoreCreateSchema");
const scoreExistSchema = require("../services/validateSchema/scoreExistSchema");
const ScoreUpdateSchema = require("../services/validateSchema/scoreUpdateDataSchema");
const { v4 } = require("uuid");

module.exports = {
    scoreGetByIdStudent: function (req, res, next) {
        /*
            #swagger.tags = ['Score']
        */
        const { id_student } = req.params;
        findByIdStudent(id_student, (err, result) => {
            if (err) return next(err);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `get score for student ${id_student} successfully`,
                data: result,
            });
        });
    },
    scoreGetByIdStudentAndIdCourse: function (req, res, next) {
        /*
            #swagger.tags = ['Score']
        */
        const { error } = scoreExistSchema.validate(req.params);
        if (error) {
            return jsonResponse({ req, res })
                .status(error.status || 500)
                .json({ message: error.details[0].message || "Internal Server Error" });
        }
        const { id_student, id_course } = req.params;
        findIdStudentAndIdCourse({ id_student, id_course }, (err, result) => {
            if (err) return next(err);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `get score for student ${id_student} successfully`,
                data: result,
            });
        });
    },
    scoreCreateNew: async (req, res, next) => {
        /*
            #swagger.tags = ['Score']
        */

        const { error } = ScoreSchema.validate(req.body);
        if (error) {
            return jsonResponse({ req, res })
                .status(error.status || 500)
                .json({ message: error.details[0].message || "Internal Server Error" });
        }
        if (req.body.id_student) {
            const result = await StudentFindById(req.body.id_student);
            if (!result) {
                return jsonResponse({ req, res }).json({ message: `Student ${req.body.id_student} does not exits!` });
            }
        }
        const id = v4();
        const bodyData = {
            id,
            id_student: req.body.id_student,
            id_course: req.body.id_course,
            semester: req.body.semester,
        };

        createNew(bodyData, (error, payload) => {
            if (error) return next(error);
            return jsonResponse({ req, res }).json({ status: true, message: `Score for student ${req.body.id_student} has been created successfully!`, data: payload });
        });
    },
    updateScoreData: async (req, res, next) => {
        /*
            #swagger.tags = ['Score']
        */
        const { error } = ScoreUpdateSchema.validate(req.body);
        if (error) {
            return jsonResponse({ req, res })
                .status(error.status || 500)
                .json({ message: error.details[0].message || "Internal Server Error" });
        }

        if (req.body.id) {
            const result = await findById(req.body.id);
            if (!result) {
                return jsonResponse({ req, res }).json({ message: `Score ${req.body.id} does not exits!` });
            }
        }
        const { attendance_score, assignment, mid_tern, final_tern } = req.body;
        let id = req.body.id;
        let dataPending = req.body;
        delete dataPending.id;
        const gpa_course = attendance_score * 0.1 + assignment * 0.2 + mid_tern * 0.2 + final_tern * 0.5;
        dataPending.gpa_course = gpa_course;
        const keyUpdate = Object.keys(dataPending);
        const valueUpdate = Object.values(dataPending);
        updateMany(id, keyUpdate, valueUpdate, (err, result) => {
            if (err) return next(err);
            return jsonResponse({ req, res }).json({
                status: true,
                message: `Update Score data ${id} successfully`,
                data: result,
            });
        });
    },
};
