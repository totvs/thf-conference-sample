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

var findNotesForUsers = function () {
  users = users.map(user => {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      isSuperUser: user.isSuperUser,
      notes: note.findNotesByUserId(user.id),
      createdDate: user.createdDate,
      updatedDate: user.updatedDate,
      deletedDate: user.deletedDate,
      deleted: user.deleted
    }
  });
};

exports.userAuthentication = (userLogin) => {
  return users.find(user => (user.username === userLogin.username && user.password === userLogin.password));
}

/**
 * Load
 *
 * date Date Date.
 * returns usersResponse
 **/
exports.usersDiffDateGET = function(date) {
  return new Promise(function(resolve) {
    findNotesForUsers();

    const isUpdatedNote = (notes, date) => {
      return notes.some(note => new Date(note.updatedDate) >= new Date(date))
    }

    totvsResponse.items = users.filter(user => {
      const updatedUser = new Date(user.updatedDate) >= new Date(date);
      const updatedNotes = isUpdatedNote(user.notes, date);

      return updatedNotes || updatedUser;
    });

    resolve(totvsResponse);
  });
}

/**
 * Load the list of users
 *
 * returns usersResponse
 **/
exports.usersGET = function () {
  return new Promise(function (resolve, reject) {
    findNotesForUsers();
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
      user.updatedDate = user.deletedDate;
      user.deleted = true;
      resolve();
    } else {
      reject(404);
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
    findNotesForUsers();
    var user = users.find(user => user.id == id);

    if (user) {
      resolve(user);
    } else {
      reject(404);
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
      reject(404);
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
      reject(404);
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

