import './EditInfo.css'
import axios from "axios"
import { useEffect } from 'react'

const EditUser = (prop) => {

    useEffect(() => {
        document.title = "Update Username - AlbertProMax";
    }, []);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const jwtToken = localStorage.getItem("token");
    // console.log('jwtToken', jwtToken)

    const changeUsername = () => {
        const newUsername = document.getElementById("newUsername").value;
        console.log(newUsername);
        axios.post(`${BASE_URL}/profile/update/username`, {
            newUsername: newUsername
        }, {
            headers: { Authorization: `Bearer ${jwtToken}` }
        })
            .then(function (response) {
                console.log('enter here');
                console.log(response);
                localStorage.setItem("token", jwtToken);
                window.location.href = "/profile";
            })
            .catch(function (error) {
                console.log('enter error');
                console.log(error);
            });
    };

    return (
        <div className="editinfo">
            <h2>Change Username</h2>
            <label>New Username:</label><br></br>
            <input id="newUsername" name="newUsername" title="New UserName" /><br></br>
            <p className="form-actions">
                <input type="submit" value="Change username" title="Change username" onClick={changeUsername} />
            </p>
        </div>


    )

}
export default EditUser