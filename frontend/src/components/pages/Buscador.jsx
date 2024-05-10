import React, { useState } from 'react'
import { Peticion } from '../../helpers/Peticion';
import "./css/Buscador.css";

//Importamos url del backend
const urlBack = import.meta.env.VITE_BACKEND_URL || "http://localhost:3900/api";

//Importamos la funcion que nos otorga el TOKEN decodificado
import decoToken from "../../helpers/decoToken";

export const Buscador = () => {
  const userToken = decoToken();

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  //Estados para manejar los inputs
  const [autor, setAutor] = useState('');
  const [titulo, setTitulo] = useState('');
  const [solicitante, setSolicitante] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!autor || !titulo){
      setError("Los campos autor y titulo deben tener contenido");
      setMensaje('');
    }else{
      //Recojo el solicitante del token 
      
      
      let opcionesCancion= {
        autor: autor,
        titulo: titulo,
        solicitante: userToken.id
      }
  
      //URL donde realizamos la peticion
      let url = `${urlBack}/crearCancion/`;
  
      try {
        //Enviamos datos al servidor
        const {datos} = await Peticion(url, "POST", opcionesCancion);
  
        if(datos.status === "ok"){
          setMensaje(datos.mensaje);
          setAutor('');
          setTitulo('')
        }else{
          setError(datos.mensaje);
        }
  
      } catch (error) {
        console.log(error)
        setError("Error al intentar enviar cancion");
      }
    }

  }

  return (
    <>
      <div className='fondoContainerFormBuscador'>
        <div className="form-container form-blanco" >
          <h1>Marca el ritmo <b className='nombreUsuario'>{userToken.nombre}</b></h1>

          <p>Envia tu canción al DJ.</p>

          <form id="login-form" onSubmit={handleSubmit}>
            <label htmlFor="autor" className="sr-only">Autor</label>
            <input 
              type="text" 
              name="autor" 
              id="autor" 
              placeholder="Autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
            
            <label htmlFor="titulo" className="sr-only">Titulo</label>
            <input 
              type="text" 
              name="titulo" 
              id="titulo" 
              placeholder="Titulo de la canción"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
              
            <button type="submit">Enviar</button>
          </form>

          <p className="error">{error}</p>
          <p id="correcto">{mensaje}</p>
              
        </div>
      </div>
    </>
  )
}
