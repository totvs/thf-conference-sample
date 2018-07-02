'use strict';

var totvsResponse = { "hasNext": false, "items": [] };
var conferences = [{
  id: 1,
  title: "THF conference 2018",
  date: "2018-08-11T00:00:00Z",
  location: "Av. Santos Dumont, 831 - Santo Antônio, Joinville - SC",
  description: "Conference organized by THF",
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}];

/**
 * Load the difference of the conferences after informed date
 *
 * date Date Date.
 * returns conferencesResponse
 **/
exports.conferencesDiffDateGET = function(date) {
  return new Promise(function(resolve) {
    totvsResponse.items = conferences.filter(conference => {
      return new Date(conference.updatedDate) >= new Date(date);
    });

    resolve(totvsResponse);
  });
}

/**
 * Load the list of conferences
 *
 * returns conferencesResponse
 **/
exports.conferencesGET = function () {
  return new Promise(function (resolve, reject) {
    totvsResponse.items = conferences;

    resolve(totvsResponse);
  });
}


/**
 * Load an individual conference
 *
 * id String Conference id.
 * returns conference
 **/
exports.conferencesIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    var conference = conferences.find(conf => conf.id == id);

    if (conference) {
      resolve(conference);
    } else {
      reject(404);
    }
  });
}


/**
 * Update a conference
 *
 * id String Conference id.
 * body Conference 
 * returns conference
 **/
exports.conferencesIdPUT = function (id, body) {
  return new Promise(function (resolve, reject) {
    var conference = conferences.find(conf => conf.id == id);

    if (conference) {
      conference.title = body.title;
      conference.date = body.date;
      conference.location = body.location;
      conference.description = body.description;
      conference.updatedDate = new Date().toISOString();

      resolve(conference);
    } else {
      reject(404);
    }
  });
}

