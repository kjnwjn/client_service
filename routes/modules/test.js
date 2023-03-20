const { responseJson } = require("../../utils/response");
const { sendQueue } = require("../../services/rabbitMq/producer");
const { sequelize } = require("../../configs/db");
const {studentModel} = require("../../model/students.model");

module.exports = {
    // generateToken: async function (req, res, next) {
    //     var io = req.app.get("socketio");
    //     let r = (Math.random() + 1).toString(36).substring(7);
    //     io.emit("response", r);
    //     res.end("dsadsa");
    // },
    getAccessToken: async function (req, res, next) {
        const token = req.query.token || req.headers["x-access-token"] || req.cookies.token;

        return responseJson({
            res,
            status: true,
            statusCode: 200,
            msg: { en: "Get token successfully!", vn: "Lay token  thành công." },
            data: {
                token,
            },
        });
    },

    test: async function (req, res, next) {
        // #swagger.tags = ['TEST']
        // #swagger.description = 'This endpoint provides method for logging in system. Then receive an access token.'
        sendQueue({ msg: "hello" });
    },
    getAllAccount: async (req, res, next) => {
        // #swagger.tags = ['Account']
        try {
            // const students = []
            const students = await studentModel.findAll();
            students.every(student => console.log(student))
            if (!students) {
                responseJson({
                    res,
                    status: false,
                    msg: { en: "Get list user failed!", vn: "Lấy danh sách tài khoản thất bại!" },
                });
            }
            responseJson({
                res,
                status: true,
                msg: { en: "Get list user successfully!", vn: "Lấy danh sách tài khoản thành công!" },
                data: {
                    students,
                },
            });
        } catch (error) {
            console.log(error);
            responseJson({
                res,
                statusCode: 500,
                msg: { en: error.message },
            });
        }
    },
};
