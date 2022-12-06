import './EditInfo.css'
import axios from "axios"

const EditPassword = (prop) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const jwtToken = localStorage.getItem("token");
    // console.log('jwtToken', jwtToken)

    const changePassword = () => {
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        if (newPassword !== confirmPassword) {
            const popup = document.getElementById("myPopup");
            popup.classList.toggle("show");
        } else {
            axios.post(`${BASE_URL}/profile/update/password`, {
                newPassword: newPassword
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
        }
    };

    return (
        <div className="editinfo">
            <h2>Change Password</h2>
            <label>New Password:</label><br></br>
            <input type="password" id="newPassword" name="newPassword" title="New password" /><br></br>
            <label>Confirm Password:</label><br></br>
            <input type="password" id="confirmPassword" name="confirmPassword" title="Confirm new password" /><br></br>
            <p className="form-actions">
                <input type="submit" value="Change Password" title="Change password" onClick={changePassword} />
                <br></br>
                <span className="popuptext" id="myPopup">Confirm Password Failed</span>
            </p>
        </div>


    )

}
export default EditPassword