'use strict';

var utils = require('../utils/writer.js');
var Speakers = require('../service/SpeakersService');

module.exports.speakersCountGET = function speakersCountGET (req, res, next) {
  Speakers.speakersCountGET()
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

module.exports.speakersDiffDateGET = function speakersDiffDateGET (req, res, next) {
  var date = req.swagger.params['date'].value;
  Speakers.speakersDiffDateGET(date)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.speakersGET = function speakersGET (req, res, next) {
  var order = req.swagger.params['order'].value;
  var diffDate = req.swagger.params['diffDate'].value;

  Speakers.speakersGET(order,diffDate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.speakersIdDELETE = function speakersIdDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;

  Speakers.speakersIdDELETE(id)
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

module.exports.speakersIdGET = function speakersIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Speakers.speakersIdGET(id)
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

module.exports.speakersIdLecturesGET = function speakersIdLecturesGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Speakers.speakersIdLecturesGET(id)
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

module.exports.speakersIdPUT = function speakersIdPUT (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Speakers.speakersIdPUT(id,body)
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

module.exports.speakersPOST = function speakersPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Speakers.speakersPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
