const router = require("express").Router();
const userController = require("../Controller/userController");

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.get("/getuser/:id", userController.getUser);

module.exports = router;
