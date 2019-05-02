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

module.exports.authNew_passwordPOST = function authNew_passwordPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Auth.authNew_passwordPOST(body)
    .then(function (response) {
      if (response === 204) {
        utils.writeJson(res, "", response);
      } else {
        utils.writeJson(res, response);
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authRecoveryPOST = function authRecoveryPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Auth.authRecoveryPOST(body)
    .then(function (response) {
      if (response === 204) {
        utils.writeJson(res, "", response);
      } else {
        utils.writeJson(res, response);
      }
    })
    .catch(function (response) {
      if (response === 404) {
        const error_message = {
          code: '404',
          message: 'Invalid email'
        }
        utils.writeJson(res, error_message, response);
      } else {
        utils.writeJson(res, response);
      }
    });
};
