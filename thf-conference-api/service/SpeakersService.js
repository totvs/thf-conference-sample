'use strict';

const lecture = require('./LecturesService');

var totvsResponse = { "hasNext": false, "items": [] };
var speakers = [{
  id: "1",
  name: "NodeJS Developer",
  email: "developer.nodejs@totvs.com.br",
  photo: "image01.jpg",
  description: "Nodejs developer with 4 years experience",
  lectures: undefined,
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "2",
  name: "Angular Developer",
  email: "developer.angular@totvs.com.br",
  photo: "image02.jpg",
  description: "Angular developer with 2 years experience",
  lectures: undefined,
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "3",
  name: "Javascript Developer",
  email: "developer.js@totvs.com.br",
  photo: "image03.jpg",
  description: "Javascript developer with 8 years experience",
  lectures: undefined,
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "4",
  name: "Full Stack Developer",
  email: "developer.fullstack@totvs.com.br",
  photo: "image04.jpg",
  description: "Full stack developer with 2 years experience",
  lectures: undefined,
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}];

var clearLecturesForSpeakers = function () {
  speakers = speakers.map(speaker => {
    return {
      id: speaker.id,
      name: speaker.name,
      email: speaker.email,
      photo: speaker.photo,
      description: speaker.description,
      lectures: undefined,
      createdDate: speaker.createdDate,
      updatedDate: speaker.updatedDate,
      deletedDate: speaker.deletedDate,
      deleted: speaker.deleted
    }
  });
};

/**
 * Load the list of speakers
 *
 * order String Speakers list ordenation. Should receive field name to ordenate by priorities and separated by commas. To order fields by descendant, the field should start with the sign of \"-\". (optional)
 * diffDate Date Date used to search data that were updated from this date. (optional)
 * returns speakersResponse
 **/
exports.speakersGET = function (order, diffDate) {
  return new Promise(function (resolve, reject) {
    /* Ordenação
    if (order) {
      totvsResponse.items = speakers;
    }
    */

    /*
    if (diffDate) {

    }
    */
    clearLecturesForSpeakers();
    totvsResponse.items = speakers;

    resolve(totvsResponse);
  });
}


/**
 * Delete a speaker
 *
 * id BigDecimal Speaker id.
 * no response value expected for this operation
 **/
exports.speakersIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    var speaker = speakers.find(speaker => speaker.id == id);

    if (speaker) {
      speaker.deletedDate = new Date().toISOString();
      speaker.deleted = true;
      resolve();
    } else {
      throw 404;
    }
  });
}


/**
 * Load an individual speaker
 *
 * id BigDecimal Speaker id.
 * returns speaker
 **/
exports.speakersIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    clearLecturesForSpeakers();
    var speaker = speakers.find(speaker => speaker.id == id);

    if (speaker) {
      resolve(speaker);
    } else {
      throw 404;
    }
  });
}


/**
 * Load all lectures by speakers
 *
 * id String Speaker id.
 * returns lecture
 **/
exports.speakersIdLecturesGET = function(id) {
  return new Promise(function(resolve, reject) {
    var speaker = speakers.find(speaker => speaker.id == id);

    if (speaker) {
      speaker.lectures = lecture.findLecturesBySpeakerId(speaker.id);
      resolve(speaker);
    } else {
      throw 404;
    }
  });
}


/**
 * Update a speaker
 *
 * id BigDecimal Speaker id.
 * body Speaker 
 * returns speaker
 **/
exports.speakersIdPUT = function (id, body) {
  return new Promise(function (resolve, reject) {
    var speaker = speakers.find(speaker => speaker.id == id);

    if (speaker) {
      speaker.name = body.name;
      speaker.email = body.email;
      speaker.description = body.description;
      speaker.photo = body.photo;
      speaker.updatedDate = new Date().toISOString();
      
      resolve(speaker);
    } else {
      throw 404;
    }
  });
}


/**
 * Create a new speaker
 *
 * body Speaker 
 * returns speaker
 **/
exports.speakersPOST = function (body) {
  return new Promise(function (resolve, reject) {
    var speaker = {
      "id": (speakers.length + 1).toString(),
      "name": body.name,
      "description": body.description,
      "photo": body.photo,
      "email": body.email,
      "deleted": false,
      "createdDate": new Date().toISOString(),
      "updatedDate": new Date().toISOString()
    };
    
    speakers.push(speaker);
    resolve(speaker);
  });
}

