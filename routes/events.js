const express = require("express");
const router = express.Router();
const Student = require("../models/student")
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const { isLoggedIn } = require("../middleware");
const UpcomingEvent = require("../models/upcomingEvents");
const upcomingEvents = require("../models/upcomingEvents");
const eventsControllers = require("../controllers/events")


router.get("/events-upcoming",  eventsControllers.upcoming );

router.get("/events-registration", isLoggedIn, eventsControllers.eventRegistration)


router.get("/events-past", eventsControllers.past)

module.exports = router;