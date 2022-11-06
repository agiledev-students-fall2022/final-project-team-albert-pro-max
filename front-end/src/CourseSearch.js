import { Link } from 'react-router-dom'
import './CourseSearch.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const CourseSearch = props => {

  const [school, setSchool] = useState([])
  const [major, setMajor] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/course/search')
      .then(response => {
        setSchool(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="Search">
      <h2>Course Search</h2>

      <div><select id="term-select">
        <option value="">--Please choose a term--</option>
        <option value="fa21">Fall 2021</option>
        <option value="sp22">Spring 2022</option>
        <option value="fa22">Fall 2022</option>
        <option value="sp23">Spring 2023</option>
      </select></div>

      <div><select id="school-select">
        <option value="">--Please choose a school--</option>
        {school.map(item => (
          <option value={item.name}>{item.name}</option>
        ))}
      </select></div>

      <div><select id="major-select">
        <option value="">--Please choose a major--</option>
        <option value="cs">Computer Science</option>
      </select></div>

      <Link to ='/coursepage'><button>search</button></Link>
    </div>
  )
}

// make this component available to be imported into any other file
export default CourseSearch