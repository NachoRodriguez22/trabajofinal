import React, { useState, useEffect } from 'react';
import { Navbar } from "./components/templates/Navbar";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/pages/Login";
import { Tienda } from "./components/pages/Tienda";
import { Contact } from "./components/pages/Contact";
import { AdminPanel } from "./components/pages/Admin";
import { Panel } from "./components/pages/Panel";
import { CrearUsuario } from './components/pages/CrearUsuario';
import { UsuarioCreado } from './components/pages/UsuarioCreado';
import { LogoutConfirmation } from './components/common/LogoutConfirmado';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/crear-usuario" element={<CrearUsuario />} />
        <Route path="/usuario-creado" element={<UsuarioCreado />} />
        <Route path="/logout-confirmation" element={<LogoutConfirmation />} />
      </Routes>
    </>
  );
}

export default App;
