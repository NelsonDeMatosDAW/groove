import React, { useEffect, useState } from 'react'
import { Peticion } from '../../helpers/Peticion';
import './css/Admin.css'; // Importa CSS
import  decoToken  from "../../helpers/decoToken";

//Importamos url del backend
const urlBack = import.meta.env.VITE_BACKEND_URL || "http://localhost:3900/api";

export const Admin = () => {
  //Estado para los usuarios
  const [usuarios, setUsuarios] = useState([]);

  //Estados para los mensajes
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    conseguirUsuarios();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(conseguirUsuarios, 30000); // Ejecutar cada 1 minuto (60000 ms)
    
    // Limpieza al desmontar el componente
    return () => clearInterval(intervalId);

}, []);

//Decodificamos usuario
const userToken =decoToken();

  const url = `${urlBack}/listarUsuarios`;

  const conseguirUsuarios = async() => {

    try {

      const {datos, cargando} = await Peticion(url, "GET");
      if(datos.status === "ok"){
        setUsuarios(datos.usuariosBBDD);
        setError('');

      }else{
        console.error("Error en la petición: "+datos.mensaje);
        setMensaje('');
        setError(datos.mensaje);
      }

    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      setMensaje('');
      setError(error.mensaje);
    }
    
  }
  
  const handleCambiarContra = async (usuarioId) => {
    const nuevaContra = document.getElementById(`nuevaContra_${usuarioId}`).value;

    const urlContra = `${urlBack}/editarUsuario`;

    if(nuevaContra.length >= 1){

      try {
        //Realizar peticion para cambiar contraseña
        let datosCambio = {
          usuarioId: usuarioId,
          nuevaContra: nuevaContra
        }

        const {datos} = await Peticion(urlContra, "POST", datosCambio);

        if(datos.status === "ok"){
          setMensaje(datos.mensaje);
          setError('');
        }else{
          setError(datos.mensaje);
          setMensaje('');
        }
      } catch (error) {
        //Manejar errores
        setError("Error: "+error);
        setMensaje('')
      }
    }else{
      setError("La contraseña debe tener contenido");
    }
  }

  const handleBorrarUsuario = async (idUsuario) => {

    //Creamos url para enviar petición
    const urlBorrar = `${urlBack}/borrarUsuario`;

    try {
      //Enviamos petición, pasando parámetro id por url y guardamos respuesta en datos
      const {datos} = await Peticion(urlBorrar+idUsuario, "DELETE");

      if(datos.status === "ok"){
        setMensaje(datos.mensaje);
        setError('');
      }else{
        setError(datos.error);
        setMensaje('');
      }

    } catch (error) {
      console.log("Error: "+error);
      setError("No se ha podido eliminar usuario. Error interno del servidor");
    }

    conseguirUsuarios();
    
  }

  //Funcion que actua al pulsar el boton de registrar
  const handleSubmit = async (event) => {
        event.preventDefault();
  
        const urlRegistro = `${urlBack}/registrarUsuario`;
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
            const {datos, cargando} = await Peticion(urlRegistro, "POST", datosGuardar);
    
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

        conseguirUsuarios();
        
  }
  
  return (
    <>
      <div className="admin-container">
            <h1>Admin</h1>
            <div className="table-container">
                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Nombre</th>
                            <th>Rol</th>
                            <th className='th-botones'>Cambiar contraseña</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario._id}>
                                <td>{usuario.email}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.rol}</td>
                                <td className='td-botones'><input
                                                              className='inputTable'
                                                              type='text'
                                                              id={`nuevaContra_${usuario._id}`}
                                                              placeholder='Nueva contraseña'
                                                            >
                                                            </input>
                                                            <button 
                                                              className='botonTabla'
                                                              onClick={() => handleCambiarContra(usuario._id)}
                                                            >
                                                              Cambiar
                                                            </button>
                                                            <button 
                                                              className='button_borrarUsuario botonTabla' 
                                                              onClick={() => handleBorrarUsuario(usuario._id)}
                                                            >
                                                              Eliminar
                                                            </button>
                                  </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className='mensajes'>
          <p className="error">{error}</p>
          <p id="correcto">{mensaje}</p>
        </div>

   {/******************************Formulario de registro de usuarios******************************* */}
        <div className="form-container form-blanco">
          <h1>Crea cuenta.</h1>
          <p>Crea nuevos usuarios.</p>
          <form id="register-form" onSubmit={handleSubmit}>
            <label htmlFor="nombre" className="sr-only">nombre</label>
            <input type="text" name="nombre" id="nombre" placeholder="Nombre de usuario"/>

            <label htmlFor="email" className="sr-only">Email</label>
            <input type="email" name="email" id="email" placeholder="Email"/>

            <label htmlFor="rol" className="sr-only">Rol</label>
            <select name='rol' className='select-rol-registro'>
              <option value="" selected disabled>Elige tipo de cuenta</option> {/* Opción predeterminada y no seleccionable */}
              <option>Cuenta cliente</option>
              <option>Cuenta Dj</option>
            </select>

            <label htmlFor="contra" className="sr-only">contra</label>
            <input type="password" name="contra" id="contra" placeholder="Contraseña"/>

            <button type="submit">Crear usuario</button>

            <p className="error">{error}</p>
            <p id="correcto">{mensaje}</p>
          </form>
          <p>Gracias por confiar en Groove Call</p>
        </div>
    </>
    
  )
}
