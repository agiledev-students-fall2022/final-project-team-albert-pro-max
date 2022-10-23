import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import CoursePage from './CoursePage';
import ShoppingCart from './ShoppingCart';
import Profile from './Profile';
import CourseSearch from './CourseSearch';
import CourseDetails from './CourseDetails'
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            <Route path="/coursepage" element={<CoursePage id={6}/>} />
            <Route path="/shoppingcart" element={<ShoppingCart id={6}/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/coursesearch" element={<CourseSearch />} />
            <Route path="/coursedetails" element={<CourseDetails />} />
          </Routes>
        </main>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;