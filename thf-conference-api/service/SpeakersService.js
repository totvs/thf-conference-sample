'use strict';

const lecture = require('./LecturesService');

var totvsResponse = { "hasNext": false, "items": [] };
var speakers = [{
  id: "1",
  name: "Peter Benjamin Parker",
  email: "peter.parker@totvs.com.br",
  photo: "avatar4.png",
  description: "Nodejs developer with 4 years experience",
  lectures: undefined,
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "2",
  name: "Natasha Romanova",
  email: "natasha.romanova@totvs.com.br",
  photo: "avatar2.png",
  description: "Angular developer with 2 years experience",
  lectures: undefined,
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "3",
  name: "Anthony Stark",
  email: "anthony.stark@totvs.com.br",
  photo: "avatar8.png",
  description: "Javascript developer with 8 years experience",
  lectures: undefined,
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "4",
  name: "Carol Danvers",
  email: "carol.danvers@totvs.com.br",
  photo: "avatar3.png",
  description: "Full stack developer with 2 years experience",
  lectures: undefined,
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}];

var findLecturesBySpeaker = function () {
  speakers = speakers.map(speaker => {
    return {
      id: speaker.id,
      name: speaker.name,
      email: speaker.email,
      photo: speaker.photo,
      description: speaker.description,
      lectures: lecture.findLecturesBySpeakerId(speaker.id),
      createdDate: speaker.createdDate,
      updatedDate: speaker.updatedDate,
      deletedDate: speaker.deletedDate,
      deleted: speaker.deleted
    }
  });
};

const findSpeakerById = exports.findSpeakerById = (speakerId) => {
  return speakers.find(speaker => speaker.id == speakerId);
}
/**
 * Load
 *
 * date Date Date.
 * returns speakersResponse
 **/
exports.speakersDiffDateGET = function(date) {
  return new Promise(function(resolve, reject) {
    totvsResponse.items = speakers.filter(speaker => {
      return new Date(speaker.updatedDate) >= new Date(date);
    });

    resolve(totvsResponse);
  });
}

/**
 * Load the list of speakers
 *
 * order String Speakers list ordenation. Should receive field name to ordenate by priorities and separated by commas. To order fields by descendant, the field should start with the sign of \"-\". (optional)
 * diffDate Date Date used to search data that were updated from this date. (optional)
 * returns speakersResponse
 **/
exports.speakersGET = function (order) {
  return new Promise(function (resolve, reject) {
    /* Ordenação
    if (order) {
      totvsResponse.items = speakers;
    }
    */

    findLecturesBySpeaker();
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
    var speaker = findSpeakerById(id);

    if (speaker) {
      speaker.deletedDate = new Date().toISOString();
      speaker.deleted = true;
      resolve();
    } else {
      reject(404);
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
    findLecturesBySpeaker();
    var speaker = findSpeakerById(id);

    if (speaker) {
      resolve(speaker);
    } else {
      reject(404);
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
    var speaker = findSpeakerById(id);

    if (speaker) {
      speaker.lectures = lecture.findLecturesBySpeakerId(speaker.id);
      resolve(speaker);
    } else {
      reject(404);
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
    var speaker = findSpeakerById(id);

    if (speaker) {
      speaker.name = body.name;
      speaker.email = body.email;
      speaker.description = body.description;
      speaker.photo = body.photo;
      speaker.updatedDate = new Date().toISOString();
      
      resolve(speaker);
    } else {
      reject(404);
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
      id: (speakers.length + 1).toString(),
      name: body.name,
      description: body.description,
      photo: body.photo,
      email: body.email,
      deleted: false,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString()
    };
    
    speakers.push(speaker);
    resolve(speaker);
  });
}

