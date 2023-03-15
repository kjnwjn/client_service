const Router = require("express").Router();
// const authentication = require("../middleware/authentication");
// const { admin } = require("../middleware/authorization");
// const multerUpload = require("../utils/multer");

const { createNewStudent } = require("./modules/student");
const { getAccessToken, test, getAllAccount } = require("./modules/test");
/**
 * Account ================================================================
 */
Router.post("/student/create-new", createNewStudent);

/**
 * Test ================================================================
 */
Router.get("/token/getAccessToken", getAccessToken);
Router.get("/token/test", getAllAccount);

module.exports = Router;
