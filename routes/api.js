const express = require("express");
const router = express.Router();
const { classCreateNew, classGetOne, classGetAll, updateClassData } = require("../controllers/ClassController");
const { studentCreateNew, studentGetOne, studentGetAll, studentUpdatePassword, updateStudentData } = require("../controllers/AccountController");
const { userCreateNew, userGetOne, userGetAll, updateUserData } = require("../controllers/UserController");

// STUDENT
router.get("/account/get/:id_student", studentGetOne);
router.get("/account/get-all", studentGetAll);
router.post("/account/new", studentCreateNew);
router.post("/account/change-password", studentUpdatePassword);
router.patch("/account/:id_student", updateStudentData);
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
// router.post("/user/change-password", userUpdatePassword);
router.patch("/user/:id_user", updateUserData);
// --------------------------------------

module.exports = router;
