const express = require("express");
const router = express.Router();
const { studentCreateNew, studentGetOne, studentGetAll, studentUpdatePassword, updateStudentData } = require("../../controllers/AccountController");

router.get("/get/:id_student", studentGetOne);
router.get("/get-all", studentGetAll);
router.post("/new", studentCreateNew);
router.post("/change-password", studentUpdatePassword);
router.patch("/:id_student", updateStudentData);

module.exports = router;
