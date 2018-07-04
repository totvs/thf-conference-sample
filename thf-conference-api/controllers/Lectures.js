'use strict';

var utils = require('../utils/writer.js');
var Lectures = require('../service/LecturesService');

module.exports.lecturesCountGET = function lecturesCountGET (req, res, next) {
  Lectures.lecturesCountGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      if (response === 500) {
        utils.writeJson(res, "", response);
      } else {
        utils.writeJson(res, response);
      }
    });
};

module.exports.lecturesDiffDateGET = function lecturesDiffDateGET (req, res, next) {
  const date = req.swagger.params['date'].value;

  Lectures.lecturesDiffDateGET(date)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.lecturesGET = function lecturesGET (req, res, next) {
  Lectures.lecturesGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.lecturesIdDELETE = function lecturesIdDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  Lectures.lecturesIdDELETE(id)
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

module.exports.lecturesIdGET = function lecturesIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Lectures.lecturesIdGET(id)
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

module.exports.lecturesIdPUT = function lecturesIdPUT (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Lectures.lecturesIdPUT(id,body)
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

module.exports.lecturesPOST = function lecturesPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Lectures.lecturesPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
