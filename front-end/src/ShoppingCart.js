import CourseInCart from './CourseInCart'
import './ShoppingCart.css'
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ShoppingCart = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

    const [userCart, setUserCart] = useState([]);
    const [cartCourses, setCartCourses] = useState([]);

    useEffect(() => {
        return () => {
            axios
                .get(`${BASE_URL}/cart`, {
                    headers: { Authorization: `Bearer ${jwtToken}` }, // pass the token, if any, to the server
                })
                .then(response => {
                    console.log("response.data:", response.data);

                    setUserCart(response.data.cart);

                    let cartCoursesLocal = [];

                    for (let i = 0; i < response.data.cart.length; i++) {
                        const cartItem = response.data.cart[i];

                        cartCoursesLocal.push(
                            <CourseInCart
                                key={cartItem._id}
                                id={cartItem._id}
                                departmentCode={cartItem.course.department_code}
                                courseNumber={cartItem.course.course_number}
                                courseName={cartItem.course.course_name}
                                watch={cartItem.watch}
                                show={cartItem.show}
                                days = {cartItem.course.days}
                                times= {cartItem.course.times}
                            />
                        );
                    }

                    setCartCourses(cartCoursesLocal);
                }).catch(err => {
                    console.log(err)
                })
        }
    }, []);

    return (
        <>
            {isLoggedIn ? (
                <div className="ShoppingCart">
                    <h2 id="cart_title">Shopping Cart</h2>
                    {cartCourses}
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    )
};

export default ShoppingCart