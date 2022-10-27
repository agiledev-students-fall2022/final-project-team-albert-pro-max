import './Course.css'
import { Link } from 'react-router-dom'

import mockCourses from './MockData/courses.json';

const Course = prop => {
    const index = prop.index;
    return (
        <Link to={{
            pathname: "/coursedetails",
            search: `?id=${mockCourses[index].id}`
        }}>
            <div className="course">
                <div>{mockCourses[index].course_name}</div>
                <div>Loc: {mockCourses[index].location}</div>
                <div>Time: {mockCourses[index].days} {mockCourses[index].times}</div>
            </div>
        </Link>

    )
};

export default Course