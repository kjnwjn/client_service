const express = require("express");
const router = express.Router();
const { newStudent, studentGetOne, studentGetAll } = require("../controllers/AccountController");

router.get("/get/:id_student", studentGetOne);
router.get("/get-all", studentGetAll);
router.post("/new", newStudent);

module.exports = router;
