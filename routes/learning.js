const express = require("express");
const router = express.Router();
const Student = require("../models/student")
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const { isLoggedIn } = require("../middleware");
const learningControllers = require("../controllers/learning")


router.get("/learning-resource/bcafirst",isLoggedIn, learningControllers.indextfirst )

router.get("/learning-resource/bcasecond", isLoggedIn, learningControllers.indexsecond)

router.get("/learning-resource/bcathird", isLoggedIn, learningControllers.indexthird )

module.exports = router;