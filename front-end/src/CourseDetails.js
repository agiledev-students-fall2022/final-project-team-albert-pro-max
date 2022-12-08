import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Toast } from 'antd-mobile'
import './CourseDetails.css';

const CourseDetails = () => {

    useEffect(() => {
        document.title = "Course Details - AlbertProMax";
    }, []);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

    const courseId = new URLSearchParams(useLocation().search).get("id");

    const [courseDetails, setCourseDetails] = useState({});
    const [recitations, setRecitations] = useState([]);
    const [recitationTableRows, setRecitationTableRows] = useState(<></>);



    useEffect(() => {
        return () => {
            console.log("courseId:", courseId);

            axios
                .get(`${BASE_URL}/course/details/${courseId}`)
                .then(response => {
                    console.log("response.data:", response.data);

                    if (response.data.multi_topics == 1) {
                        response.data.course_name += " " + response.data.topic
                    }

                    setCourseDetails(response.data.courseDetails);
                    setRecitations(response.data.recitations);

                    const recitationTableRowsLocal = [];

                    for (let i = 0; i < response.data.recitations.length; i++) {
                        let recitation = response.data.recitations[i];

                        if (recitation.instructor.length == 0) {
                            recitation.instructor.push("TBD");
                        }

                        recitationTableRowsLocal.push(
                            <tr key={recitation._id}>
                                <td>{recitation.section_number}</td>
                                <td>{recitation.days}</td>
                                <td>{recitation.times}</td>
                                <td>{recitation.instruction_mode}</td>
                                <td>{recitation.building_room}</td>
                                <td>{recitation.instructor}</td>
                                <td>
                                    <Button
                                            block
                                            onClick={() =>{
                                            (AddCourse(response.data.courseDetails, recitation))}
                                        }
                                        >
                                            Add
                                        </Button>
                                    {/* <button onClick={() => AddCourse(response.data.courseDetails, recitation)}>Add</button> */}
                                </td>
                            </tr>
                        );
                    }

                    setRecitationTableRows(recitationTableRowsLocal);
                }).catch(err => {
                    console.log(err)
                })
        }
    }, []);

    function AddCourse(courseDetails, recitationSection) {
        if (!isLoggedIn) {
            window.location.href = "/login";
        }

        console.log("AddCourse courseDetails:", courseDetails);
        console.log("AddCourse recitationSection:", recitationSection);

        axios
            .post(`${BASE_URL}/cart/add`, {
                courseId: courseDetails._id,
                recitationId: recitationSection ? recitationSection._id : null
            }, {
                headers: { Authorization: `Bearer ${jwtToken}` },
            })
            .then(function (response) {
                // console.log(response.data);
                console.log("responsehere",response.data.message);
                const icon_mes = response.data.message == "Course already in cart!" ? 'fail':'success'
                return ( 
                    Toast.show({
                        icon: icon_mes,
                        content: response.data.message,
                    })
                )
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }

    if (courseDetails) {
        return (
            <div className='CourseDetails'>
                <h2 className="course-title">{courseDetails.department_code} - {courseDetails.course_number}<br />{courseDetails.course_name}</h2>

                <div className="course-info">
                    <table>
                        <tbody>
                            <tr>
                                <td>Class#</td>
                                <td>{courseDetails.class_number}</td>
                            </tr>
                            <tr>
                                <td>Section</td>
                                <td>{courseDetails.section_number}</td>
                            </tr>
                            <tr>
                                <td>Instructor</td>
                                <td>{courseDetails.instructor} </td>
                            </tr>
                            <tr>
                                <td>Days/Times</td>
                                <td>{courseDetails.days} {courseDetails.times}</td>
                            </tr>
                            <tr>
                                <td>Instruction Mode</td>
                                <td>{courseDetails.instruction_mode}</td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td>{courseDetails.location}</td>
                            </tr>
                            <tr>
                                <td>Building Room</td>
                                <td>{courseDetails.building_room}</td>
                            </tr>
                            <tr>
                                <td>Syllabus</td>
                                <td><a href={courseDetails.syllabus}>Link to Course Syllabus</a></td>
                            </tr>
                            {recitations.length == 0 ? (
                                <tr>
                                    <td>Cart</td>
                                    <td><button onClick={() => AddCourse(courseDetails)}>Add to Shopping Cart</button></td>
                                </tr>
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                </div>

                {recitations.length > 0 ? (
                    <div className="recitation-info">
                        <h3>Recitation Sections</h3>

                        <div className="course-recitation-info">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Section</th>
                                        <th>Days</th>
                                        <th>Times</th>
                                        <th>Instruction Mode</th>
                                        <th>Building Room</th>
                                        <th>Instructor</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recitationTableRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                <Link to={{
                    pathname: '/coursepage',
                    search: `?id=${courseDetails.school_name + '-' + courseDetails.department_name}`
                }}><button id='back'>Back</button></Link>
            </div>
        )
    }
}

// make this component available to be imported into any other file
export default CourseDetails