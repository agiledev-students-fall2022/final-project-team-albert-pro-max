import './EditInfo.css'
import { Link } from 'react-router-dom'

const EditUser = (prop) =>{
    return(
        <div className="editinfo">
            <h2>Change Username</h2>
            <form action='/profile'>
                <label>New Username:</label><br></br>
                <input id="newUsername" name="newUsername" title="New UserName" /><br></br>
                <p className="form-actions">
                    <input type="submit" value="Change username" title="Change username" />
                </p>
            </form>
        </div>
        

    )

}
export default EditUser