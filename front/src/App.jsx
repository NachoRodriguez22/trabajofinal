import React from 'react';
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
import { ListUsers } from './components/common/ListUsers';
import { ProductDetail } from './components/common/ProductDetail';
import { UsersDetail } from './components/common/UsersDetail';
import { Product } from './components/pages/Products';
import { CreateProduct } from './components/pages/CreateProduct';
import { ImgUpload } from './components/common/ImgUpload';




function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/tienda/:id" element={<ProductDetail />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/logout-confirmation" element={<LogoutConfirmation />} />

        <Route path="/crear-usuario" element={<CrearUsuario />} />
        <Route path="/usuario-creado" element={<UsuarioCreado />} />

        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/users/:id" element={<UsersDetail />} />
        <Route path="/products" element={<Product />} />
        <Route path="/mod-products" element={<ImgUpload />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/img-upload/:id" element={<ImgUpload />} />
      </Routes>
    </>
  );
}

export default App;
