'use strict';

var utils = require('../utils/writer.js');
var Tracks = require('../service/TracksService');

module.exports.tracksGET = function tracksGET (req, res, next) {
  Tracks.tracksGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tracksIdDELETE = function tracksIdDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  Tracks.tracksIdDELETE(id)
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

module.exports.tracksIdGET = function tracksIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Tracks.tracksIdGET(id)
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

module.exports.tracksIdPUT = function tracksIdPUT (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Tracks.tracksIdPUT(id,body)
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

module.exports.tracksPOST = function tracksPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Tracks.tracksPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
