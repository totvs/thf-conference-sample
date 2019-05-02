'use strict';

const atob = require('atob');
const users = require('./UsersService');

let retryBasic = 3;

/**
 * Endpoint for login in application
 *
 * authorization String 
 * body LoginForm 
 * returns loginSuccess
 **/
exports.authLoginPOST = function(authorization,body) {
  return new Promise(function(resolve, reject) {
    let codeUser = authorization.split(' ');
    let decodeUser = atob(codeUser[1]).replace('(', '').replace(')', '');
    let userObj = { username: decodeUser.split(':')[0], password: decodeUser.split(':')[1] };

    let user = users.userAuthentication(userObj);    

    if (user) {
      resolve(user);
    } else {
      if (retryBasic === 0) {
        retryBasic = 3
      } else {
        retryBasic--
      }

      let resultError = {
        code: '400',
        message: 'Oops! Auto login failed. Please enter your username and password to log in.',
        detailedMessage: 'Invalid credentials',
        maxAttemptsRemaining: retryBasic,
        loginWarnings: ['Invalid user and/or password'],
        passwordWarnings: ['Invalid user and/or password'],
        blockedUrl: '/access-denied'
      };

      reject(resultError);
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

/**
 * Endpoint para cadastro de nova senha
 *
 * body New_password 
 * no response value expected for this operation
 **/
exports.authNew_passwordPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve(204);
  });
}


/**
 * Endpoint for password recovery
 *
 * body PasswordRecovery 
 * no response value expected for this operation
 **/
exports.authRecoveryPOST = function(body) {
  return new Promise(function(resolve, reject) {
    const mail = body.email;
    const retry = body.retry || 0;
    if (mail === 'mail@mail.com') {
      resolve(204);
    } else {
      reject(404);
    }
  });
}
