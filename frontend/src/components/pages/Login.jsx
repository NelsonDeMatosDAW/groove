import React, {  useState } from 'react';
import { useNavigate } from "react-router-dom";
import decoToken from "../../helpers/decoToken";

//Importamos el componente de autorizacion
import { useAuth } from '../../context/AuthContext';

//Importamos url del backend
const urlBack = import.meta.env.VITE_BACKEND_URL || "http://localhost:3900/api";

export const Login = () => {
  //Obtenemos navigate
  const navigate = useNavigate();
  //obtemos el setToken del componente de autorizacion
  const { setToken } = useAuth();

  //Estados para los mensajes 
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  //Estado para el token
  const [tokenState, setTokenState] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const email = data.email;
    const contra = data.contra;
    
    if(email.length <= 0 || contra.length <= 0){
      setError('Los campos deben tener contenido');
    }else{

      try {
        const response = await fetch(`${urlBack}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        });
  
        const responseData = await response.json();
  
        if(response.ok){

          setToken(responseData.token);
          localStorage.setItem('jwt', responseData.token);

          const userToken = decoToken();
          if(userToken){
            console.log(userToken)
            
            if(userToken.rol === "CLIENTE"){
              navigate('/buscador');
            }
            if(userToken.rol === "admin"){
              navigate('/admin');
            }
            if(userToken.rol === "DJ"){
              navigate('/adminDj');
            }
            

            
          }

          

          setMensaje(responseData.mensaje);
          setError('');
        }else{
          setMensaje('');
          setError(responseData.mensaje || 'Error al iniciar sesión');
        }
      } catch (error) {
        setMensaje('');
        setError('Error al realizar la solicitud'+error);
      }

    }

  }


  return (

    <div className="form-container form-blanco" >
      <h1>Iniciar sesión</h1>

      <p>Ingresá tus credenciales para acceder.</p>

      <form id="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="sr-only">email</label>
        <input type="email" name="email" id="email" placeholder="Email"/>
        
        <label htmlFor="contra" className="sr-only">Contraseña</label>
        <input type="password" name="contra" id="contra" placeholder="Contraseña"/>
          
        <button type="submit">Iniciar sesión</button>
            
          <p className="error">{error}</p>
          <p id="correcto">{mensaje}</p>
      </form>
          
    </div>

  )
}
