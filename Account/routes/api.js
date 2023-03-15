const Router = require("express").Router();
// const authentication = require("../middleware/authentication");
// const { admin } = require("../middleware/authorization");
// const multerUpload = require("../utils/multer");

const { getAccessToken,test,getAllAccount } = require("./modules/test");

/**
 * Test ================================================================
 */
Router.get("/token/getAccessToken", getAccessToken);
Router.get("/token/test", getAllAccount);



module.exports = Router;
