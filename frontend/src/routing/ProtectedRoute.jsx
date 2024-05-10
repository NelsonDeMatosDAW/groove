import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = (
  {allowedRoles}
) => {
  const token = localStorage.getItem('jwt');

  const user = token ? jwtDecode(token) : null;

  const userHasRequiredRole = user && allowedRoles.includes(user.rol);


  return userHasRequiredRole ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;