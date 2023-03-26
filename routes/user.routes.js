const express = require("express");
const router = express.Router();
//importamos las funciones del controlador y del middleware
const { login, isAuth, logout } = require("../auth/jwt");

// router.post("/register", register);
// router.delete("/delete", [isAuth], deleteUser)

router.post("/login/:entity/:email", login);
router.post("/logout", [isAuth], logout);

module.exports = router;