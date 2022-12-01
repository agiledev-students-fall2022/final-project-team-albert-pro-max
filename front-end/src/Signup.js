import './Signup.css'
import axios from "axios"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = props => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [email, setEmail] = useState("")
    
    const handleClickSignup = (evt) => {
        setUsername(document.getElementById("username").value);
        setPassword(document.getElementById("password").value);
        setEmail(document.getElementById("email").value);
        axios.post('http://localhost:3001/register', {
            username: username,
            password: password,
            email: email
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className='Signup'>
            <h2>Signup</h2>

            <table>
                <tr>
                    <th>Username: </th>
                    <td><input id="username" type={"text"} placeholder='Type your username here...'></input></td>
                </tr>

                <tr>
                    <th>Email: </th>
                    <td><input id="email" type={"text"} placeholder='Type your email here...'></input></td>
                </tr>

                <tr>
                    <th>Password: </th>
                    <td><input id="password" type={"password"} placeholder='Type your password here...'></input></td>
                </tr>

                <tr>
                    <th>Confirm Password: </th>
                    <td><input id="repassword" type={"password"} placeholder='Type your password again...'></input></td>
                </tr>
            </table>

            <button onClick={handleClickSignup}>Signup</button>
        </div>
    )
}

export default Signup;