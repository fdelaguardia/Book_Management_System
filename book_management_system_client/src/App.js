import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';

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

      Welcome to your Book Management System
    </div>
  );
}

export default App;
