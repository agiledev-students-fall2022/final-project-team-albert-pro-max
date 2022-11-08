import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css';
import CoursePage from './CoursePage';
import ShoppingCart from './ShoppingCart';
import Profile from './Profile';
import CourseSearch from './CourseSearch';
import CourseDetails from './CourseDetails'
import Footer from './Footer';
import EditPassword from './EditPassword';
import EditUser from './EditUser';
import EditEmail from './EditEmail';
import Schedule from "./Schedule";
import Signup from "./Signup";
import Login from './Login';
import axios from 'axios';

function App() {

  const [show, setShow] = useState(false) // should be an array of state
  const [added, setAdd] = useState([])
  const BACKEND_PORT = 3000
  useEffect(() => {
    axios
      .get(`http://localhost:${BACKEND_PORT}/cart`)
      .then(response => {
        setAdd(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<CourseSearch />} />
            <Route path="/coursepage" element={<CoursePage />} />
            <Route path="/shoppingcart" element={<ShoppingCart added={added} show={show} setShow={setShow} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/coursesearch" element={<CourseSearch />} />
            <Route path="/coursedetails" element={<CourseDetails added={added} setAdd={setAdd} />} />
            <Route path="/editinfo" element={<EditPassword />} />
            <Route path="/edituser" element={<EditUser />} />
            <Route path="/editemail" element={<EditEmail />} />
            <Route path="/schedule" element={<Schedule show={show} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;