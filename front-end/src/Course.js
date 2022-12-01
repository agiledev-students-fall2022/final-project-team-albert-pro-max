import './Course.css'
import { Link } from 'react-router-dom'

const Course = prop => {
  return (
      <Link to={{
          pathname: "/coursedetails",
          search: `?id=${prop.id + "-" + prop.school + "-" + prop.major}`
      }}>
          <div className="course">
              <div>{prop.course_name}</div>
              <div>Loc: {prop.location}</div>
              <div>Time: {prop.days} {prop.times}</div>
          </div>
      </Link>

  )
};

export default Course