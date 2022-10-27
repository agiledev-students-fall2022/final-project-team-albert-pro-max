import './Login.css'

const Login = props => {
    function handleClickLogin() {
        window.location.href = "/profile";
    }

    return (
        <>
            <h2>Login</h2>

            <table>
                <tr>
                    <th>Username: </th>
                    <td><input type={"text"} placeholder='Type your username here...'></input></td>
                </tr>

                <tr>
                    <th>Password: </th>
                    <td><input type={"password"} placeholder='Type your password here...'></input></td>
                </tr>
            </table>

            <button onClick={handleClickLogin}>Login</button>

            <p>Not registered yet? <a href='/signup'>Create an account</a></p>
        </>
    )
}

export default Login;