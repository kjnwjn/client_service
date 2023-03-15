const { responseJson } = require("../../utils/response");
// const {studentModel} = require("../../model/student.model");
module.exports = {
    getAllAccount: async (req, res, next) => {
        // #swagger.tags = ['Account']
        try {
            const data = studentModel.SELECTALL();
            if (!data) {
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
                    data,
                },
            });
        } catch (error) {
            responseJson({
                res,
                statusCode: 500,
                msg: { en: error.message },
            });
        }
    },
};
