const express = require('express');
const router = express.Router();
const ImportantDate = require('../models/exam');
const { isAdmin } = require('../middleware');

module.exports.showdates =async (req, res) => {
  const dates = await ImportantDate.find().sort('date');
  res.render('admin/dashboard', { dates });
}

module.exports.addnew = async (req, res) => {
  const { title, date, labelColor } = req.body;
  await ImportantDate.create({ title, date, labelColor });
  res.redirect('/admin/dashboard');
}

module.exports.editDate = async (req, res) => {
  const { title, date, labelColor } = req.body;
  await ImportantDate.findByIdAndUpdate(req.params.id, { title, date, labelColor });
  res.redirect('/admin/dashboard');
}

module.exports.deletedate = async (req, res) => {
  await ImportantDate.findByIdAndDelete(req.params.id);
  res.redirect('/admin/dashboard');
}