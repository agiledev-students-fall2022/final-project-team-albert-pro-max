import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import './CourseDetails.css';

import mockCourses from './MockData/courses.json'

const CourseDetails = ({ added, setAdd }) => {
    useEffect(() => {
        console.log("addedCourses:", added);
    });

    const AddCourse = (tempCourse) => {
        const courseIn = added.find((courseInList) => { return courseInList.course_name === tempCourse.course_name});
        if (!courseIn) {
            setAdd([...added, tempCourse])
        }
    }

    function handleClickConflictIcon() {
        alert("Time Conflict with:\nCSCI-UA - 480 Natural Language Processing\nTuTh 11:00AM - 12:45PM");
    }

    const courseId = new URLSearchParams(useLocation().search).get("id");
    const index = parseInt(courseId) - 1;
    const course = mockCourses[index];

    let recitationSections = <></>;

    if (course.recitations.length > 0) {
        const recitationTableRows = [];

        for (let i = 0; i < course.recitations.length; i++) {
            let recitation = course.recitations[i];

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

        recitationSections = <>
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
        </>;
    }

    return (
        <div className='CourseDetails'>
            <h2 className="course-title">CSCI-UA - {course.course_number}<br />{course.course_name}</h2>

            <div className="course-info">
                <table>
                    <tbody>
                        <tr>
                            <td>Section</td>
                            <td>{course.section_number}</td>
                        </tr>
                        <tr>
                            <td>Professor</td>
                            <td>{course.prof_first_name} {course.prof_last_name}</td>
                        </tr>
                        <tr>
                            <td>Days/Times</td>
                            <td><img className='icon-conflict' src="/prompt.svg" onClick={handleClickConflictIcon}></img>{course.days} {course.times}</td>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td>{course.location}</td>
                        </tr>
                        <tr>
                            <td>Course Rating</td>
                            <td>{course.rating} / 5.0 <button>Submit My Rating</button></td>
                        </tr>
                        <tr>
                            <td>Syllabus</td>
                            <td><a href={course.syllabus}>Link to Course Syllabus</a></td>
                        </tr>
                        <tr>
                            <td>Cart</td>
                            <td><button onClick={() => AddCourse(course)}>Add to Shopping Cart</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {recitationSections}
        </div>
    )
}

// make this component available to be imported into any other file
export default CourseDetails