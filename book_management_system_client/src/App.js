import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import './App.css';

import NavBar from './components/NavBar';

import Home from './pages/Home';
import Login from './pages/Login';
import Singup from './pages/Singup';

function App() {

  const getToken = () => {
    return localStorage.getItem("authToken")
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to={'/'} />
  }

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to={'/'} />
  }

  return (
    <div className="App">

      <NavBar />
      <br />
      <br />
      <br />
      <br />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route element={<LoggedIn />} >

        </Route>

        <Route element={<NotLoggedIn />} >
          <Route path='/signup' element={<Singup />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
