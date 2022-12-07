import React from "react";
import "./CourseInCart.css";
import axios from 'axios';

const CourseInCart = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const jwtToken = localStorage.getItem("token");

  function changeShow(cartItemId, cartItemTime) {
    // check conflict
    if (!props.show) {
      let thisTime = cartItemTime.split(" ");
      let thisB = thisTime[0].split(".");
      let thisBegin = parseInt(thisB[0]);
      if (thisTime[1] === "PM" && thisB[0] !== "12") thisBegin += 12;
      thisBegin = thisBegin * 100 + parseInt(thisB[1]);
      let thisE = thisTime[3].split(".");
      let thisEnd = parseInt(thisE[0]);
      if (thisTime[1] === "PM" && thisE[0] !== "12") thisEnd += 12;
      thisEnd = thisEnd * 100 + parseInt(thisE[1]);
      axios.get(`${BASE_URL}/schedule`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        let conflict = false;
        for (const item of response.data) {
          let thatTime = item.times.split(" ");
          let thatB = thatTime[0].split(".");
          let thatBegin = parseInt(thatB[0]);
          if (thatTime[1] === "PM" && thatB[0] !== "12") thatBegin += 12;
          thatBegin = thatBegin * 100 + parseInt(thatB[1]);
          let thatE = thatTime[3].split(".");
          let thatEnd = parseInt(thatE[0]);
          if (thatTime[1] === "PM" && thatE[0] !== "12") thatEnd += 12;
          thatEnd = thatEnd * 100 + parseInt(thatE[1]);
          if ((thisBegin < thatEnd && thisEnd > thatBegin) || (thatBegin < thisEnd && thatEnd > thisBegin)) {
            if (!item.lecture_id) {
              alert("conflict! with #" + item.class_number);
            } else {
              axios.get(`${BASE_URL}/schedule`, {
                headers: { Authorization: `Bearer ${jwtToken}` },
              })
              .then(response => {
                alert("conflict! with recitation of #" + response.data[0].class_number);
              })
              .catch(err => {
                console.log(err)
              });
            }
            conflict = true;
          }
        }
        if (!conflict) {
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
      })
      .catch(err => {
        console.log(err)
      });
    } else {
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