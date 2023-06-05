import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/login.js'
import Nav from './components/nav';

function App() {
  return (
    <>
      <div className='page'>
        <Router>
          <Nav></Nav>
          <Login />
        </Router>
      </div>
    </>
  );

}

export default App;
