import { Link } from 'react-router-dom'
import './CourseSearch.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Toast } from 'antd-mobile'
/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const CourseSearch = props => {

  useEffect(() => {
    document.title = "Course Search - AlbertProMax";
  }, []);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [school, setSchool] = useState([])
  const [major, setMajor] = useState([])
  const [schoolID, setSelectedSchool] = useState("*")
  const [majorID, setSelectedMajor] = useState("*")

  useEffect(() => {
    axios
      .get(`${BASE_URL}/course/search`)
      .then(response => {
        setSchool(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleSelectSchool = (event) => {
    setMajor(school[parseInt(event.target.value)].majors)
    setSelectedSchool(school[parseInt(event.target.value)].school_name)
  }

  const handleSelectMajor = (event) => {
    console.log(event.target.value)
    setSelectedMajor(event.target.value)
  }

  return (
    <div className="Search">
      <h2>Course Search</h2>

      <div><select>
        <option value="*">--Spring 2023 only--</option>
      </select></div>

      <div><select onChange={handleSelectSchool}>
        <option value="*">--Please choose a school--</option>
        {school.map((item, index) => {
          return <option key={index} value={item.school_id}>{item.school_name}</option>
        })}
      </select></div>

      <div><select onChange={handleSelectMajor}>
        <option value="*">--Please choose a major--</option>
        {major.map((item, index) => {
          return <option key={index} value={item}>{item}</option>
        })}
      </select></div>

        <br />
        <button id="searchbtn" onClick={()=>{
          if(schoolID==="*"||majorID==="*"){
            return(
              Toast.show({
              icon: 'fail',
              content: "Invalid Search!"
          }))}
          else{
            window.location.href='/coursepage?id='+schoolID + '-' + majorID
          }  
        }}>SEARCH !</button>

    </div>
  )
}

// make this component available to be imported into any other file
export default CourseSearch