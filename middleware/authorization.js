const jwt = require("jsonwebtoken");
const role = require("../configs/role");
const { responseJson } = require("../utils/response");
const authorization = {
    admin: async (req, res, next) => {
        try {
            const token = req.query.token || req.headers["x-access-token"] || req.cookies.token || null;

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
                }
                if (payload && payload.role.toUpperCase() == role.admin) {
                    return next();
                } else {
                    responseJson({
                        res,
                        statusCode: 401,
                        msg: {
                            en: "Permission denied! Only admin is allowed to access this enpoint!",
                            vn: "Bạn không có quyền truy cập. Vui lòng liên hệ quản trị viên!",
                        },
                    });
                }
            });
        } catch (error) {
            responseJson({
                res,
                statusCode: 500,
                msg: {
                    en: "Interal Server Error",
                },
                data: {
                    error: error.message,
                },
            });
        }
    },
    staff: async (req, res, next) => {
        try {
            const token = req.query.token || req.headers["x-access-token"] || null;
            jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
                if (error) {
                    return responseJson({
                        res,
                        statusCode: 401,
                        msg: {
                            en: "token is invalid, please login again.",
                            vn: "token không hợp lệ, vui lòng đăng nhập lại.",
                        },
                    });
                }
                if (payload && payload.role.toUpperCase() == role.staff) {
                    return next();
                } else {
                    return res.status(401).json({
                        status: false,
                        msg: {
                            en: "Permission denied! Only admin is allowed to access this enpoint!",
                            vn: "Bạn không có quyền truy cập. Vui lòng liên hệ quản trị viên!",
                        },
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                statusCode: 500,
                msg: { en: "Interal Server Error" },
                error: error.message,
            });
        }
    },
    commisChef: async (req, res, next) => {
        try {
            const token = req.query.token || req.headers["x-access-token"] || null;
            jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
                if (error) {
                    return responseJson({
                        res,
                        statusCode: 401,
                        msg: {
                            en: "token is invalid, please login again.",
                            vn: "token không hợp lệ, vui lòng đăng nhập lại.",
                        },
                    });
                }
                if (payload && payload.role.toUpperCase() == role.commisChef) {
                    return next();
                } else {
                    return res.status(401).json({
                        status: false,
                        msg: {
                            en: "Permission denied! Only admin is allowed to access this enpoint!",
                            vn: "Bạn không có quyền truy cập. Vui lòng liên hệ quản trị viên!",
                        },
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                statusCode: 500,
                msg: { en: "Interal Server Error" },
                error: error.message,
            });
        }
    },
};

module.exports = authorization;
