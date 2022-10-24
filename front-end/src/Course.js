import './Course.css'
import { Link } from 'react-router-dom'

const coursesList = [
    {
        id: 0, 
        courseName: "Agile Software Engineering",
        courseLoc: "Silver, Room 405",
        courseTime: "TuTh 12:30PM - 1:45PM"
    },
    {
        id: 1, 
        courseName: "Applied Internet Technology",
        courseLoc: "Online",
        courseTime: "TuTh 9:30AM - 10:45AM"
    },
    {
        id: 2, 
        courseName: "Natural Language Processing",
        courseLoc: "Online",
        courseTime: "MoWe 9:30AM - 10:45AM"
    },
    {
        id: 3, 
        courseName: "Intro to Web Design and Computer Principles",
        courseLoc: "CIWW 101",
        courseTime: "MoWe 8:00AM - 9:15AM"
    },
    {
        id: 4, 
        courseName: "Database Design and Implementation",
        courseLoc: "60FA 150",
        courseTime: "TuTh 12:30PM - 1:45PM"
    },
    {
        id: 5, 
        courseName: "Intro to Computer Science",
        courseLoc: "SILV 208",
        courseTime: "MoWe 8:00AM - 9:15AM"
    }

];

const Course = prop => {
    const id = prop.index
    return(
        <Link to ="/coursedetails">
            <div className="course">
                <div>{coursesList[id].courseName}</div>
                <div>Loc: {coursesList[id].courseLoc}</div>
                <div>Time: {coursesList[id].courseTime}</div>
            </div>
        </Link>
        
    )
};

export default Course