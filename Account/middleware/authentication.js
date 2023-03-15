const jwt = require("jsonwebtoken");
const { responseJson } = require("../utils/response");
const authentication = async function (req, res, next) {
    try {
        const token = req.query.token || req.headers["x-access-token"] || req.cookies.token;

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (error, payload) => {
            if (error) {
                responseJson({
                    res,
                    statusCode: 401,
                    msg: {
                        en: "token is invalid, please login again.",
                        vn: "token không hợp lệ, vui lòng đăng nhập lại.",
                    },
                });
            } else {
                return next();
            }
        });
    } catch (e) {
        responseJson({
            res,
            statusCode: 500,
            msg: { en: "Interal Server Error" },
            error: error.message,
        });
    }
};

module.exports = authentication;
