import './Signup.css'

const Signup = props => {
    function handleClickSignup() {
        window.location.href = "/login";
    }

    return (
        <>
            <h2>Signup</h2>

            <table>
                <tr>
                    <th>Username: </th>
                    <td><input type={"text"} placeholder='Type your username here...'></input></td>
                </tr>

                <tr>
                    <th>Email: </th>
                    <td><input type={"text"} placeholder='Type your email here...'></input></td>
                </tr>

                <tr>
                    <th>Password: </th>
                    <td><input type={"password"} placeholder='Type your password here...'></input></td>
                </tr>

                <tr>
                    <th>Confirm Password: </th>
                    <td><input type={"password"} placeholder='Type your password again...'></input></td>
                </tr>
            </table>

            <button onClick={handleClickSignup}>Signup</button>
        </>
    )
}

export default Signup;