import React from "react";
import "./CourseInCart.css";
import axios from 'axios';

const CourseInCart = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const jwtToken = localStorage.getItem("token");

  function changeShow(cartItemId) {
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
    axios.post("http://localhost:3001/cart",{
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

      <button id="show" onClick={() => changeShow(props.id)}>
        {props.show ? "Unshow" : "Show"}
      </button>

      <button id="delete" onClick={() => handleDelete(props.id)}>
        Delete
      </button>

=======
>>>>>>> 978f970676d6ea21de7de3e0d1c9797b27b1d906
      </h4>
      {props.courseName}
      <br/>
      {props.days+" "+props.times}

=======
>>>>>>> 978f970676d6ea21de7de3e0d1c9797b27b1d906


    </div>
  );
};
export default CourseInCart;