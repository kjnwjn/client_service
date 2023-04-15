/* Middleware for multer storage upload */
const multer = require("multer");
const { v4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const jsonResponse = require("./jsonResponse");
const { findById } = require("../model/student.query");

cloudinary.config({
    cloud_name: "dofsuykut",
    api_key: "796484688251745",
    api_secret: "UHqigiiWANhqItnT1S3F-bdtOlE",
});
// const jsonResponse = require("./jsonResponse");

const storageMulter = async (req, res, next) => {
    // const id_student = req.params.id_student;
    if (!req.params.id_student) {
        return jsonResponse({ req, res }).json({
            message: "id_student is required",
        });
    }
    // const id_student = await findById(req.params.id_student);
    const id_student = req.params.id_student;
    if (!id_student) {
        return jsonResponse({ req, res }).json({
            message: "id_student not found",
        });
    }
    const upload = multer({
        storage: multer.diskStorage({
            destination: (req, res, callback) => {
                callback(null, "./public/uploads");
            },
            filename: (req, file, callback) => {
                // const fileName = `${id_student}`;
                callback(null, `${id_student}.png`);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, callback) => {
            const validMimeType = file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg";
            if (validMimeType) {
                callback(null, true);
            } else {
                callback(null, false);
                const err = new Error("Extension Error");
                err.message = "Only *.jpg, *.jpeg, *.png are allowed.";
                return callback(err);
            }
        },
    }).single(`avatar`);

    upload(req, res, (err) => {
        if (err) {
            return next(err);
        } else {
            next();
        }
    });
};

module.exports = storageMulter;
