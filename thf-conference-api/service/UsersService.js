'use strict';

var totvsResponse = { "hasNext": false, "items": [] };
var users = [{
  id: "1",
  username: "admin",
  password: "admin",
  isSuperUser: true,
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}];

/**
 * Load the list of users
 *
 * returns usersResponse
 **/
exports.usersGET = function () {
  return new Promise(function (resolve, reject) {
    totvsResponse.items = users;

    resolve(totvsResponse);
  });
}


/**
 * Delete a user
 *
 * id BigDecimal User id.
 * no response value expected for this operation
 **/
exports.usersIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    var user = users.find(user => user.id == id);

    if (user) {
      user.deletedDate = new Date().toISOString();
      user.deleted = true;
      resolve();
    } else {
      throw 404;
    }
  });
}


/**
 * Load an individual user
 *
 * id BigDecimal User id.
 * returns user
 **/
exports.usersIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    var user = users.find(user => user.id == id);

    if (user) {
      resolve(user);
    } else {
      throw 404;
    }
  });
}


/**
 * Update a user
 *
 * id BigDecimal User id.
 * body User 
 * returns user
 **/
exports.usersIdPUT = function (id, body) {
  return new Promise(function (resolve, reject) {
    var user = users.find(user => user.id == id);

    if (user) {
      user.username = body.username;
      user.password = body.password;
      user.isSuperUser = body.isSuperUser;
      user.updatedDate = new Date().toISOString();
      
      resolve(user);
    } else {
      throw 404;
    }
  });
}


/**
 * Create a new user
 *
 * body User 
 * returns user
 **/
exports.usersPOST = function (body) {
  return new Promise(function (resolve, reject) {
    var user = {
      id: (users.length + 1).toString(),
      username: body.username,
      password: body.password,
      isSuperUser: false,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      deleted: false
    };
    
    users.push(user);
    resolve(user);
  });
}

