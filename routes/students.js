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


// GET: Signup form
router.get("/signup", studentsControllers.registrationForm  );

// POST: Signup handler
router.post(
  "/signup",
  upload.single("image"),
  wrapAsync(studentsControllers.postRegistration)
);

// GET: Login form
router.get("/login", studentsControllers.loginForm);

// Login handler
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  studentsControllers.loginHandler
);

// GET: Logout
router.get("/logout", studentsControllers.logout);

// GET: Dashboard by ID
router.get("/student-dashboard/:id", wrapAsync(studentsControllers.getDashboard));


module.exports = router;