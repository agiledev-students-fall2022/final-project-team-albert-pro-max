import './Login.css'
import axios from "axios"

const Login = props => {
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
                    window.location.href = "/login";
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className='Login'>
            <h2>Login</h2>

            <table>
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
            </table>

            <button onClick={handleClickLogin}>Login</button>
            <p>Not registered yet? <a href='/signup'>Create an account</a></p>
        </div>
    )
}

export default Login;