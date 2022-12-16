import './Login.css'
import axios from "axios"
import { useEffect } from 'react'
import { Form, Input, Button, Toast} from 'antd-mobile'

const Login = props => {

    useEffect(() => {
        document.title = "Login - AlbertProMax";
    }, []);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    function handleClickLogin() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        axios.post(`${BASE_URL}/login`, {
            username: username,
            password: password
        })
        .then(function (response) {
            console.log(response);
            const res = response.data;
            if (res.success && res.token) {
                localStorage.setItem("token", res.token);
                window.location.href = "/profile";
            } else {
                Toast.show({
                    icon: 'fail',
                    content: 'Login failed!',
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            Toast.show({
                icon: 'fail',
                content: 'Login failed!',
            });
        });
    }

    return (
        <div className='Login'>
            <h2>Login</h2>

            {/* <table>
                <tbody>
                    <tr>
                        <th>Username: </th>
                        <td><input id="username" type={"text"} placeholder='Type your username here...'></input></td>
                    </tr>

                    <tr>
                        <th>Password: </th>
                        <td><input id="password" type={"password"} placeholder='Type your password here...'></input></td>
                    </tr>
                </tbody>
            </table> */}

        <Form layout='vertical'>
          <Form.Item label='Username' name='username'>
            <Input id="username" type={"text"} placeholder='please enter username' clearable />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input id="password" type={"password"} placeholder='please enter password' clearable />
          </Form.Item>
        </Form> 
        <br/>
        <br/>
            <Button onClick={handleClickLogin}>Login</Button>
            <p>Not registered yet? <a href='/signup'>Create an account</a></p>
        </div>
    )
}

export default Login;