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

  const id = new URLSearchParams(useLocation().search).get("id");
  const info = id.split("-")

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/course/catalog')
      .then(response => {
        setCourses(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (info[0] === "*" || info[1] === "*") {
    return (
      <div>
      <h2>Invalid Search</h2>
      <Link to="/coursesearch">
        <button>back</button>
      </Link></div>
    )
  } else {
    return (
        <div className='CoursePage'>
            <h2>Catalog</h2>
            {courses.map((item, index) => {
              console.log(item)
              return <Course key={index} id={item._id} course_name={item.course_name} location={item.location} day={item.day} times={item.time}/>
            })}
        </div>
    )
  }
}

// make this component available to be imported into any other file
export default CoursePage