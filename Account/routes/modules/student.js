const { responseJson } = require("../../utils/response");
const accountSchema = require("../../services/validateSchema/accountSchema");
const { studentModel } = require("../../model/students.model");
const { generateRandomString } = require("../../utils/index");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
module.exports = {
    createNewStudent: async (req, res, next) => {
        try {
            // #swagger.tags = ['Account']
            /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Some description...',
                 schema: {
                    $fullName: 'pham nguyen hoang quan' ,
                    $email:'quanpham@gmail.com' ,
                    $gender: 0,
                    $id_class: '2123213',
                    $id_faculty: '321321321',
                    $course_year: '2012',
                }
            }
        */
            const { error } = accountSchema.validate(req.body);
            if (error) {
                return responseJson({
                    res,
                    status: false,
                    msg: { en: error.details[0].message },
                });
            }
            const purePassword = generateRandomString(6);
            const hashPassword = bcrypt.hashSync(purePassword, bcrypt.genSaltSync(10));
            console.log(req.body);
            const id_student = `${req.body.course_year}${generateRandomString(4)}`;
            const payload = {
                id_student,
                username: id_student,
                password: hashPassword,
                fullName: req.body.fullName,
                email: req.body.email,
                gender: req.body.gender || 0,
                id_class: req.body.id_class,
                id_faculty: req.body.id_faculty,
                course_year: req.body.course_year,
            };
            console.log(payload);
            const user = await studentModel.create(payload);

            if (!user) {
                responseJson({
                    res,
                    status: false,
                    msg: { en: "Create new user failed!", vn: "Tạo tài khoản thất bại!" },
                });
            }
            // Gọi service thông báo tới email của sv về tài khoản và mật khẩu
            responseJson({
                res,
                status: true,
                msg: { en: "Create new user successfully!", vn: "Tạo tài khoản thành công!" },
                data: user,
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
    // login: async (req, res, next) => {
    //     // #swagger.tags = ['Account']
    //     // #swagger.description = 'This endpoint provides method for logging in system. Then receive an access token.'
    //     try {
    //         let userCode = req.body.userCode ? req.body.userCode.toUpperCase() : "";
    //         let password = req.body.password || null;
    //         if (!userCode) {
    //             return responseJson({
    //                 res,
    //                 msg: { en: "userCode is required" },
    //             });
    //         }
    //         if (!password) {
    //             return responseJson({
    //                 res,
    //                 msg: { en: "password is required" },
    //             });
    //         }
    //         let accountQuery = await accountModel.findOne({ userCode });
    //         if (accountQuery) {
    //             // console.log(accountQuery);
    //             bcrypt.compare(password, accountQuery.password, async (err, isValid) => {
    //                 if (isValid) {
    //                     let token = jwt.sign(
    //                         {
    //                             userCode: accountQuery.userCode,
    //                             fullName: accountQuery.fullName,
    //                             role: accountQuery.role,
    //                             status: accountQuery.status,
    //                         },
    //                         process.env.ACCESS_TOKEN_SECRET_KEY,
    //                         {
    //                             expiresIn: "1m",
    //                         }
    //                     );
    //                     let refreshToken = jwt.sign(
    //                         {
    //                             userCode: accountQuery.userCode,
    //                             fullName: accountQuery.fullName,
    //                             role: accountQuery.role,
    //                             status: accountQuery.status,
    //                         },
    //                         process.env.REFRESH_TOKEN_SECRET_KEY,
    //                         {
    //                             expiresIn: "30 days",
    //                         }
    //                     );
    //                     res.cookie("refreshToken", refreshToken);
    //                     res.cookie("token", token);
    //                     await accountModel.findOneAndUpdate({ userCode }, { access_token: token, refresh_token: refreshToken, status: true });
    //                     return responseJson({
    //                         res,
    //                         status: true,
    //                         statusCode: 200,
    //                         msg: { en: "Login successfully!", vn: "Đăng nhập thành công." },
    //                         data: {
    //                             token,
    //                             refreshToken,
    //                         },
    //                     });
    //                 } else {
    //                     return responseJson({
    //                         res,
    //                         statusCode: 401,
    //                         msg: { en: "Invalid password!", vn: "Mật khẩu không hợp lệ." },
    //                     });
    //                 }
    //             });
    //         } else {
    //             return responseJson({
    //                 res,
    //                 msg: { en: "Account does not exist!", vn: "Tài khoản không tồn tại." },
    //             });
    //         }
    //     } catch (error) {
    //         return responseJson({
    //             res,
    //             statusCode: 500,
    //             msg: { en: error.message },
    //         });
    //     }
    // },
};
