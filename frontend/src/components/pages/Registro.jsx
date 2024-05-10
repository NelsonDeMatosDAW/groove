import React, { useState } from 'react';
import { Peticion } from '../../helpers/Peticion';
import './css/Registro.css';

export const Registro = () => {

  let [mensaje, setMensaje] = useState('');
  let [error, setError] = useState('');

    //Importamos url del backend
    const urlBack = import.meta.env.VITE_BACKEND_URL || "http://localhost:3900/api";
    //URL donde realizamos la peticion
    const url = `${urlBack}/registro/`;

    //Funcion que actua al pulsar el boton de registrar
    const handleSubmit = async (event) => {
      event.preventDefault();

      //Conseguir datos del form
      const form = event.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      let nombre = data.nombre;
      let rol = data.rol;
      let email = data.email;
      let contra = data.contra;

      let datosGuardar = {
        nombre,
        rol,
        email,
        contra
      }

      console.log(datosGuardar)

      if(nombre.length <= 0 || contra.length <= 0 || !email || !rol){
        setError('Los campos deben tener contenido');
      }else{
        try {
          const {datos, cargando} = await Peticion(url, "POST", datosGuardar);
  
          console.log(datos.status);
          console.log(datos.mensaje);
  
          if(datos.status === "ok"){
            setMensaje(datos.mensaje);
            setError('');
          }else{
            setMensaje('');
            setError(datos.mensaje || 'Error al crear usuario');
          }
        } catch (error) {
          console.log(error)
          setMensaje('');
          setError('Error al realizar la solicitud');
        }
      }
      
    }
    
  return (
    
    <div className="form-container form-blanco">

    <h1>Crear cuenta</h1>

    <p>Creá nuevos usuarios.</p>

    <form id="register-form" onSubmit={handleSubmit}>
      <label htmlFor="nombre" className="sr-only">nombre</label>
      <input type="text" name="nombre" id="nombre" placeholder="Nombre de usuario"/>

      <label htmlFor="email" className="sr-only">Email</label>
      <input type="email" name="email" id="email" placeholder="Email"/>

      <label htmlFor="rol" className="sr-only">Rol</label>
      <select name='rol' className='select-rol-registro'>
        <option>CLIENTE</option>
        <option>DJ</option>
        <option>ADMINISTRADOR</option>
      </select>

      <label htmlFor="contra" className="sr-only">contra</label>
      <input type="password" name="contra" id="contra" placeholder="Contraseña"/>

      <button type="submit">Iniciar sesión</button>

      <p className="error">{error}</p>
      <p id="correcto">{mensaje}</p>
    </form>
    <p>Gracias por confiar en Groove Call</p>
    </div>

  )
}
