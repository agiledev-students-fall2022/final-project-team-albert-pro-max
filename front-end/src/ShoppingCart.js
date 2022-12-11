import CourseInCart from './CourseInCart'
import './ShoppingCart.css'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Empty } from 'antd-mobile'

const ShoppingCart = () => {

    useEffect(() => {
        document.title = "Shopping Cart - AlbertProMax";
    }, []);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
    const isLoggedIn = jwtToken && true;

    const [cartCourses, setCartCourses] = useState([]);

    useEffect(() => {
        return () => {
            axios
                .get(`${BASE_URL}/cart`, {
                    headers: { Authorization: `Bearer ${jwtToken}` }, // pass the token, if any, to the server
                })
                .then(response => {
                    console.log("response.data:", response.data);

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
                                classNumber={cartItem.course.class_number}
                                watch={cartItem.watch}
                                show={cartItem.show}
                                days={cartItem.course.days}
                                times={cartItem.course.times}
                            />
                        );
                    }

                    if (cartCoursesLocal.length === 0) {
                        cartCoursesLocal.push(
                            <Empty
                                style={{ padding: '64px 0' }}
                                imageStyle={{ width: 128 }}
                                description='Empty Cart'
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