const express = require("express");
const router = express.Router();
const testControllers = require("../controllers/testControllers")

router.route("/").get(testControllers.getTest)

module.exports = router
