/* Middleware for multer storage upload */
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const jsonResponse = require("./jsonResponse");
cloudinary.config({
    cloud_name: "dofsuykut",
    api_key: "796484688251745",
    api_secret: "UHqigiiWANhqItnT1S3F-bdtOlE",
});

const storageMulter = async (req, res, next) => {
    // const id_user = req.params.id_user;
    if (!req.params.id_user) {
        return jsonResponse({ req, res }).json({
            message: "id_user is required",
        });
    }
    // const id_user = await findById(req.params.id_user);
    const id_user = req.params.id_user;
    if (!id_user) {
        return jsonResponse({ req, res }).json({
            message: "id_user not found",
        });
    }
    const upload = multer({
        storage: multer.diskStorage({
            destination: (req, res, callback) => {
                callback(null, "./public/uploads");
            },
            filename: (req, file, callback) => {
                // const fileName = `${id_user}`;
                callback(null, `${id_user}.png`);
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
