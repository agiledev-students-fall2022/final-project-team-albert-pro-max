import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import './CourseDetails.css';

const CourseDetails = ({ added, setAdd }) => {
    const info = new URLSearchParams(useLocation().search).get("id").split("-");
    const courseId = info[0]

    const [courseDetails, setCourseDetails] = useState([]);
    const [recitationSections, setRecitationSections] = useState(<></>);
    useEffect(() => {
        console.log("front",courseId)
        const fetchData = async () => {
            const res = await axios
                .get('http://localhost:3001/course/details/' + courseId)
                .then(response => {
                    console.log(response.data);
                    setCourseDetails(response.data);

                    if (response.data.hasOwnProperty('recitations')&&response.data.recitations.length > 0) {
                        const recitationTableRows = [];

                        for (let i = 0; i < response.data.recitations.length; i++) {
                            let recitation = response.data.recitations[i];

                            recitationTableRows.push(
                                <tr key={recitation.id}>
                                    <td>{recitation.id}</td>
                                    <td>{recitation.days}</td>
                                    <td>{recitation.times}</td>
                                    <td>{recitation.location}</td>
                                    <td>{recitation.instructor_first_name} {recitation.instructor_last_name}</td>
                                </tr>
                            );
                        }

                        setRecitationSections(<>
                            <h3>Recitation Sections</h3>

                            <div className="course-recitation-info">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Section</th>
                                            <th>Day</th>
                                            <th>Time</th>
                                            <th>Location</th>
                                            <th>Instructor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recitationTableRows}
                                    </tbody>
                                </table>
                            </div>
                        </>);
                    }
                })
        }
        fetchData()
        .catch(err => {
            console.log(err)
        })
    }, ['http://localhost:3001/course/details/' + courseId]);

    const AddCourse = (tempCourse) => {
        const courseIn = added.find((courseInList) => { return courseInList.course_name === tempCourse.course_name });
        if (!courseIn) {
            setAdd([...added, tempCourse])
        }
    }

    function handleClickConflictIcon() {
        alert("Time Conflict with:\nCSCI-UA - 480 Natural Language Processing\nTuTh 11:00AM - 12:45PM");
    }


    console.log("frontdetailstest",courseDetails)
    // console.log("departmentcode",course.department_code)
    if(courseDetails.length>0){
        return (
            <div className='CourseDetails'>
                <h2 className="course-title">{courseDetails[0].department_code} - {courseDetails[0].course_number}<br />{courseDetails[0].course_name}</h2>
    
                <div className="course-info">
                    <table>
                        <tbody>
                            <tr>
                                <td>Section</td>
                                <td>{courseDetails[0].section_number}</td>
                            </tr>
                            <tr>
                                <td>Professor</td>
                                <td>{courseDetails[0].instructor} </td>
                            </tr>
                            <tr>
                                <td>Days/Times</td>
                                <td><img className='icon-conflict' src="/prompt.svg" onClick={handleClickConflictIcon}></img>{courseDetails[0].day} {courseDetails[0].time}</td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td>{courseDetails[0].location}</td>
                            </tr>
                            <tr>
                                <td>Course Rating</td>
                                <td>{courseDetails[0].rating} / 5.0 <button>Submit My Rating</button></td>
                            </tr>
                            <tr>
                                <td>Syllabus</td>
                                <td><a href={courseDetails[0].syllabus}>Link to Course Syllabus</a></td>
                            </tr>
                            <tr>
                                <td>Cart</td>
                                <td><button onClick={() => AddCourse(courseDetails[0])}>Add to Shopping Cart</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    
                {recitationSections}
                <Link to={{
                    pathname: '/coursepage',
                    search: `?id=${info[1] + '-' + info[2]}`
                }}><button>back</button></Link>
            </div>
        )
    }
}

// make this component available to be imported into any other file
export default CourseDetails