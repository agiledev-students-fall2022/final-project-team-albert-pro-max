import './EditInfo.css'
import { Link } from 'react-router-dom'

const EditEmail = (prop) =>{
    return(
        <div className="editinfo">
            <h2>Change email</h2>
            <form action='/profile'>
                <label>New Email Address:</label><br></br>
                <input id="newEmail" name="newEmail" title="New Email" /><br></br>
                <p className="form-actions">
                    <input type="submit" value="Change Email" title="Change Email" />
                </p>
            </form>
        </div>
        

    )

}
export default EditEmail