import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import CoursePage from './CoursePage';

function App() {
  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            {/* a route to see a list of all messages */}
            <Route path="/coursepage" element={<CoursePage id={6}/>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
