import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation'
import { publicRoutes, userRoutes, adminRoutes } from './Components/Navs'
import Footer from './Components/Footer';
import Shared from './Pages/Shared/Shared';

const App: React.FC = () => {
  const user = localStorage.getItem('user');
  let userData: any = {};

    if (user) {
        try {
            userData = JSON.parse(user);
        } catch (error) {
            localStorage.removeItem('user');
            userData = {};
        }
    }
  const isPublicUser = userData.role === 'user';
  const isAdmin = userData.role === 'admin';
  const userLogin = Object.keys(userData).length > 0 && isPublicUser;
  const admin = Object.keys(userData).length > 0 && isAdmin;

  return (
    <Router>
      <Navigation />
      <Routes>
        {!user && !isPublicUser && !isAdmin &&(
        publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        )))}

        {userLogin && !isAdmin &&(
        userRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        )))}

        {admin && (
        adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        )))}

        <Route path="/shared/:id" element={<Shared />} />
      </Routes>
      {!user && <Footer />}
    </Router>
  );
};

export default App;