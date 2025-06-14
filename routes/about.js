const express = require("express");
const router = express.Router();
const Student = require("../models/student")
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const { isLoggedIn } = require("../middleware");


router.get("/about", (req, res) => {
    res.render("about.ejs")
})


module.exports = router