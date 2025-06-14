const express = require("express");
const router = express.Router();
const UpcomingEvent = require('../models/upcomingEvents');
const Student = require("../models/student");
const StudentList = require("../models/studentList");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const {isAdmin} = require("../middleware")
const ImportantDate = require('../models/exam');
const upcomingEvents = require("../models/upcomingEvents");
const studentList = require("../models/studentList");


module.exports.adminLogin = (req,res) => {
    res.render("admin/login.ejs")
}

module.exports.adminAuth = (req, res) => {
    req.flash("success", "Logged in successfully.");

    // 🔐 Role based redirect
    const redirectUrl = req.user.roles.includes("admin")
      ? "/admin/dashboard"
      : res.locals.redirectUrl || "/admin/dashboard";

    res.redirect(redirectUrl);
  }

  module.exports.adminDashboard = async (req, res) => {
  const dates = await ImportantDate.find().sort('date');
  res.render("admin/dashboard", {dates, });
}

module.exports.adminLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully.");
    res.redirect("/");
  });
}

module.exports.addEvent = async (req, res) => {
  try {
    const events = await upcomingEvents.find().sort({ date: 1 });
    res.render('/events-upcoming', { events });
  } catch (error) {
    console.error("Error loading admin events:", error);
    res.status(500).send("Server error");
  }
}

module.exports.addDate = async (req, res) => {
  try {
    const { title, venue, date, subject } = req.body;
    await upcomingEvents.create({ title, venue, date, subject });
    res.redirect('/admin/dashboard'); // go back to admin dashboard
  } catch (err) {
    console.error("Error adding event:", err);
    res.status(500).send("Failed to add event.");
  }
}

module.exports.deleteDate = async (req, res) => {
  await upcomingEvents.findByIdAndDelete(req.params.id);
  res.redirect('/events-upcoming');
}

module.exports.addUsername = async (req, res) => {
  const { username } = req.body;
  await studentList.create({ username });
  res.redirect('/admin/dashboard/show');
}

module.exports.adminShow = async(req, res) => {
  let allUsername = await StudentList.find({}).sort({_id: 1});
  res.render("admin/enrollment.ejs", {allUsername})
}

module.exports.deleteUsername = async (req, res) => {
  const allUsername = await StudentList.findByIdAndDelete(req.params.id);
  res.redirect('/admin/dashboard/show');
}
