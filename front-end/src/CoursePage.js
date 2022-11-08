import './CoursePage.css'
import Course from './Course'
import axios from 'axios'
import { useEffect, useState } from 'react'
// import mockCourses from './MockData/courses.json';

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const CoursePage = props => {
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

    return (
        <div className='CoursePage'>
            <h2>Catalog</h2>
            {courses.map((item, index) => {
              console.log(item)
              return <Course key={index} id={item.id} course_name={item.course_name} loction={item.location} days={item.days} times={item.times}/>
            })}
        </div>
    )
}

// make this component available to be imported into any other file
export default CoursePage