import React from 'react';
import './App.css';
import { Navigate, Outlet, Route, Routes, } from 'react-router-dom';
import DashboardLayout from './components/layouts/dashboardLayout/dashboardLayout';
import SignIN from './pages/authFlow/signIn/signIn';
import SignUp from './pages/authFlow/signUp/signUp';
import VerifyCode from './pages/authFlow/verifyCode/verifyCode';
import ForgotPassword from './pages/authFlow/forgotPassword/forgotPassword';
import ChangePassword from './pages/authFlow/changePassword/changePassword';
import NotFound from './pages/notFound/notFound';
import Cookies from "js-cookie";



function App() {

  const PrivateRoute = () => {
    const auth = Cookies.get('token', { path: '/' });
    return auth ? <Outlet /> : <Navigate to="/" />;
  }

  const PublicRoute = () => {
    const auth = Cookies.get('token', { path: '/' });
    return auth ? <Navigate to="/dashboard" /> : <Outlet />;
  }


  return (
    <>
      <Routes>
        <Route path='' element={<PublicRoute />}>
          <Route path='/' element={<SignIN />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/verify-code/:type' element={<VerifyCode />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/forgot-password/change-password' element={<ChangePassword />} />
        </Route>
        <Route path='' element={<PrivateRoute />}>
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<h1>page</h1>} />
            <Route path='*' element={<NotFound />}>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>

  );
}

export default App;
