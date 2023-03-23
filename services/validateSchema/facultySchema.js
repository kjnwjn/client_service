const Joi = require("joi");

const facultySchema = Joi.object({
    id_faculty: Joi.string().min(3).max(30).required(),
    faculty_name: Joi.string().min(3).max(30).required(),
});

module.exports = facultySchema;
