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
        console.log('username: ', username)
        console.log('email: ', email)
        console.log('password: ', password)
        console.log('repassword: ', repassword)
        // setUsername(document.getElementById("username").textContent);
        // setPassword(document.getElementById("password").textContent);
        // setEmail(document.getElementById("email").textContent);
        // axios.post('http://localhost:3001/register', {
        //     username: username,
        //     password: password,
        //     email: email
        // })
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    }

    return (
        <div className='Signup'>
            <h2>Signup</h2>

            <table>
                <tr>
                    <th>Username: </th>
                    <td><input type={"text"} placeholder='Type your username here...'>{{username}}</input></td>
                </tr>

                <tr>
                    <th>Email: </th>
                    <td><input type={"text"} placeholder='Type your email here...'>{email}</input></td>
                </tr>

                <tr>
                    <th>Password: </th>
                    <td><input type={"password"} placeholder='Type your password here...'>{password}</input></td>
                </tr>

                <tr>
                    <th>Confirm Password: </th>
                    <td><input type={"password"} placeholder='Type your password again...'>{repassword}</input></td>
                </tr>
            </table>

            <button onClick={handleClickSignup}>Signup</button>
        </div>
    )
}

export default Signup;