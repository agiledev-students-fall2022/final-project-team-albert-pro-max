import React from "react";
import "./CourseInCart.css";
import axios from 'axios';

const CourseInCart = (props) => {
  const jwtToken = localStorage.getItem("token");

  return (
    <div className="CourseInCart">
      {props.departmentCode + " " + props.courseNumber + " " + props.courseName}

      <button id="watch" onClick={changeWatch(props.id)}>
        {props.watch ? "Unwatch" : "Watch"}
      </button>

      <button id="show" onClick={changeShow(props.id)}>
        {props.watch ? "Unshow" : "Show"}
      </button>
    </div>
  );
};
export default CourseInCart;