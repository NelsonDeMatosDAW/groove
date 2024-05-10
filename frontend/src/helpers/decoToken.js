import {jwtDecode} from "jwt-decode";

const decoToken = () => {
  const token = localStorage.getItem('jwt');
  let userRole = null;
  let userEmail = null;
  let userId = null;
  let userNombre = null;

  if (token) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.rol; // Obtenemos rol
    userEmail = decodedToken.email; //Obtenemos email
    userId = decodedToken.id; //
    userNombre = decodedToken.nombre; //

    const user =
    {
      id: userId,
      email: userEmail,
      rol: userRole,
      nombre: userNombre
    }
    return user;
  }
  return false;
}

export default decoToken;
