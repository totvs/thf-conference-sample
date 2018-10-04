'use strict';

const tracks = require('./TracksService');
const speakers = require('./SpeakersService');

var lecturesCount = { "length": undefined };
var totvsResponse = { "hasNext": false, "items": [] };
var lectures = [{
  id: "1",
  title: "Unit testing for beginners",
  room: "2B",
  startTime: "08:30:00",
  endTime: "08:45:00",
  description: "Unit testing for beginners",
  trackId: "3",
  speakerId: "2",
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "2",
  title: "Basic RESTful API in NodeJS",
  room: "2C",
  startTime: "08:45:00",
  endTime: "09:00:00",
  description: "Basic RESTful API in NodeJS",
  trackId: "2",
  speakerId: "1",
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}, {
  id: "3",
  title: "Ionic - get started",
  room: "2C",
  startTime: "09:00:00",
  endTime: "09:30:00",
  description: "Ionic - get started",
  trackId: "4",
  speakerId: "2",
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deletedDate: undefined,
  deleted: false
}];

const lectureWithRelationship = (lecture) => {
  return {
    id: lecture.id,
    title: lecture.title,
    room: lecture.room,
    startTime: lecture.startTime,
    endTime: lecture.endTime,
    description: lecture.description,
    track: tracks.findTrackById(lecture.trackId),
    speaker: speakers.findSpeakerById(lecture.speakerId),
    createdDate: lecture.createdDate,
    updatedDate: lecture.updatedDate,
    deletedDate: lecture.deletedDate,
    deleted: lecture.deleted
  }
}

const findLecturesGroupRelationship =  () => {
  return lectures.map(lecture => lectureWithRelationship(lecture));
};

exports.findLecturesBySpeakerId = function (speakerId) {
  return lectures.filter(lecture => lecture.speakerId == speakerId).map(lecture => {
    return { id: lecture.id, title: lecture.title }
  });
}

/**
 * Count a lectures number
 *
 * returns BigDecimal
 **/
exports.lecturesCountGET = function() {
  return new Promise(function(resolve, reject) {
    if (lectures) {
      lecturesCount.length = lectures.length;
      resolve(lecturesCount);
    } else {
      reject(500);
    }
  });
}

/**
 * Load the difference of the lectures after informed date
 *
 * date Date Date.
 * returns lecturesResponse
 **/
exports.lecturesDiffDateGET = function(date) {
  return new Promise(function(resolve, reject) {
    const lectures = findLecturesGroupRelationship();

    totvsResponse.items = lectures.filter(lecture => {
      return new Date(lecture.updatedDate) >= new Date(date);
    });

    resolve(totvsResponse);
  });
}

/**
 * Load the list of lectures
 *
 * returns lecturesResponse
 **/
exports.lecturesGET = function () {
  return new Promise(function (resolve, reject) {
    totvsResponse.items = findLecturesGroupRelationship();

    resolve(totvsResponse);
  });
}


/**
 * Delete a lecture
 *
 * id BigDecimal Lecture id.
 * no response value expected for this operation
 **/
exports.lecturesIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    var lecture = lectures.find(lecture => lecture.id == id);

    if (lecture) {
      lecture.deletedDate = new Date().toISOString();
      lecture.updatedDate = lecture.deletedDate;
      lecture.deleted = true;
      resolve();
    } else {
      reject(404);
    }
  });
}


/**
 * Load an individual lecture
 *
 * id BigDecimal Lecture id.
 * returns lecture
 **/
exports.lecturesIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    var lecture = lectures.find(lecture => lecture.id == id);

    if (lecture) {
      resolve(lectureWithRelationship(lecture));
    } else {
      reject(404);
    }
  });
}


/**
 * Update a lecture
 *
 * id BigDecimal Lecture id.
 * body Lecture 
 * returns lecture
 **/
exports.lecturesIdPUT = function (id, body) {
  return new Promise(function (resolve, reject) {
    var lecture = lectures.find(lecture => lecture.id == id);

    if (lecture) {
      lecture.title = body.title;
      lecture.description = body.description;
      lecture.room = body.room;
      lecture.startTime = body.startTime;
      lecture.endTime = body.endTime;
      lecture.trackId = body.trackId;
      lecture.speakerId = body.speakerId;
      lecture.updatedDate = new Date().toISOString();

      resolve(lecture);
    } else {
      reject(404);
    }
  });
}


/**
 * Create a new lecture
 *
 * body Lecture 
 * returns lecture
 **/
exports.lecturesPOST = function (body) {
  return new Promise(function (resolve, reject) {

    var lecture = {
      id: (lectures.length + 1).toString(),
      trackId: body.trackId,
      description: body.description,
      startTime: body.startTime,
      speakerId: body.speakerId,
      endTime: body.endTime,
      title: body.title,
      room: body.room,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      deleted: false
    };

    lectures.push(lecture);
    resolve(lecture);
  });
}

