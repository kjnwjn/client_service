const AccountService = require("./module/AccountService");
const ClassService = require("./module/ClassService");
const express = require("express");
const router = express.Router();

router.use("/account", AccountService);
router.use("/class", ClassService);

module.exports = router;
