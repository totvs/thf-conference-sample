'use strict';

var tracksCount = { "length": undefined };
var totvsResponse = { "hasNext": false, "items": [] };
var tracks = [{
  id: "1",
  name: "Javascript",
  color: "#240115",
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "2",
  name: "NodeJS",
  color: "#DE3C4B",
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "3",
  name: "Tests",
  color: "#8c6990",
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "4",
  name: "Mobile",
  color: "#F78764",
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "5",
  name: "Devops",
  color: "#CEC3C1",
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}];

const findTrackById = exports.findTrackById = function (id) {
  return tracks.find(track => track.id == id);
}

/**
 * Count a tracks number
 *
 * returns BigDecimal
 **/
exports.tracksCountGET = function() {
  return new Promise(function(resolve, reject) {
    if (tracks) {
      tracksCount.length = tracks.length;
      resolve(tracksCount);
    } else {
      reject(500);
    }
  });
}

/**
 * Load the difference of the tracks after informed date
 *
 * date Date Date.
 * returns tracksResponse
 **/
exports.tracksDiffDateGET = function(date) {
  return new Promise(function(resolve, reject) {
    totvsResponse.items = tracks.filter(track => {
      return new Date(track.updatedDate) >= new Date(date);
    });
    resolve(totvsResponse)
  });
}

/**
 * Load the list of Tracks
 *
 * returns tracksResponse
 **/
exports.tracksGET = function () {
  return new Promise(function (resolve) {
    totvsResponse.items = tracks;

    resolve(totvsResponse);
  });
}


/**
 * Delete a track
 *
 * id BigDecimal Track id.
 * no response value expected for this operation
 **/
exports.tracksIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    var track = findTrackById(id);

    if (track) {
      track.deletedDate = new Date().toISOString();
      track.updatedDate = track.deletedDate;
      track.deleted = true;
      resolve();
    } else {
      reject(404);
    }
  });
}


/**
 * Load an individual track
 *
 * id BigDecimal Track id.
 * returns track
 **/
exports.tracksIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    var track = findTrackById(id);

    if (track) {
      resolve(track);
    } else {
      reject(404);
    }
  });
}


/**
 * Update a track
 *
 * id BigDecimal Track id.
 * body Track 
 * returns track
 **/
exports.tracksIdPUT = function (id, body) {
  return new Promise(function (resolve, reject) {
    var track = findTrackById(id);

    if (track) {
      track.color = body.color;
      track.name = body.name;
      track.updatedDate = new Date().toISOString();

      resolve(track);
    } else {
      reject(404);
    }
  });
}


/**
 * Create a new track
 *
 * body Track 
 * returns track
 **/
exports.tracksPOST = function (body) {
  return new Promise(function (resolve, reject) {
    var track = {
      id: (tracks.length + 1).toString(),
      color: body.color,
      name: body.name,
      deleted: false,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };

    tracks.push(track);
    resolve(track);
  });
}

