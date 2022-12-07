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

function App() {
  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<CourseSearch />} />
            <Route path="/coursepage" element={<CoursePage />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/coursesearch" element={<CourseSearch />} />
            <Route path="/coursedetails" element={<CourseDetails />} />
            <Route path="/edituser" element={<EditUser />} />
            <Route path="/editemail" element={<EditEmail />} />
            <Route path="/editpassword" element={<EditPassword />} />
            <Route path="/schedule" element={<Schedule />} />
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