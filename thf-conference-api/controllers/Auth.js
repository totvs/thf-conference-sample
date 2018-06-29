'use strict';

const utils = require('../utils/writer.js');
const Auth = require('../service/AuthService');

module.exports.authLoginPOST = function authLoginPOST (req, res, next) {
  const body = req.swagger.params['body'].value;
  
  Auth.authLoginPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      if (response === 400) {
        utils.writeJson(res, "", response);
      } else {
        utils.writeJson(res, response);
      }
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
