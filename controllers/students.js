const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const StudentList = require("../models/studentList");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const { storage } = require("../cloudConfig");
const studentsControllers  = require("../controllers/students")
const multer = require("multer");
const upload = multer({
  storage,
  limits: { fileSize: 250 * 1024 }, // 250 KB
});


module.exports.registrationForm = (req, res) => {
  res.render("students/signup.ejs");
};


module.exports.postRegistration = async (req, res, next) => {
    let url = "/images/dummy.png"; // Default image
    let filename = "";

    if (req.file) {
      url = req.file.path || req.file.secure_url; // Cloudinary support
      filename = req.file.filename;
    }

    const { username, name, email, password, rollNumber, semester, roles } =
      req.body;

    const validStudent = await StudentList.findOne({ username });
    if (!validStudent) {
      req.flash("error", "Username Not Found!! Please Contact Us and Get Your User Name");
      return res.redirect("/signup");
    }

    const existingStudent = await Student.findOne({ username });
    if (existingStudent) {
      req.flash("error", "Username already registered. Please Contact Us and Get Your New User Name ");
      return res.redirect("/signup");
    }

    const newStudent = new Student({
      email,
      name,
      username,
      rollNumber,
      semester,
      roles,
      image: { url, filename },
    });

    const registeredStudent = await Student.register(newStudent, password);

    req.login(registeredStudent, (err) => {
      if (err) return next(err);
      req.flash("success", "User registered successfully.");
      res.render("students/dashboard.ejs", {
        studentData: registeredStudent,
      });
    });
  }

  module.exports.loginForm =  (req, res) => {
  res.render("students/login.ejs");
}


module.exports.loginHandler = async (req, res) => {
    req.flash("success", "Logged in successfully.");

    // Find current student to render dashboard
    const student = await Student.findOne({ username: req.user.username });

    if (!student) {
      req.flash("error", "Student record not found.");
      return res.redirect("/");
    }

     res.redirect("/");
  }

  module.exports.logout = (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      req.flash("success", "Logged out successfully.");
      res.redirect("/");
    });
  }

  module.exports.getDashboard = async (req, res) => {
  const { id } = req.params;
  const studentData = await Student.findById(id);
  
  if (!studentData) {
    req.flash("error", "Your requested profile was not found.");
    return res.redirect("/");
  }

  res.render("students/dashboard.ejs", { studentData });
}