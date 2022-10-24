import React from 'react'
// import Button from './Button';
import './CourseInCart.css'
const CourseInCart = ({show, setShow}) =>{
    const handleShow = () => {
        setShow(!show);
        alert(show ? "course removed from schedule" : "course showed on schedule")
    }
    return(
        <div className="CourseInCart">
                Course Name
                <button id='watch'>watch</button>
                <button id='show' onClick={handleShow}>show</button>
        </div>
    )

}
export default CourseInCart