const async = require('async');
const nodemailer = require('nodemailer');
const passport = require('passport');
const Mission = require('../models/Mission');

/**
 * GET /mission/:id
 * Mission detail page.
 */
exports.getMission = (req, res) => {
  res.render('mission/detail', {
    title: 'Mission Detail'
  });
};


/**
 * GET /missions
 * Missions list page.
 */
exports.getMissions = (req, res) => {
  Mission.find().exec((err, missions) => {
    if(!err) {

      console.log("missions: " + JSON.stringify(missions));

      res.render('mission/index', {
        title: 'Missions',
        missions
      });
    }

  });


};
