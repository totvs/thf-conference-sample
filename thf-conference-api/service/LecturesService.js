'use strict';

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

exports.findLecturesBySpeakerId = function (speakerId) {
  return lectures.filter(lecture => lecture.speakerId == speakerId).map(lecture => {
    return { id: lecture.id, title: lecture.title }
  });
}

/**
 * Load the list of lectures
 *
 * returns lecturesResponse
 **/
exports.lecturesGET = function () {
  return new Promise(function (resolve, reject) {
    totvsResponse.items = lectures;

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
      lecture.deleted = true;
      resolve();
    } else {
      throw 404;
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
      resolve(lecture);
    } else {
      throw 404;
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
      throw 404;
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

