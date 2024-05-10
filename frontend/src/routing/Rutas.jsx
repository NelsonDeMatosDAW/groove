import { React } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importa useAuth de tu contexto

import { Inicio } from "../components/pages/Inicio";
import { Login } from "../components/pages/Login";
import { Registro } from "../components/pages/Registro";
import { Admin } from "../components/pages/Admin";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { AdminDj } from "../components/pages/AdminDj";
import { Buscador } from "../components/pages/Buscador";
import ProtectedRoute from "./ProtectedRoute";


export const Rutas = () => {
  const { token } = useAuth(); // Utiliza el token del contexto

  return (
    <BrowserRouter>
    {/**Layout */}
      <Header/>

    {/**Contenido central y rutas */}
      <section id="content" className="content">
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/inicio" element={<Inicio/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/admin" element={<Admin />} />
            {/* Rutas protegidas que requieren autenticación */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['CLIENTE']} />}>
            <Route path="/buscador" element={<Buscador />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['DJ']} />}>
            <Route path="/adminDj" element={<AdminDj />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['superAdmin']} />}>
            <Route path="/registro" element={<Registro />} />
          </Route>
          {/* Rutas adicionales para manejar errores o redirecciones */}
          <Route path="*" element={<Navigate to="/" />} />  {/* Redirecciona rutas desconocidas al inicio */}
        </Routes>
      </section>

      <Footer></Footer>

    </BrowserRouter>
  )
}
