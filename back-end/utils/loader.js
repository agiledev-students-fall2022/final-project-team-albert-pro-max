require("./db");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const Course = mongoose.model("Course");

const filePath = path.resolve("mockdata/Econ.json");

fs.readFile(filePath, (err, jsonString) => {
  if (err) {
    console.log("[ERROR]: File read failed", err);
    return;
  }

  const data = JSON.parse(jsonString);

  for (const info of data) {
    const course = new Course({
      school_name: info.school_name, // College of Arts and Science
      department_name: info.department_name, // Computer Science
      department_code: info.department_code, // CSCI-UA
      course_number: info.course_number, // 2
      course_name: info.course_name, // Introduction to Computer Programming (No Prior Experience)
      course_description: info.course_description,
      units: info.units, // 4
      class_number: info.class_number, // 7441
      session: info.session, // 1 01/23/2023 - 05/08/2023
      section_number: info.section_number, // 001
      class_status: info.class_status, // Wait List (0)
      instruction_mode: info.instruction_mode, // In-Person
      component: info.component, // Lecture
      location: info.location, // Washington Square
      building: info.building, // 19 University Place
      room: info.room, // Room 102
      day: info.day, // Mon,Wed
      time: info.time, // 4:55 PM - 6:10 PM
      instructor: info.instructor, // ["Kapp, Craig", "Bhat, Atharv", "Malepati, Sachin"]
      rating: info.rating, // 4.26
      syllabus: info.syllabus, // <SOME_URL>
    });

    course.save(function (err, saveResult) {
      if (err) {
        console.log("[ERROR]: Save record error", err);
        return;
      }
      console.log(`[INFO] Saved schedule id: ${saveResult._id}`);
    });
  }
});
