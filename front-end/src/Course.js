import './Course.css'
import { Link } from 'react-router-dom'

const Course = prop => {
    return (
        <Link to={{
            pathname: "/coursedetails",
            search: `?id=${prop.id}`
        }}>
            <div className="course">
                <b>{prop.course_name}</b>
                <div>Location: {prop.location}</div>
                <div>Time: {prop.days} {prop.times}</div>
                <div>Prof: {prop.instructor.join("; ")}</div>
                <div>Instruction Mode: {prop.instruction_mode}</div>
                <div>Status: {prop.class_status}</div>
            </div>
        </Link>

    )
};

export default Course