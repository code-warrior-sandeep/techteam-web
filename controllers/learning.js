const express = require("express");
const router = express.Router();
const Student = require("../models/student")
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const { isLoggedIn } = require("../middleware");


module.exports.indextfirst = (req, res) => {

    res.render("learning/first.ejs")
}

module.exports.indexsecond = (req, res) => {
    res.render("learning/second.ejs")
}
module.exports.indexthird = (req, res) => {
    res.render("learning/third.ejs")
}