import './Profile.css'
import ProfileLogo from './ProfileLogo.jpeg'
import NYU from './NYU-Symbol.png'
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

/**
 * A React component that represents the profile page of the app.
 * @param {*} param0 an object holding any props and a few function definitions passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Profile = props => {

  useEffect(() => {
    document.title = "Profile - AlbertProMax";
  }, []);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  console.log(`JWT token: ${jwtToken}`); // debugging
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile`, {
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

  const clearUser = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="image-txt-container">
            <img src={NYU} alt="profile logo" width="120" height="120" />
            <h2>
              {user.username}
            </h2>
          </div>

          <p id="email">{user.email}</p>

          <div className='options'>
            <Link to='/edituser'>
              <button className="button" >Reset Username<br></br></button>

            </Link>
            <Link to='/editpassword'>
              <button className="button" >reset password<br></br></button>

            </Link>
            <Link to='/editemail'>
              <button className="button" >Reset Email<br></br></button>
            </Link>
            <Link to='/login'>
              <button className="button" onClick={clearUser}> Log Out <br></br></button>
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