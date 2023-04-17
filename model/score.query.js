const { Score } = require("./defineModel");
const { isNull } = require("../utils/helper");

module.exports = {
    findById: async function (id, callback = null) {
        try {
            const StudentScore = await Score.findByPk(id);
            if (!callback) return StudentScore;
            if (StudentScore) {
                return callback(null, StudentScore);
            } else {
                return callback(new Error(`Score ${id} doesn't exits`), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
    findByIdStudent: async function (id_student, callback = null) {
        try {
            const scoreElement = await Score.findAll({
                where: {
                    id_student: id_student,
                },
                group: "semester",
            });
            if (!callback) return scoreElement;
            if (scoreElement) {
                return callback(null, scoreElement);
            } else {
                return callback(new Error(`Student ${id_student} doesn't exits any score`), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
    findByIdCourse: async function (id_course, callback = null) {
        try {
            const studentElement = await Score.findAll({
                where: {
                    id_course,
                },
                group: "semester",
            });
            if (!callback) return studentElement;
            if (studentElement) {
                return callback(null, studentElement);
            } else {
                return callback(new Error(`course ${id_course} doesn't exits any score`), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
    findOneStudent: async function (id_student, id_course, callback = null) {
        try {
            const studentElement = await Score.findOne({ where: { id_student, id_course } });
            if (!callback) return studentElement;
            if (studentElement) {
                return callback(null, studentElement);
            } else {
                return callback(new Error(`Student ${id_student} doesn't exits any score in Course ${id_course}`), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
    createNew: async ({ id = null, id_student = null, id_course = null, attendance_score = null, assignment = null, mid_tern = null, final_tern = null }, callback = null) => {
        try {
            const checkNull = isNull([id, id_student, id_course]);
            if (checkNull.checked) {
                const scoreInstance = await Score.create({ id, id_student, id_course, attendance_score, assignment, mid_tern, final_tern });
                if (!callback) return scoreInstance;
                return callback(null, scoreInstance);
            } else {
                return callback(new Error(checkNull.msg), null);
            }
        } catch (error) {
            console.log(error);
            callback(error, null);
        }
    },
    findAll: async function (callback = null) {
        try {
            const data = await Score.findAll();
            if (!callback) return data;
            if (data) {
                callback(null, data);
            } else {
                callback(new Error(`Score data does not exist or empty!`), null);
            }
        } catch (error) {
            callback(error, null);
        }
    },
    updateOne: async (id, field = {}, callback = null) => {
        try {
            const checkNull = isNull([id]);
            let toUpdate = {};
            toUpdate[Object.keys(field)[0]] = Object.values(field)[0];
            if (checkNull.checked) {
                const scoreInstance = await Score.update(Object.assign(toUpdate), {
                    where: {
                        id,
                    },
                });
                if (!callback) return scoreInstance;
                return callback(null, scoreInstance);
            } else {
                return callback(new Error(checkNull.msg), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
    updateMany: async (id = null, keys = [], values = [], callback = null) => {
        try {
            const checkNull = isNull([id, keys, values]);
            let toUpdate = {};
            keys.forEach((key, index) => {
                toUpdate[key] = values[index];
            });
            if (checkNull.checked) {
                const scoreInstance = await Score.update(toUpdate, {
                    where: {
                        id,
                    },
                });
                if (!callback) return scoreInstance;
                return callback(null, scoreInstance);
            } else {
                return callback(new Error(checkNull.msg), null);
            }
        } catch (error) {
            return callback(error, null);
        }
    },
};
