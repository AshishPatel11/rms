import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/login.js'
import Nav from './components/nav';
import Home from './components/home';
import AdminDash from './components/admin/adminDash.js'
import AddUser from './components/admin/addUser.js'

function App() {
  return (
    <>
      <div className='page'>
        <Router>
          <Nav />
          <Routes>
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="home/adminDash" element={<AdminDash />} />
            <Route path="home/adminDash/addUser" element={<AddUser />} />
          </Routes>
        </Router>
      </div>
    </>
  );

}
export default App;
