import './CourseDetails.css'
import React,{ useEffect } from 'react'
const CourseDetails = ({added, setAdd}) => {
    useEffect(()=>{
       console.log(added)
    });

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
                        <td>TuTh 12:30PM - 1:45PM</td>
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
                        <td><button onClick={()=>setAdd([...added,courseName])}>Add to Shopping Cart</button></td>
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