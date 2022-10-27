import './EditInfo.css'
import { Link } from 'react-router-dom'

const EditInfo = () =>{
    return(
        <div class="editinfo">
            <h2>Change Password</h2>
            <form>
                <label for="newPassword">New Password:</label><br></br>
                <input type="password" id="newPassword" name="newPassword" title="New password" /><br></br>
                <label for="confirmPassword">Confirm Password:</label><br></br>
                <input type="password" id="confirmPassword" name="confirmPassword" title="Confirm new password" /><br></br>
                <label for="token">Pasword Token:</label><br></br>
                <input type="text" id="token" name="token" title="Password Token" /><br></br>
                <p class="form-actions">
                    <Link to ="/profile">
                        <input type="submit" value="Change Password" title="Change password" />
                    </Link>
                </p>
            </form>
        </div>
        

    )

}
export default EditInfo