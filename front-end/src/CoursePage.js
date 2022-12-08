import './CoursePage.css'
import Course from './Course'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import mockCourses from './MockData/courses.json';

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const CoursePage = props => {

  useEffect(() => {
    document.title = "Course Catalog - AlbertProMax";
  }, []);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const id = new URLSearchParams(useLocation().search).get("id");
  const info = id.split("-")

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    return () => {
      axios
        .get(`${BASE_URL}/course/catalog/${id}`)
        .then(response => {
          setCourses(response.data)
          // console.log(response.data);
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  if (info[0] === "*" || info[1] === "*") {
      window.location.href="/coursesearch"
  } else {
    return (
      <div className='CoursePage'>
        <h2>Catalog</h2>
        {courses.map((item, index) => {
          // console.log(item)
          if (item.instructor.length == 0) {
            item.instructor.push("TBD");
          }

          if (item.multi_topics == 1) {
            return <Course
              key={index}
              id={item._id}
              school={info[0]}
              major={info[1]}
              course_name={item.department_code + " " + item.course_number + " " + item.course_name + ": " + item.topic}
              location={item.location}
              days={item.days}
              times={item.times}
              instructor={item.instructor}
              instruction_mode={item.instruction_mode}
              class_status={item.class_status}
            />
          } else {
            return <Course
              key={index}
              id={item._id}
              school={info[0]}
              major={info[1]}
              course_name={item.department_code + " " + item.course_number + " " + item.course_name}
              location={item.location}
              days={item.days}
              times={item.times}
              instructor={item.instructor}
              instruction_mode={item.instruction_mode}
              class_status={item.class_status}
            />
          }
        })}
      </div>
    )
  }
}

// make this component available to be imported into any other file
export default CoursePage