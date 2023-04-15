const express = require("express");
const router = express.Router();
const { classCreateNew, classGetOne, classGetAll, updateClassData } = require("../controllers/ClassController");
const { studentCreateNew, studentGetOne, studentGetAll, updateStudentData } = require("../controllers/AccountController");
const { userCreateNew, userGetOne, userGetAll, updateUserData } = require("../controllers/UserController");
const { facultyGetOne, facultyGetAll, facultyCreateNew } = require("../controllers/FacultyController");
const multerUpload = require("../utils/multer");
// STUDENT
router.get("/student/get/:id_student", studentGetOne);
router.get("/student/get-all", studentGetAll);
router.post("/student/new", studentCreateNew);
router.patch("/student/:id_student", updateStudentData);
// --------------------------------------

// CLASS
router.get("/class/get/:id_class", classGetOne);
router.post("/class/new", classCreateNew);
router.get("/class/get-all", classGetAll);
router.patch("/class/:id_class", updateClassData);
// --------------------------------------

// USER
router.get("/user/get/:id_user", userGetOne);
router.get("/user/get-all", userGetAll);
router.post("/user/new", userCreateNew);
router.patch("/user/:id_user", updateUserData);
// --------------------------------------

// FACULTY
router.get("/faculty/get/:id_faculty", facultyGetOne);
router.get("/faculty/get-all", facultyGetAll);
router.post("/faculty/new", facultyCreateNew);
// --------------------------------------

// TEST
router.post("/test/upload/:id_student", multerUpload, (req, res, next) => {
    /*
          #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['avatar'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
              description: 'Some description...',
        } 
        */
    const file = req.file || null;
    console.log("🚀 ~ file: api.js:39 ~ Router.post ~ req:", file);
    res.end("Upload test");
});

module.exports = router;
