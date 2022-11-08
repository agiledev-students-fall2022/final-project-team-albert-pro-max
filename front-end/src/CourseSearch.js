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
  const [selectedMajor, setSelectedMajor] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/course/search')
      .then(response => {
        setSchool(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleSelectSchool = (event) => {
    setMajor(school[parseInt(event.target.value) - 1].major)
  }

  const handleSelectMajor = (event) => {
    setSelectedMajor(major[parseInt(event.target.value) - 1])
    console.log(selectedMajor)
  }

  return (
    <div className="Search">
      <h2>Course Search</h2>

      <div><select>
        <option value="">--Spring 2023 only--</option>
      </select></div>

      <div><select onChange={handleSelectSchool}>
        <option value="">--Please choose a school--</option>
        {school.map((item, index) => {
          return <option key={index} value={item.id}>{item.name}</option>
        })}
      </select></div>

      <div><select onChange={handleSelectMajor}>
        <option value="">--Please choose a major--</option>
        {major.map((item, index) => {
          return <option key={index} value={item.id}>{item.name}</option>
        })}
      </select></div>

      <Link to ='/coursepage'><button>search</button></Link>
    </div>
  )
}

// make this component available to be imported into any other file
export default CourseSearch