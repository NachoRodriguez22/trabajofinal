import React, { useState, useEffect } from 'react';
import { Navbar } from "./components/templates/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./components/pages/Login";
import { Tienda } from "./components/pages/Tienda";
import { Contact } from "./components/pages/Contact";
import { Admin } from "./components/pages/Admin";
import { AdminPanel } from "./components/pages/AdminPanel";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    navigate('/'); // Redirige al panel de administración
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <AdminPanel />
            ) : (
              <Login onSignIn={handleSignIn} />
            )
          }
        />
        <Route path={"/tienda"} element={<Tienda />} />
        <Route path={"/contacto"} element={<Contact />} />
        <Route path={"/admin"} element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;