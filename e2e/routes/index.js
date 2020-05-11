const express = require('express');
const router = express.Router();
/* GET home page. */
const UserController = require("../controllers/UserController");

router.post("/auth/register", UserController.register)
module.exports = router;
