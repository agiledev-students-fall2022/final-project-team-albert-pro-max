import'./Profile.css'
import ProfileLogo from './ProfileLogo.jpeg'
import { Link } from 'react-router-dom'
import Popup from './Popup'
import { useState } from 'react'

/**
 * A React component that represents the profile page of the app.
 * @param {*} param0 an object holding any props and a few function definitions passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Profile = props => {
  const [buttonPopup,setButtonPopup]=useState(false);
    return (
      <>
        <div class="image-txt-container">
            <img src={ProfileLogo} alt="profile logo" width="120" height="120" />
            <h2>
                username
            </h2>
        </div>
        <p>netID@nyu.edu</p>
        {/* <div class='pop-up'>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3>This is a popup window</h3>
          </Popup>
        </div> */}
        <div class='options'>
            <Link to='/edituser'>
              <button class="button" >reset username<br></br></button>
            </Link>
            <Link to ="/editinfo">
              <button class="button" >reset password<br></br></button>
            </Link>
            <Link to='/editemail'>
              <button class="button" >reset email<br></br></button>
            </Link>
            
        </div>
        
       
        
      </>
    )
  }

  export default Profile;