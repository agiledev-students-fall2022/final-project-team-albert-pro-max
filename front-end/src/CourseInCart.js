import React from "react";
import "./CourseInCart.css";
import axios from 'axios';

const CourseInCart = (props) => {
  const jwtToken = localStorage.getItem("token");
  function changeShow(cartId) {
        axios.post("http://localhost:3001/cart/show", {
            cartId: cartId,
            newShow: props.show ? false : true
        }, {
            headers: { Authorization: `Bearer ${jwtToken}` },
        }).then(response => {
            console.log(response.data);
        }).catch(err => {
            console.log(err)
        });
    }

    function changeWatch(cartId) {
        axios.post("http://localhost:3001/cart/watch", {
            cartId: cartId,
            newWatch: props.watch ? false : true
        }, {
            headers: { Authorization: `Bearer ${jwtToken}` },
        }).then(response => {
            console.log(response.data);
        }).catch(err => {
            console.log(err)
        });
    }
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