import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/login.js'
import Nav from './components/nav';
import Home from './components/home';
import AdminDash from './components/adminDash.js'

function App() {
  return (
    <>
      <div className='page'>
        <Router>
          <Nav />
          <Routes>
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="home/admin" element={<AdminDash />} />
          </Routes>
        </Router>
      </div>
    </>
  );

}
export default App;
