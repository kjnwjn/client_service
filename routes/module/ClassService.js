const express = require("express");
const router = express.Router();
const { classCreateNew, classGetOne, classGetAll, updateClassData } = require("../../controllers/ClassController");

router.get("/get/:id_class", classGetOne);
router.post("/new", classCreateNew);
router.get("/get-all", classGetAll);
router.patch("/:id_class", updateClassData);

module.exports = router;
