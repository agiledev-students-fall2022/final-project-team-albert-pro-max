// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';
function App() {
  return (
    <div className="App">
        <Router>
        <main className="App-main">
          <Routes>
            <Route path="/shoppingcart" element={<ShoppingCart id={6}/>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
