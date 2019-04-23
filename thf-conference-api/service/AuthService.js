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

      retryBasic = (retryBasic === 0) ? 3 : retryBasic--;

      let resultError = {
        code: '400',
        message: 'Oops! Auto login failed. Please enter your username and password to log in.',
        detailedMessage: 'Invalid credentials',
        maxAttemptsRemaining: retryBasic,
        loginWarnings: ['Invalid user and/or password'],
        passwordWarnings: ['Invalid user and/or password'],
        blockedUrl: 'https://thf.totvs.com.br/documentation/thf-page-blocked-user'
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

