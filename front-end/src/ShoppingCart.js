import CourseInCart from './CourseInCart'
import './ShoppingCart.css'
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ShoppingCart = () => {
    const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

    const [userCart, setUserCart] = useState([]);
    const [cartCourses, setCartCourses] = useState([]);

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

    useEffect(() => {
        return () => {
            axios
                .get('http://localhost:3001/cart', {
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