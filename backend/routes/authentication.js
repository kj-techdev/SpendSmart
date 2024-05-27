const { login, register } = require("../controllers/authentication");

const router = require("express").Router();

router.post("/login", login).post("/register", register);

module.exports = router;
