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
const adminControllers = require("../controllers/admin")




router.get("/admin/login", adminControllers.adminLogin )


router.post("/admin/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/admin/login",
    failureFlash: true
  }),
  adminControllers.adminAuth
);


// Admin Dashboard
router.get("/admin/dashboard", isAdmin, adminControllers.adminDashboard );

//logout

router.get("/admin/logout", isAdmin, adminControllers.adminLogout );


// ADD UPCOMING EVENT
router.get('/admin/dashboard', isAdmin, adminControllers.addEvent );

// add date

router.post('/admin/dashboard/',isAdmin, adminControllers.addDate );

// Delete date
router.delete('/admin/dashboard/events/:id', isAdmin, adminControllers.deleteDate );


// Add new username
router.post('/admin/dashboard/add',isAdmin, adminControllers.addUsername);



router.get("/admin/dashboard/show", isAdmin, adminControllers.adminShow  )


router.delete('/admin/dashboard/show/:id', isAdmin, adminControllers.deleteUsername );

module.exports = router;
