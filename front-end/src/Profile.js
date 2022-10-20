import'./Profile.css'
import ProfileLogo from './ProfileLogo.jpeg'
import { Link } from 'react-router-dom'
/**
 * A React component that represents the profile page of the app.
 * @param {*} param0 an object holding any props and a few function definitions passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Profile = props => {
    return (
      <>
        <div class="image-txt-container">
            <img src={ProfileLogo} alt="profile logo" width="120" height="120" />
            <h2>
                username
            </h2>
        </div>
        <p>netID@nyu.edu</p>
        <div class='options'>
            <button type="button">reset username<br></br></button>
            <button type="button">reset password<br></br></button>
            <button type="button">reset email<br></br></button>
        </div>
       
        
      </>
    )
  }

  export default Profile;
