import './CourseSearch.css'

const Search = (props) => {
  return (
      <button onClick={props.action}>{props.name}</button>
  )
}

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const CourseSearch = props => {
  return (
    <div className="Search">
      <h1>Course Search</h1>

      <div><select id="term-select">
        <option value="">--Please choose a term--</option>
        <option value="fa21">Fall 2021</option>
        <option value="sp22">Spring 2022</option>
        <option value="fa22">Fall 2022</option>
        <option value="sp23">Spring 2023</option>
      </select></div>

      <div><select id="school-select">
        <option value="">--Please choose a school--</option>
        <option value="cas">CAS</option>
        <option value="tisch">Tisch</option>
        <option value="stern">Stern</option>
        <option value="steinhardt">Steinhardt</option>
      </select></div>

      <div><select id="major-select">
        <option value="">--Please choose a major--</option>
        <option value="cs">Computer Science</option>
      </select></div>

      <Search action={()=>{alert("you've clicked search!")}} name="search"/>
    </div>
  )
}

// make this component available to be imported into any other file
export default CourseSearch