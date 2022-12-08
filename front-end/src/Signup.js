import './Signup.css'
import axios from "axios"
import { useEffect } from 'react'
import { Form, Input, Button} from 'antd-mobile'

const Signup = props => {

    useEffect(() => {
        document.title = "Signup - AlbertProMax";
    }, []);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const handleClickSignup = (evt) => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const repassword = document.getElementById("repassword").value;
        const email = document.getElementById("email").value;

        if (password !== repassword) {
            const popup = document.getElementById("myPopup");
            popup.classList.toggle("show");
        }
        else {
            axios.post(`${BASE_URL}/register`, {
                username: username,
                password: password,
                email: email
            })
                .then(function (response) {
                    console.log(response);
                    const res = response.data;
                    if (res.success) {
                        window.location.href = "/login";
                    } else {
                        const popup = document.getElementById("myPopup");
                        popup.textContent = "Registered Failed!";
                        popup.classList.toggle("show");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    return (
        <div className='Signup'>
            <h2>Signup</h2>
            
            {/* <table>
                <tbody>
                    <tr>
                        <th>Username: </th>
                        <td><input id="username" type={"text"} placeholder='Type your username here...'></input></td>
                    </tr>

                    <tr>
                        <th>Email: </th>
                        <td><input id="email_signup" type={"text"} placeholder='Type your email here...'></input></td>
                    </tr>

                    <tr>
                        <th>Password: </th>
                        <td><input id="password" type={"password"} placeholder='Type your password here...'></input></td>
                    </tr>

                    <tr>
                        <th>Confirm Password: </th>
                        <td id="confirm">
                            <input id="repassword" type={"password"} placeholder='Type your password again...'></input>
                            <br></br>
                            <span className="popuptext" id="myPopup">Confirm Password Failed</span>
                        </td>
                    </tr>
                </tbody>
            </table> */}

            <Form layout='vertical'>
                <Form.Item label='Username' name='username'>
                    <Input id="username" type={"text"} placeholder='please enter username' clearable />
                </Form.Item>
                <Form.Item label='Email' name='email'>
                    <Input id="email_signup" type={"text"} placeholder='please enter email' clearable />
                </Form.Item>
                <Form.Item label='Password' name='password'>
                    <Input id="password" type={"password"} placeholder='please enter password' clearable />
                </Form.Item>
                <Form.Item label='Confirm Password' name='repassword'>
                    <Input id="repassword" type={"password"} placeholder='please re-enter password' clearable />
                </Form.Item>
            </Form>     
            <br/>
            <br/>

            <Button onClick={handleClickSignup}>Signup</Button>
        </div>
    )
}

export default Signup;