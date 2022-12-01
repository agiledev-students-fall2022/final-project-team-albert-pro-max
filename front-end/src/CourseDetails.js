import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import './CourseDetails.css';

const CourseDetails = ({ added, setAdd }) => {
    const courseId = new URLSearchParams(useLocation().search).get("id");

    const [courseDetails, setCourseDetails] = useState({});
    const [recitationSections, setRecitationSections] = useState(<></>);
    useEffect(() => {
        return () => {
            console.log("courseId:", courseId);

            const fetchData = async () => {
                const res = await axios
                    .get('http://localhost:3001/course/details/' + courseId)
                    .then(response => {
                        console.log("response.data:", response.data);

                        if (response.data.multi_topics == 1) {
                            response.data.course_name += " " + response.data.topic
                        }

                        setCourseDetails(response.data);
                    }).catch(err => {
                        console.log(err)
                    })
            }
            fetchData();
        }
    }, []);

    const AddCourse = (tempCourse) => {
        const courseIn = added.find((courseInList) => { return courseInList.course_name === tempCourse.course_name });
        if (!courseIn) {
            setAdd([...added, tempCourse])
        }
    }

    if (courseDetails) {
        return (
            <div className='CourseDetails'>
                <h2 className="course-title">{courseDetails.department_code} - {courseDetails.course_number}<br />{courseDetails.course_name}</h2>

                <div className="course-info">
                    <table>
                        <tbody>
                            <tr>
                                <td>Section</td>
                                <td>{courseDetails.section_number}</td>
                            </tr>
                            <tr>
                                <td>Professor</td>
                                <td>{courseDetails.instructor} </td>
                            </tr>
                            <tr>
                                <td>Days/Times</td>
                                <td>{courseDetails.days} {courseDetails.times}</td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td>{courseDetails.location}</td>
                            </tr>
                            <tr>
                                <td>Syllabus</td>
                                <td><a href={courseDetails.syllabus}>Link to Course Syllabus</a></td>
                            </tr>
                            <tr>
                                <td>Cart</td>
                                <td><button onClick={() => AddCourse(courseDetails)}>Add to Shopping Cart</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {recitationSections}
                <Link to={{
                    pathname: '/coursepage',
                    search: `?id=${courseDetails.school_name + '-' + courseDetails.department_name}`
                }}><button>back</button></Link>
            </div>
        )
    }
}

// make this component available to be imported into any other file
export default CourseDetails