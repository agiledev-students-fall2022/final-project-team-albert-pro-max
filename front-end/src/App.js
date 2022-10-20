import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Profile from './Profile.js';
function App() {
  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            {/* a route to see about us page*/}
            <Route path="/" element={<Profile />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}


export default App;
