'use strict';

const utils = require('../utils/writer.js');
const Auth = require('../service/AuthService');

module.exports.authLoginPOST = function authLoginPOST (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var body = req.swagger.params['body'].value;

  Auth.authLoginPOST(authorization,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, Number(response.code));
    });
};

module.exports.authLogoutPOST = function authLogoutPOST (req, res, next) {
  const body = req.swagger.params['body'].value;
  Auth.authLogoutPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
