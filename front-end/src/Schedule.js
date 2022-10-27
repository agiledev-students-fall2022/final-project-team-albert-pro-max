import './Schedule.css'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Schedule = ({ show }) => {
    let scheduleRows = [];
    const [courseBlock, setCourseBlock] = useState(null)

    useEffect(() => {
        if (show) {
            scheduleRows = [];

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
                        );
                    }

                    scheduleRows.push(
                        <tr key={"tr" + hr_str + min_str}>{scheduleRow}</tr>
                    );
                }
            }

            setCourseBlock(scheduleRows);
        } else {
            scheduleRows = [];

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
        </>
    )
}

export default Schedule