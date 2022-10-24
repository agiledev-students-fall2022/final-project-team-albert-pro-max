import './CoursePage.css'
import Course from './Course'

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const CoursePage = props => {
    const num = props.id;
    let items = [];
    for (let i = 0; i < num; i++) {
        items.push(<Course key={i} index={i}/>)
    }
    return (
        <div className='CoursePage'>
            <h2>Catalog</h2>
            {items}
        </div>
    )
}

// make this component available to be imported into any other file
export default CoursePage