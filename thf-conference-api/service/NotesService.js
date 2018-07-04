'use strict';

var notesCount = { "length": undefined };
var totvsResponse = { "hasNext": false, "items": [] };
var notes = [{
  id: "1",
  title: "Basic RESTful API in NodeJS",
  text: "Note of Basic RESTful API in NodeJS",
  lectureId: "2",
  userId: "2",
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "2",
  title: "Unit testing for beginners",
  text: "Note of unit testing for beginners",
  lectureId: "1",
  userId: "2",
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}];

exports.findNotesByUserId = function (userId) {
  return notes.filter(note => note.userId == userId);
}

/**
 * Count a notes number
 *
 * returns BigDecimal
 **/
exports.notesCountGET = function() {
  return new Promise(function(resolve, reject) {
    if (notes) {
      notesCount.length = notes.length;
      resolve(notesCount);
    } else {
      reject(500);
    }
  });
}

/**
 * Load the difference of the notes after informed date
 *
 * date Date Date.
 * returns notesResponse
 **/
exports.notesDiffDateGET = function(date) {
  return new Promise(function(resolve) {
    totvsResponse.items = notes.filter(note => {
      return new Date(note.updatedDate) >= new Date(date);
    });
    resolve(totvsResponse)
  });
}


/**
 * Load the list of notes
 *
 * returns notesResponse
 **/
exports.notesGET = function () {
  return new Promise(function (resolve, reject) {
    totvsResponse.items = notes;

    resolve(totvsResponse);
  });
}


/**
 * Delete a note
 *
 * id BigDecimal Note id.
 * no response value expected for this operation
 **/
exports.notesIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    var note = notes.find(note => note.id == id);

    if (note) {
      note.deletedDate = new Date().toISOString();
      note.updatedDate = note.deletedDate;
      note.deleted = true;
      resolve();
    } else {
      reject(404);
    }
  });
}


/**
 * Load an individual note
 *
 * id BigDecimal Note id.
 * returns note
 **/
exports.notesIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    var note = notes.find(note => note.id == id);

    if (note) {
      resolve(note);
    } else {
      reject(404);
    }
  });
}


/**
 * Update a note
 *
 * id BigDecimal Note id.
 * body Note 
 * returns note
 **/
exports.notesIdPUT = function (id, body) {
  return new Promise(function (resolve, reject) {
    var note = notes.find(note => note.id == id);

    if (note) {
      note.text = body.text;
      note.title = body.title;
      note.lectureId = body.lectureId;
      note.userId = body.userId;
      note.updatedDate = new Date().toISOString();
      
      resolve(note);
    } else {
      reject(404);
    }
  });
}


/**
 * Create a new note
 *
 * body Note 
 * returns note
 **/
exports.notesPOST = function (body) {
  return new Promise(function (resolve, reject) {
    var note = {
      id: (notes.length + 1).toString(),
      title: body.title,
      text: body.text,
      lectureId: body.lectureId,
      userId: body.userId,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      deleted: false
    }

    notes.push(note);
    resolve(note);
  });
}
