import './Schedule.css'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Block = () => {
    return (
        <>
            <td rowSpan={15}><Link to={{
                pathname: "/coursedetails",
                search: `?id=1`
            }}>12:30-13:45<br />CSCI-UA 480<br />Agile Software Development</Link></td>
            <td className='noshow'></td>
            <td rowSpan={15}><Link to={{
                pathname: "/coursedetails",
                search: `?id=1`
            }}>12:30-13:45<br />CSCI-UA 480<br />Agile Software Development</Link></td>
        </>
    )
}

const Schedule = ({ show }) => {
    const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
    console.log(`JWT token: ${jwtToken}`); // debugging
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

    const [courseBlock, setCourseBlock] = useState(null)

    // this array contains courses that are supposed to be showed
    // const [showedCourse, setShowedCourse] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:3001/cart')
            .then(/*response => {
            setShowedCourse(response.data.filter((e) => {
                return e.show === true
            }))
        }*/)
            .catch(err => {
                console.log(err);
                setIsLoggedIn(false);
            })
    }, [])

    useEffect(() => {
        let scheduleRows = [];

        if (show) {

            for (let hr = 8; hr <= 20; hr++) {
                for (let min = 0; min <= 55; min += 5) {
                    let scheduleRow = [];

                    let hr_str, min_str;

                    if (hr < 10) {
                        hr_str = "0" + hr;
                    } else {
                        hr_str = "" + hr;
                    }
                    if (min < 10) {
                        min_str = "0" + min;
                    } else {
                        min_str = "" + min;
                    }

                    if (min % 30 === 0) {
                        scheduleRow.push(
                            <th id={hr_str + min_str} key={"th" + hr_str + min_str} rowSpan={6}>{hr_str}:{min_str}</th>
                        );
                    }

                    if (hr === 12 && min === 30) {
                        scheduleRow.push(
                            <Block key={1} />
                        );
                    }

                    scheduleRows.push(
                        <tr key={"tr" + hr_str + min_str}>{scheduleRow}</tr>
                    );
                }
            }

            setCourseBlock(scheduleRows);
        } else {

            for (let hr = 8; hr <= 20; hr++) {
                for (let min = 0; min <= 55; min += 5) {
                    let scheduleRow = [];

                    let hr_str, min_str;

                    if (hr < 10) {
                        hr_str = "0" + hr;
                    } else {
                        hr_str = "" + hr;
                    }
                    if (min < 10) {
                        min_str = "0" + min;
                    } else {
                        min_str = "" + min;
                    }

                    if (min % 30 === 0) {
                        scheduleRow.push(
                            <th id={hr_str + min_str} key={"th" + hr_str + min_str} rowSpan={6}>{hr_str}:{min_str}</th>
                        );
                    }

                    scheduleRows.push(
                        <tr key={"tr" + hr_str + min_str}>{scheduleRow}</tr>
                    );
                }
            }

            setCourseBlock(scheduleRows);
        }
    }, [show])

    return (
        <>
            {isLoggedIn ? (
                <div className='Schedule'>
                    <h2>Schedule</h2>
                    <center>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className='weekday'>Mon</th>
                                    <th className='weekday'>Tue</th>
                                    <th className='weekday'>Wed</th>
                                    <th className='weekday'>Thu</th>
                                    <th className='weekday'>Fri</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseBlock}
                            </tbody>
                        </table>
                    </center>
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    )
}

export default Schedule