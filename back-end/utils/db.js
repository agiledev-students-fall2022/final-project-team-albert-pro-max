const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();

const User = new mongoose.Schema({
    // username, password
    avatar: { type: String, required: true },
    email: { type: String, required: true },
    cart: [{
        course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        recitation: { type: mongoose.Schema.Types.ObjectId, ref: 'Recitation' },
        watch: { type: Boolean, required: true },
        show: { type: Boolean, required: true },
    }]
});

const Course = new mongoose.Schema({
    school_name: { type: String, required: true }, // College of Arts and Science
    department_name: { type: String, required: true }, // Computer Science
    department_code: { type: String, required: true }, // CSCI-UA
    course_number: { type: String, required: true }, // 2
    course_name: { type: String, required: true }, // Introduction to Computer Programming (No Prior Experience)
    course_description: { type: String, required: false },
    units: { type: String, required: false }, // 4
    class_number: { type: String, required: true }, // 7441
    session: { type: String, required: true }, // 1 01/23/2023 - 05/08/2023
    section_number: { type: String, required: true }, // 001
    class_status: { type: String, required: true }, // Wait List (0)
    instruction_mode: { type: String, required: true }, // In-Person
    component: { type: String, required: true }, // Lecture
    location: { type: String, required: false }, // Washington Square
    building_room: { type: String, required: false }, // 19 University Place Room 102
    days: { type: String, required: false }, // Mon,Wed
    times: { type: String, required: false }, // 4:55 PM - 6:10 PM
    instructor: { type: Array, required: false }, // ["Kapp, Craig", "Bhat, Atharv", "Malepati, Sachin"]
    rating: { type: Number, required: false }, // 4.26
    syllabus: { type: String, required: false }, // <SOME_URL>,
    multi_topics: { type: Number, required: false }, // 1/0
    topic: { type: String, required: false }
});

const Recitation = new mongoose.Schema({
    lecture_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    class_number: { type: String, required: true }, // 7441
    session: { type: String, required: true }, // 1 01/23/2023 - 05/08/2023
    section_number: { type: String, required: true }, // 001
    class_status: { type: String, required: true }, // Wait List (0)
    instruction_mode: { type: String, required: true }, // In-Person
    location: { type: String, required: false }, // Washington Square
    component: { type: String, required: true }, // Lecture
    building_room: { type: String, required: false }, // 19 University Place Room 102
    days: { type: String, required: false }, // Mon,Wed
    times: { type: String, required: false }, // 4:55 PM - 6:10 PM
    instructor: { type: Array, required: false }, // ["Kapp, Craig", "Bhat, Atharv", "Malepati, Sachin"]
});

User.plugin(passportLocalMongoose);

const user = mongoose.model('User', User);
const course = mongoose.model('Course', Course);
const recitation = mongoose.model('Recitation', Recitation);

module.exports = {
    user,
    course,
    recitation
};
