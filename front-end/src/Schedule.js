import React, {Component} from 'react';
import axios from "axios";
import { Navigate } from "react-router-dom";
import {DayPilot, DayPilotCalendar} from "daypilot-pro-react";
import "./Schedule.css"
class Schedule extends Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "WorkWeek",
      headerDateFormat: "ddd",
      cellDuration: 5,
      cellHeight: 4.5,
      businessBeginsHour: 8,
      businessEndsHour: 21,
      dayBeginsHour: 8,
      dayEndsHour: 21,
      timeRangeSelectedHandling: "Disabled",
      eventDeleteHandling: "Disabled",
      eventMoveHandling: "Disabled",
      eventResizeHandling: "Disabled",
      eventClickHandling: "Enabled",
      durationBarVisible: false,
      onEventClicked: (args) => {
        window.location.href = "/coursedetails?id=" + args.e.id();
      },
      eventHoverHandling: "Disabled",
    };
    
    this.BASE_URL = process.env.REACT_APP_BASE_URL;
    this.jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
    this.isLoggedIn = this.jwtToken && true;
    
    document.title = "Schedule - AlbertProMax";
  }

  getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  componentDidMount() {

    axios.get(`${this.BASE_URL}/schedule`, {
      headers: { Authorization: `Bearer ${this.jwtToken}` }, // pass the token, if any, to the server
    })
    .then(response => {
      // load resource and event data
      let list = [];
      for (const e of response.data) {
        let item = e.lec;
        let time = item.times.split(" ");
        let start = time[0].split(".");
        let startH = parseInt(start[0]);
        if (time[1] === "PM" && start[0] !== "12") startH += 12;
        let startM = parseInt(start[1]);
        let end = time[3].split(".");
        let endH = parseInt(end[0]);
        if (time[4] === "PM" && end[0] !== "12") endH += 12;
        let endM = parseInt(end[1]);
        let sTime = new DayPilot.Date("2022-12-05T00:00:00").addHours(startH).addMinutes(startM);
        let eTime = new DayPilot.Date("2022-12-05T00:00:00").addHours(endH).addMinutes(endM);
        let day = item.days.split(',');
        let color = this.getRandomColor(parseInt(item.class_number));
        for (const d of day) {
          let startTime = sTime;
          let endTime = eTime;
          if (d === "Mon") {
            startTime = startTime.addDays(0);
            endTime = endTime.addDays(0);
          } else if (d === "Tue") {
            startTime = startTime.addDays(1);
            endTime = endTime.addDays(1);
          } else if (d === "Wed") {
            startTime = startTime.addDays(2);
            endTime = endTime.addDays(2);
          } else if (d === "Thu") {
            startTime = startTime.addDays(3);
            endTime = endTime.addDays(3);
          } else if (d === "Fri") {
            startTime = startTime.addDays(4);
            endTime = endTime.addDays(4);
          }
          list.push({
            id: item._id,
            text: 'Lecture:\n' + item.department_code + '\n' + item.course_number + '\n' + item.building_room,
            start: startTime,
            end: endTime,
            backColor: color
          })
        }
        if (e.rec) {
          item = e.rec;
          time = item.times.split(" ");
          start = time[0].split(".");
          startH = parseInt(start[0]);
          if (time[1] === "PM" && start[0] !== "12") startH += 12;
          startM = parseInt(start[1]);
          end = time[3].split(".");
          endH = parseInt(end[0]);
          if (time[4] === "PM" && end[0] !== "12") endH += 12;
          endM = parseInt(end[1]);
          sTime = new DayPilot.Date("2022-12-05T00:00:00").addHours(startH).addMinutes(startM);
          eTime = new DayPilot.Date("2022-12-05T00:00:00").addHours(endH).addMinutes(endM);
          let startTime = sTime;
          let endTime = eTime;
          let d = item.days;
          if (d === "Mon") {
            startTime = startTime.addDays(0);
            endTime = endTime.addDays(0);
          } else if (d === "Tue") {
            startTime = startTime.addDays(1);
            endTime = endTime.addDays(1);
          } else if (d === "Wed") {
            startTime = startTime.addDays(2);
            endTime = endTime.addDays(2);
          } else if (d === "Thu") {
            startTime = startTime.addDays(3);
            endTime = endTime.addDays(3);
          } else if (d === "Fri") {
            startTime = startTime.addDays(4);
            endTime = endTime.addDays(4);
          }
          list.push({
            id: item.lecture_id,
            text: 'Recitation:\n' + e.lec.department_code + '\n' + e.lec.course_number + '\n' + item.building_room,
            start: startTime,
            end: endTime,
            backColor: color
          })
        }
      }
      this.setState({
        events: list
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  render() {
    return (
      <div>
        {this.isLoggedIn ? (
          <DayPilotCalendar
            {...this.state}
            ref={this.calendarRef}
          />
        ) : (
          <Navigate to="/login" />
        )}
      </div>
    );
  }
}

export default Schedule;
