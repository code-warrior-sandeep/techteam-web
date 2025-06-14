const express = require('express');
const router = express.Router();
const ImportantDate = require('../models/exam');
const { isAdmin } = require('../middleware');
const datesController = require("../controllers/dates")



// Show all dates
router.get('/admin/dashboard',isAdmin, datesController.showdates );



// Add new date
router.post('/admin/dashboard/date/add',isAdmin, datesController.addnew );


// Edit date
router.put('/admin/dashboard/',isAdmin, datesController.editDate);

// Delete date
router.delete('/admin/dashboard/date/:id', isAdmin, datesController.deletedate );

module.exports = router;
