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
    units: { type: String, required: true }, // 4
    class_number: { type: String, required: true }, // 7441
    session: {type: String, required: true}, // 1 01/23/2023 - 05/08/2023
    section_number: { type: String, required: true }, // 001
    class_status: { type: String, required: true }, // Wait List (0)
    instruction_mode: { type: String, required: true }, // In-Person
    component: { type: String, required: true }, // Lecture
    location: { type: String, required: true }, // Washington Square
    building: { type: String, required: true }, // 19 University Place
    room: { type: String, required: false }, // Room 102
    day: { type: String, required: false }, // Mon,Wed
    time: { type: String, required: false }, // 4:55 PM - 6:10 PM
    instructor: { type: Array, required: true }, // ["Kapp, Craig", "Bhat, Atharv", "Malepati, Sachin"]
    rating: { type: Number, required: true }, // 4.26
    syllabus: { type: String, required: false }, // <SOME_URL>
});

const Recitation = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    day: { type: String, required: true }, // Mon,Wed
    time: { type: String, required: true }, // 4:55 PM - 6:10 PM
    location: { type: String, required: true }, // Washington Square
    building: { type: String, required: true }, // 19 University Place
    room: { type: String, required: false }, // Room 102
    instructor: { type: Array, required: true }, // ["Kapp, Craig"]
});

User.plugin(passportLocalMongoose);

const user = mongoose.model('User', User);
const course = mongoose.model('Course', Course);
const recitation = mongoose.model('Recitation', Recitation);


if (process.env.NODE_ENV === 'PRODUCTION') {
    const dburl = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + process.env.DB_URL; 
    // console.log(dburl);
    mongoose.connect(dburl);
} else {
    mongoose.connect("mongodb://localhost/albert-pro-max-local");
}

mongoose.connection.on('connecting', () => {
    console.log("[INFO] Connecting to database...");
});

mongoose.connection.on('connected', () => {
    console.log("[INFO] Connected to database!");
});

module.exports = {
    user,
    course,
    recitation
}
