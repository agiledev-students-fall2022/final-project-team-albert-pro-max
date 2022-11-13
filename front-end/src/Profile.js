import'./Profile.css'
import { Link } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'

/**
 * A React component that represents the profile page of the app.
 * @param {*} param0 an object holding any props and a few function definitions passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Profile = props => {
  //const [buttonPopup,setButtonPopup]=useState(false);
  //const random = Math.floor(Math.random() * mockUsers.length);
  //const user = mockUsers[random];
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3001/profile')
      .then(response => {
        setUser(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
    return (
      <>
        <div className="image-txt-container">
            <img src={user.profile_img} alt="profile logo" width="120" height="120" />
            <h2>
                {user.username}
            </h2>
        </div>
        <p>{user.email}</p>
        {/* <div class='pop-up'>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3>This is a popup window</h3>
          </Popup>
        </div> */}
        <div className='options'>
            <Link to='/edituser'>
              <button className="button" >reset username<br></br></button>
            </Link>
            <Link to ="/editinfo">
              <button className="button" >reset password<br></br></button>
            </Link>
            <Link to='/editemail'>
              <button className="button" >reset email<br></br></button>
            </Link>
            <Link to ='/Signup'>
              <button className="button"> log out <br></br></button>
            </Link>
            
        </div>
        
       
        
      </>
    )
  }

  export default Profile;