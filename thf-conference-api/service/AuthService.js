'use strict';

const users = require('./UsersService');

/**
 * Endpoint for login in application
 *
 * body UserLogin 
 * returns user
 **/
exports.authLoginPOST = function (userBody) {
  return new Promise(function (resolve, reject) {
    var user = users.userAuthentication(userBody);

    if (user) {
      resolve(user);
    } else {
      reject(400);
    }
  });
}


/**
 * Endpoint for logout in application
 *
 * body UserLogin 
 * no response value expected for this operation
 **/
exports.authLogoutPOST = function (body) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}

