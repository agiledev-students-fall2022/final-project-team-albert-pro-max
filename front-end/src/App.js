import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css';
import CoursePage from './CoursePage';
import ShoppingCart from './ShoppingCart';
import Profile from './Profile';
import CourseSearch from './CourseSearch';
import CourseDetails from './CourseDetails'
import Footer from './Footer';
import EditInfo from './EditInfo';
import Schedule from "./Schedule";

function App() {

  const [show, setShow] = useState(false) // should be an array of state

  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            <Route path="/coursepage" element={<CoursePage id={6}/>} />
            <Route path="/shoppingcart" element={<ShoppingCart id={6} show={show} setShow={setShow}/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/coursesearch" element={<CourseSearch />} />
            <Route path="/coursedetails" element={<CourseDetails />} />
            <Route path="/editinfo" element={<EditInfo />} />
            <Route path="/schedule" element={<Schedule show={show}/>} />
          </Routes>
        </main>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;