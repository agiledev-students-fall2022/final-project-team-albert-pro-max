import './CourseDetails.css'
import React, { useEffect } from 'react'
import Course from './Course';
const CourseDetails = ({added, setAdd}) => {
    useEffect(() => {
        console.log(added)
        
    });
    const AddCourse= (tempName)=>{
        const courseIn = added.find((courseInList) => {return courseInList === tempName});
        if(!courseIn){
            setAdd([...added, tempName])
        }
    }

    function handleClickConflictIcon() {
        alert("Time Conflict with:\nCSCI-UA - 480 Natural Language Processing\nTuTh 11:00AM - 12:45PM");
    }

    const courseName = "Agile Software Development"
    return (
        <>
            <h2 className="course-title">CSCI-UA - 480<br />{courseName}</h2>

            <div className="course-info">
                <table>
                    <tr>
                        <td>Section</td>
                        <td>069</td>
                    </tr>
                    <tr>
                        <td>Professor</td>
                        <td>Amos Bloomberg</td>
                    </tr>
                    <tr>
                        <td>Days/Times</td>
                        <td><img className='icon-conflict' src="/prompt.svg" onClick={handleClickConflictIcon}></img>TuTh 12:30PM - 1:45PM</td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td>Silver, Room 405 Loc: Washington Square</td>
                    </tr>
                    <tr>
                        <td>Course Rating</td>
                        <td>4.5 / 5.0 <button>Submit My Rating</button></td>
                    </tr>
                    <tr>
                        <td>Syllabus</td>
                        <td><a href="https://nyu-agile-development.github.io/course-materials/syllabus/">Link to Course Syllabus</a></td>
                    </tr>
                    <tr>
                        <td>Cart</td>
                        <td><button onClick={() => AddCourse(courseName)}>Add to Shopping Cart</button></td>
                    </tr>
                </table>
            </div>

            <h3>Recitation Sections</h3>

            <div className="course-recitation-info">
                <table>
                    <tr>
                        <th>Section</th>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Instructor</th>
                    </tr>
                    <tr>
                        <td>070</td>
                        <td>Fri</td>
                        <td>8:00AM - 9:15AM</td>
                        <td>Online</td>
                        <td>Foo Bar</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

// make this component available to be imported into any other file
export default CourseDetails