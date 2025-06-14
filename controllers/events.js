const express = require("express");
const router = express.Router();
const Student = require("../models/student")
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const { isLoggedIn } = require("../middleware");
const UpcomingEvent = require("../models/upcomingEvents");
const upcomingEvents = require("../models/upcomingEvents");

module.exports.upcoming = async (req, res) => {
    try {
        const events = await upcomingEvents.find().sort({ date: 1 }); // Sort by upcoming date
        res.render("events/upcoming.ejs", { events });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send("Server error");
    }
}

module.exports.past =  (req, res) => {
    res.render("events/registration.ejs")
}
module.exports.eventRegistration = (req, res) => {
    res.render("events/pastevents.ejs")
}