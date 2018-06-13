'use strict';

const note = require('./NotesService');

var totvsResponse = { "hasNext": false, "items": [] };
var users = [{
  id: "1",
  username: "admin",
  password: "admin",
  isSuperUser: true,
  notes: undefined,
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "2",
  username: "dev",
  password: "totvs",
  isSuperUser: false,
  notes: undefined,
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}];

var clearNotesForUsers = function () {
  users = users.map(user => {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      isSuperUser: user.isSuperUser,
      notes: undefined,
      createdDate: user.createdDate,
      updatedDate: user.updatedDate,
      deletedDate: user.deletedDate,
      deleted: user.deleted
    }
  });
};

/**
 * Load the list of users
 *
 * returns usersResponse
 **/
exports.usersGET = function () {
  return new Promise(function (resolve, reject) {
    clearNotesForUsers();
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
    clearNotesForUsers();
    var user = users.find(user => user.id == id);

    if (user) {
      resolve(user);
    } else {
      throw 404;
    }
  });
}


/**
 * Load all notes by users
 *
 * id String User id.
 * returns user
 **/
exports.usersIdNotesGET = function (id) {
  return new Promise(function (resolve, reject) {
    var user = users.find(user => user.id == id);

    if (user) {
      user.notes = note.findNotesByUserId(user.id);
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

