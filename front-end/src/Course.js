import './Course.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Course = prop => {
    const index = prop.index;
    const [courses, setCourses] = useState([])
    axios
      .get('http://localhost:4000/course/catalog')
      .then(response => {
        // console.log(response);
        setCourses(response.data);
      })
      .catch(err => {
        console.log(err)
      })
    return (
        <Link to={{
            pathname: "/coursedetails",
            search: `?id=${courses[index].id}`
        }}>
            <div className="course">
                <div>{courses[index].course_name}</div>
                <div>Loc: {courses[index].location}</div>
                <div>Time: {courses[index].days} {courses[index].times}</div>
            </div>
        </Link>

    )
};

export default Course