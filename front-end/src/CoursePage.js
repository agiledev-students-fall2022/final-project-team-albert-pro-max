import './CoursePage.css'
import Course from './Course'
import axios from 'axios'
import { useState } from 'react'
// import mockCourses from './MockData/courses.json';

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const CoursePage = props => {
  const [courses, setCourses] = useState([]);
    axios
      .get('http://localhost:3001/course/catalog')
      .then(response => {
        setCourses(response.data);
      })
      .catch(err => {
        console.log(err)
      })
    
    console.log(courses)
    return (
        <div className='CoursePage'>
            <h2>Catalog</h2>
            {courses}
        </div>
    )
}

// make this component available to be imported into any other file
export default CoursePage