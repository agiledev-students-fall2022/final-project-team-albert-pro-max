import React from "react";
import "./CourseInCart.css";
import axios from 'axios';

const CourseInCart = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const jwtToken = localStorage.getItem("token");

  function changeShow(cartItemId, cartItemTime) {
      axios.post(`${BASE_URL}/cart/show`, {
        cartItemId: cartItemId,
        newShow: props.show ? false : true
      }, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }).then(response => {
        console.log(response.data);

        if (response.data.success) {
          window.location.reload();
        }
      }).catch(err => {
        console.log(err)
      });
  }

  function changeWatch(cartItemId) {
    axios.post(`${BASE_URL}/cart/watch`, {
      cartItemId: cartItemId,
      newWatch: props.watch ? false : true
    }, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    }).then(response => {
      console.log(response.data);

      if (response.data.success) {
        window.location.reload();
      }
    }).catch(err => {
      console.log(err)
    });
  }

  function handleDelete(cartItemId){
    axios.post(`${BASE_URL}/cart`,{
      cartItemId:cartItemId,
    },{
      headers:{ Authorization: `Bearer ${jwtToken}` },
    }
    ).then(response =>{
      console.log(response.data);
    
      if (response.data.success) {
        window.location.reload();
      }
    }).catch(err =>{
      console.log(err)
    })
  }

  return (
    <div className="CourseInCart">
      <h4 id='dep'>{props.departmentCode+" "+props.courseNumber}
      <button id="watch" onClick={() => changeWatch(props.id)}>
        {props.watch ? "Unwatch" : "Watch"}
      </button>

      <button id="show" onClick={() => changeShow(props.id, props.times)}>
        {props.show ? "Unshow" : "Show"}
      </button>

      <button id="delete" onClick={() => handleDelete(props.id)}>
        Delete
      </button>

      </h4>
      {props.courseName + " #" + props.classNumber}
      <br/>
      {props.days+" "+props.times}



    </div>
  );
};
export default CourseInCart;