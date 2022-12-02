import './EditInfo.css'
import axios from "axios"


const EditEmail = (prop) =>{
    const jwtToken = localStorage.getItem("token");
    // console.log('jwtToken', jwtToken)
    
    const changeEmail = () => {
        const newEmail = document.getElementById("newEmail").value;
        axios.post('http://localhost:3001/profile/update/email', {
            newEmail: newEmail
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

    return(
        <div className="editinfo">
            <h2>Change email</h2>
            <label>New Email Address:</label><br></br>
            <input id="newEmail" name="newEmail" title="New Email" /><br></br>
            <p className="form-actions">
                <input type="submit" value="Change Email" title="Change Email" onClick={changeEmail}/>
            </p>
        </div>
        

    )

}
export default EditEmail