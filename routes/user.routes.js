const express = require("express");
const router = express.Router();
//importamos las funciones del controlador y del middleware
const { register, login, isAuth, logout, deleteUser } = require("../auth/jwt");

// router.post("/register", register);
// router.delete("/delete", [isAuth], deleteUser)

router.post("/login/:email", login);
router.post("/logout", [isAuth], logout);

module.exports = router;