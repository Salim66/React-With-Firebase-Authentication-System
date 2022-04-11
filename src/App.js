import { useEffect, useState } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {

  // Auth check is user login or not
  const [authCheck, setAuthCheck] = useState(true);

  console.log(authCheck);

  // Auth Check Component
  const AuthCheck = ({ children }) => {
    return authCheck ? children : <Navigate to='/' />
  }

  useEffect(() => {
    let ss =  JSON.parse(sessionStorage.getItem('auth'));
    // console.log(ss);
    setAuthCheck(ss);
  }, [authCheck]);

  return (
    <>
      <Routes>
        <Route path='/' element={ <Login setAuthCheck={setAuthCheck} /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/profile' element={ <AuthCheck><Profile setAuthCheck={setAuthCheck} /></AuthCheck> } />
      </Routes>
    </>
  );
}

export default App;
