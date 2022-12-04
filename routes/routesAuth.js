const express = require("express");
const router = express.Router();

const AuthAPI = require("../controllers/AuthController");
const authenticate = require("../middleware/authenticate");

router.post("/register", AuthAPI.register);
router.post("/login", AuthAPI.login);
router.post("/refresh-token", AuthAPI.refreshToken);
router.get("/user", authenticate, AuthAPI.getUser);

module.exports = router;
