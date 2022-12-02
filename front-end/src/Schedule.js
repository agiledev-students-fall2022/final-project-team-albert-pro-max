import "./Schedule.css";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Block = ({ id, days, times, duration, course_number, course_name }) => {
  let day = days.split(',');
  return (
    <>
      {day.includes('Mon') ? (
        <td rowSpan={duration}>
          <Link
            to={{
              pathname: "/coursedetails",
              search: `?id=${id}`,
            }}
          >
            {times}
            <br />
            {course_number}
            <br />
            {course_name}
          </Link>
        </td>
      ) : (
        <td className="noshow"></td>
      )}
      {day.includes('Tue') ? (
        <td rowSpan={duration}>
          <Link
            to={{
              pathname: "/coursedetails",
              search: `?id=${id}`,
            }}
          >
            {times}
            <br />
            {course_number}
            <br />
            {course_name}
          </Link>
        </td>
      ) : (
        <td className="noshow"></td>
      )}
      {day.includes('Wed') ? (
        <td rowSpan={duration}>
          <Link
            to={{
              pathname: "/coursedetails",
              search: `?id=${id}`,
            }}
          >
            {times}
            <br />
            {course_number}
            <br />
            {course_name}
          </Link>
        </td>
      ) : (
        <td className="noshow"></td>
      )}
      {day.includes('Thu') ? (
        <td rowSpan={duration}>
          <Link
            to={{
              pathname: "/coursedetails",
              search: `?id=${id}`,
            }}
          >
            {times}
            <br />
            {course_number}
            <br />
            {course_name}
          </Link>
        </td>
      ) : (
        <td className="noshow"></td>
      )}
      {day.includes('Fri') ? (
        <td rowSpan={duration}>
          <Link
            to={{
              pathname: "/coursedetails",
              search: `?id=${id}`,
            }}
          >
            {times}
            <br />
            {course_number}
            <br />
            {course_name}
          </Link>
        </td>
      ) : (
        <td className="noshow"></td>
      )}
    </>
  );
};

const Schedule = () => {
  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  // console.log(`JWT token: ${jwtToken}`); // debugging
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  const [courseBlock, setCourseBlock] = useState(null);

  // this array contains courses that are supposed to be showed
  const [showedCourse, setShowedCourse] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/schedule", {
        headers: { Authorization: `Bearer ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then((response) => {
        setShowedCourse(
          response.data.map((item, index) => {
            let duration = 0;
            let time = item.times.split(" ");
            let start = time[0].split(".");
            let startH = parseInt(start[0]);
            if (time[1] === "PM" && time[0].indexOf("12") != 0) startH += 12;
            let startM = parseInt(start[1]);
            let end = time[3].split(".");
            let endH = parseInt(end[0]);
            if (time[4] === "PM" && time[3].indexOf("12") != 0) endH += 12;
            let endM = parseInt(end[1]);
            duration += (endH - startH) * 12;
            duration += (endM - startM) / 5;
            return {
              key: index,
              id: item._id,
              days: item.days,
              times: item.times,
              startH: startH,
              startM: startM,
              duration: duration,
              course_number: item.department_code + ' ' + item.course_number,
              course_name: item.course_name,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    let scheduleRows = [];
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
            <th id={hr_str + min_str} key={"th" + hr_str + min_str} rowSpan={6}>
              {hr_str}:{min_str}
            </th>
          );
        }

        for (let i = 0; i < showedCourse.length; i++) {
          if (showedCourse[i].startH === hr && showedCourse[i].startM === min) {
            scheduleRow.push(<Block key={i} id={showedCourse[i].id} days={showedCourse[i].days} times={showedCourse[i].times} duration={showedCourse[i].duration} course_number={showedCourse[i].course_number} course_name={showedCourse[i].course_name} />);
          }
        }

        scheduleRows.push(<tr key={"tr" + hr_str + min_str}>{scheduleRow}</tr>);
      }
    }
    setCourseBlock(scheduleRows);
  }, [showedCourse]);

  return (
    <>
      {isLoggedIn ? (
        <div className="Schedule">
          <h2>Schedule</h2>
          <center>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th className="weekday">Mon</th>
                  <th className="weekday">Tue</th>
                  <th className="weekday">Wed</th>
                  <th className="weekday">Thu</th>
                  <th className="weekday">Fri</th>
                </tr>
              </thead>
              <tbody>{courseBlock}</tbody>
            </table>
          </center>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Schedule;