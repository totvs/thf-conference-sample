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
  speakerId: "4"
},
{
  id: "2",
  title: "Basic RESTful API in NodeJS",
  room: "2C",
  startTime: "08:45:00",
  endTime: "09:00:00",
  description: "Basic RESTful API in NodeJS",
  trackId: "2",
  speakerId: "1"
}];

exports.getLecturesResponse = function () {
  totvsResponse.items = lectures;
  return totvsResponse;
}

exports.getLectures = function () {
  return lectures;
}

exports.setLectures = function (lecture) {
  if (lecture) {
    lectures.push(lecture);
  }
}

exports.findLectureById = function (id) {
  return lectures.find(lecture => lecture.id == id);
}

exports.findLectureBySpeakerId = function (speakerId) {
  return lectures.find(lecture => lecture.speakerId == speakerId);
}
