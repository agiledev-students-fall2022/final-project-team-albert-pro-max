import './Login.css'

const Login = props => {
    function handleClickLogin() {
        //TODO: check username and password via http response
        const username= document.getElementById('username').value
        //const password= document.getElementById('password').value
        localStorage.setItem('username',username)
        window.location.href = "/profile";
    }

    return (
        <div className='Login'>
            <h2>Login</h2>

            <table>
              <tbody>
                <tr>
                    <th>Username: </th>
                    <td><input type={"text"} id='username' placeholder='Type your username here...'></input></td>
                </tr>

                <tr>
                    <th>Password: </th>
                    <td><input type={"password"} id='password' placeholder='Type your password here...'></input></td>
                </tr>
                </tbody>
            </table>

            <button onClick={handleClickLogin}>Login</button>

            <p>Not registered yet? <a href='/signup'>Create an account</a></p>
        </div>
    )
}

export default Login;