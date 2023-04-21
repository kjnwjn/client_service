const { isNull } = require("../utils/helper");
const { Student, Class, Faculty } = require("./defineModel");
module.exports = {
    findById: async function (id, callback = null) {
        try {
            const facultyElement = await Faculty.findByPk(id);
            if (!callback) return facultyElement;
            if (facultyElement) {
                return callback(null, facultyElement);
            } else {
                const err = new Error(`faculty ${id} doesn't exits`);
                err.status = 404;
                return callback(err, null);
            }
        } catch (error) {
            callback(error, null);
        }
    },
    findAll: async function (callback = null) {
        try {
            const data = await Faculty.findAll();
            if (!callback) return data;
            if (data) {
                callback(null, data);
            } else {
                callback(new Error(`faculty data does not exist or empty!`), null);
            }
        } catch (error) {
            callback(error, null);
        }
    },
    createNew: async ({ faculty_name = null, id_faculty = null }, callback = null) => {
        try {
            const checkNull = isNull([faculty_name, id_faculty]);
            if (checkNull.checked) {
                const facultyInstance = await Faculty.create({ id_faculty, faculty_name });
                if (!callback) return facultyInstance;
                return callback(null, facultyInstance);
            } else {
                return callback(new Error(checkNull.msg), null);
            }
        } catch (error) {
            callback(error, null);
        }
    },
};
