import './CourseSearch.css'

const DropDown = (props) => {
    return (
        <p onClick={props.action}>{props.name}</p>
    )
}

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const CourseSearch = props => {
  return (
    <>
      <h1>Course Search</h1>

      <label htmlFor="term-select">Choose a term:</label>
      <select id="term-select">
        <option value="">--Please choose an option--</option>
        <option value="fa21">Fall 2021</option>
        <option value="sp22">Spring 2022</option>
        <option value="fa22">Fall 2022</option>
        <option value="sp23">Spring 2023</option>
      </select>

      <label htmlFor="school-select">Choose a school:</label>
      <select id="school-select">
        <option value="">--Please choose an option--</option>
        <option value="cas">CAS</option>
        <option value="tisch">Tisch</option>
        <option value="stern">Stern</option>
        <option value="steinhardt">Steinhardt</option>
      </select>

      <label htmlFor="major-select">Choose a major:</label>
      <select id="major-select">
        <option value="">--Please choose an option--</option>
      </select>

      {/*<section>
        <DropDown action={()=>alert("please select term")} name="term"/>
        <DropDown action={()=>alert("please select school")} name="school"/>
        <DropDown action={()=>alert("please select major")} name="major"/>
      </section>*/}

      <div>search</div>
    </>
  )
}

// make this component available to be imported into any other file
export default CourseSearch