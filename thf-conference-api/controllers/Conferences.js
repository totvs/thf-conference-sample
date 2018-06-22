'use strict';

var utils = require('../utils/writer.js');
var Conferences = require('../service/ConferencesService');

module.exports.conferencesDiffDateGET = function conferencesDiffDateGET (req, res, next) {
  const date = req.swagger.params['date'].value;

  Conferences.conferencesDiffDateGET(date)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.conferencesGET = function conferencesGET (req, res, next) {
  Conferences.conferencesGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.conferencesIdGET = function conferencesIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Conferences.conferencesIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      if (response === 404) {
        utils.writeJson(res, "", response);
      } else {
        utils.writeJson(res, response);
      }
    });
};

module.exports.conferencesIdPUT = function conferencesIdPUT (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Conferences.conferencesIdPUT(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      if (response === 404) {
        utils.writeJson(res, "", response);
      } else {
        utils.writeJson(res, response);
      }
    });
};
