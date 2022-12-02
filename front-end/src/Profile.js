import './Profile.css'
import ProfileLogo from './ProfileLogo.jpeg'
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

/**
 * A React component that represents the profile page of the app.
 * @param {*} param0 an object holding any props and a few function definitions passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Profile = props => {

  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  // console.log(`JWT token: ${jwtToken}`); // debugging
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/profile', {
        headers: { Authorization: `Bearer ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then(response => {
        setUser(response.data.user)
      })
      .catch(err => {
        console.log(err);
        setIsLoggedIn(false);
      })
  }, [])
  
  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="image-txt-container">
            <img src={ProfileLogo} alt="profile logo" width="120" height="120" />
            <h2>
              {user.username}
            </h2>
          </div>

          <p>{user.email}</p>

          <div className='options'>
            <Link to='/edituser'>
              <button className="button" >reset username<br></br></button>
            </Link>
            <Link to="/editinfo">
              <button className="button" >reset password<br></br></button>
            </Link>
            <Link to='/editemail'>
              <button className="button" >reset email<br></br></button>
            </Link>
            <Link to='/login'>
              <button className="button"> log out <br></br></button>
            </Link>
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  )
}

export default Profile;