const responseJson = require("../utils/jsonResponse");
const { findById } = require("../model/student.model");

module.exports = {
    studentGetOne: function (req, res, next) {
        const { id_student } = req.params;
        findById(id_student, (err, result) => {
            console.log({ err, result });
        });
        res.end("test");
    },
    studentGetAll: function (req, res, next) {},
    newStudent: async (req, res, next) => {
        // try {
        //     const { error } = accountSchema.validate(req.body);
        //     if (error) {
        //         return responseJson({
        //             res,
        //             status: false,
        //             msg: { en: error.details[0].message },
        //         });
        //     }
        //     const purePassword = generateRandomString(6);
        //     const hashPassword = bcrypt.hashSync(purePassword, bcrypt.genSaltSync(10));
        //     const classExist = await classModel
        //         .findAll({
        //             where: {
        //                 id_class: req.body.id_class,
        //             },
        //         })
        //         .then((data) => data);
        //     console.log(classExist);
        //     if (classExist.length < 0) {
        //         return responseJson({
        //             res,
        //             status: false,
        //             msg: { en: "Class is not exist!", vn: "Lớp không tồn tại!" },
        //         });
        //     }
        //     const id_student = `${req.body.course_year}${generateRandomString(6)}`;
        //     const userExist = await studentModel
        //         .findAll({
        //             where: {
        //                 id_student: id_student,
        //             },
        //         })
        //         .then((data) => data);
        //     if (userExist.length > 0) {
        //         return responseJson({
        //             res,
        //             status: false,
        //             msg: { en: "Student already exist!", vn: "Tài khoản đã tồn tại!" },
        //         });
        //     }
        //     const payload = {
        //         id_student,
        //         username: id_student,
        //         password: hashPassword,
        //         fullName: req.body.fullName,
        //         email: req.body.email,
        //         gender: req.body.gender || 0,
        //         id_class: req.body.id_class,
        //         id_faculty: req.body.id_faculty,
        //         course_year: req.body.course_year,
        //     };
        //     console.log(payload);
        //     const user = await studentModel.create(payload);
        //     if (!user) {
        //         responseJson({
        //             res,
        //             status: false,
        //             msg: { en: "Create new user failed!", vn: "Tạo tài khoản thất bại!" },
        //         });
        //     }
        //     // Gọi service thông báo tới email của sv về tài khoản và mật khẩu
        //     responseJson({
        //         res,
        //         status: true,
        //         msg: { en: "Create new user successfully!", vn: "Tạo tài khoản thành công!" },
        //         data: user,
        //     });
        // } catch (error) {
        //     console.log(error);
        //     responseJson({
        //         res,
        //         statusCode: 500,
        //         msg: { en: error.message },
        //     });
        // }
    },
    getAllAccount: async (req, res, next) => {
        // #swagger.tags = ['Account']
        // try {
        //     const data = studentModel.SELECTALL();
        //     if (!data) {
        //         responseJson({
        //             res,
        //             status: false,
        //             msg: { en: "Get list user failed!", vn: "Lấy danh sách tài khoản thất bại!" },
        //         });
        //     }
        //     responseJson({
        //         res,
        //         status: true,
        //         msg: { en: "Get list user successfully!", vn: "Lấy danh sách tài khoản thành công!" },
        //         data: {
        //             data,
        //         },
        //     });
        // } catch (error) {
        //     responseJson({
        //         res,
        //         statusCode: 500,
        //         msg: { en: error.message },
        //     });
        // }
    },
};
