import React, {Component} from 'react';
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import {DayPilot, DayPilotCalendar} from "daypilot-pro-react";
class Calendar extends Component {

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
        //args.control.message("Event clicked: " + args.e.text());
        console.log(args.e);
      },
      eventHoverHandling: "Disabled",
    };
    
    this.BASE_URL = process.env.REACT_APP_BASE_URL;
    this.jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
    this.isLoggedIn = this.jwtToken && true;
    
    document.title = "Schedule - AlbertProMax";
  }

  componentDidMount() {

    axios.get(`${this.BASE_URL}/schedule`, {
      headers: { Authorization: `Bearer ${this.jwtToken}` }, // pass the token, if any, to the server
    })
    .then(response => {
      // load resource and event data
      let list = [];
      response.data.map((item, index) => {
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
          if (!item.lecture_id) {
            list.push({
              id: index,
              text: item.department_code + ' ' + item.course_number,
              start: startTime,
              end: endTime
            })
          } else {
            list.push({
              id: index,
              text: 'Recitation',
              start: startTime,
              end: endTime
            })
          }
        }
      })
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

export default Calendar;
