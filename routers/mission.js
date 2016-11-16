var express = require('express');
var Mission = require('../models/Mission');

var missionRouter = express.Router();

missionRouter
  .route('/missions')
  .post(function (request, response) {
    console.log('POST /missions');

    var mission = new Mission(request.body);
    mission.save(function(error, mission) {
      if (error) {
        response.status(500).send(error);
        return;
      } else {
        response.status(201).send(mission);
      }
    });
  })
  .get(function (request, response) {
    console.log('GET /missions');

    Mission.find(function (error, missions) {
      if (error) {
        response.status(500).send(error);
        return;
      }
      response.json(missions);
    });
  });

missionRouter
  .route('/missions/:id')
  .get(function (request, response) {
    console.log('GET /missions/:id');

    var missionId = request.params.id;
    Mission.findOne({ _id: missionId }, function (error, mission) {
      if (error) {
        response.status(500).send(error);
        return;
      }

      response.json(mission);
    });
  })
  .put(function (request, response) {
    console.log('PUT /missions/:id');

    var missionId = request.params.id;
    Mission.findOne({ _id: missionId }, function (error, mission) {
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (mission) {
        mission.title = request.body.title;
        mission.description = request.body.description;

        mission.save(function(error, mission) {
          if (error) {
            response.status(500).send(error);
            return;
          } else {
            response.json(mission);
            return;
          }
        });
      } else {
        response.status(404).json({
          message: 'Mission with id ' + missionId + ' was not found.'
        });
      }
    });
  })
  .patch(function (request, response) {
    console.log('PATCH /missions/:id');

    var missionId = request.params.id;
    Mission.findOne({ _id: missionId }, function (error, mission) {
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (mission) {
        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof mission[property] !== 'undefined') {
              mission[property] = request.body[property];
            }
          }
        }

        // if (request.body.name) {
        //   mission.name = request.body.name;
        // }

        // if (request.body.description) {
        //   mission.description = request.body.description;
        // }

        // if (request.body.quantity) {
        //   mission.quantity = request.body.quantity;
        // }

        mission.save(function(error, mission) {
          if (error) {
            response.status(500).send(error);
            return;
          } else {
            response.json(mission);
            return;
          }
        });
      }

      response.status(404).json({
        message: 'Mission with id ' + missionId + ' was not found.'
      });
    });
  })
  .delete(function (request, response) {
    console.log('DELETE /missions/:id');

    var missionId = request.params.id;
    Mission.findOne({ _id: missionId }, function (error, mission) {
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (mission) {
        mission.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'Mission with id ' + missionId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Mission with id ' + missionId + ' was not found.'
        });
      }
    });
  });

module.exports = missionRouter;
