// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import AllTasks from './pages/AllTasks';
import ImportantTasks from './pages/ImportantTasks';
import CompletedTasks from './pages/CompletedTasks';
import PendingTasks from './pages/PendingTasks';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

function App() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
    else if (isLoggedIn === false) {
      navigate('/register');
    }
  }, [])
  return (
    <div className='bg-gray-900 h-screen text-white p-2 relative'>
      <Routes>
        <Route exact path='/' element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path='/importanttasks' element={<ImportantTasks />} />
          <Route path='/completedTasks' element={<CompletedTasks />} />
          <Route path='/pendingTasks' element={<PendingTasks />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
