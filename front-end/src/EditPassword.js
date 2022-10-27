import './EditInfo.css'
import { Link } from 'react-router-dom'

const EditPassword = (prop) =>{
    return(
        <div className="editinfo">
            <h2>Change Password</h2>
            <form action='/profile'>
                <label>New Password:</label><br></br>
                <input type="password" id="newPassword" name="newPassword" title="New password" /><br></br>
                <label>Confirm Password:</label><br></br>
                <input type="password" id="confirmPassword" name="confirmPassword" title="Confirm new password" /><br></br>
                <p className="form-actions">
                    <input type="submit" value="Change Password" title="Change password" />
                </p>
            </form>
        </div>
        

    )

}
export default EditPassword