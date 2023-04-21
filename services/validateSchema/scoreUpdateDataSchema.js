const Joi = require("joi");

const ScoreUpdateSchema = Joi.object({
    id: Joi.string().required(),
    attendance_score: Joi.number().min(0).max(10).required(),
    assignment: Joi.number().min(0).max(10).required(),
    mid_tern: Joi.number().min(0).max(10).required(),
    final_tern: Joi.number().min(0).max(10).required(),
});

module.exports = ScoreUpdateSchema;
