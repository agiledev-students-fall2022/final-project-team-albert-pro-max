import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import CoursePage from './CoursePage';
import ShoppingCart from './ShoppingCart';
import Profile from './Profile'

function App() {
  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            {/* a route to see a list of all messages */}
            <Route path="/coursepage" element={<CoursePage id={6}/>} />
            <Route path="/shoppingcart" element={<ShoppingCart id={6}/>} />
            <Route path="/profile" element={<Profile id={6}/>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
