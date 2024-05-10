import React, { useEffect, useState } from 'react'
import { Peticion } from '../../helpers/Peticion';
import './css/AdminDj.css'; // css

//Importamos url del backend
const urlBack = import.meta.env.VITE_BACKEND_URL || "http://localhost:3900/api";

export const AdminDj = () => {
    //Estado para guardar las canciones
    let [canciones, setCanciones] = useState([]);

    //Estado para guardar el orden
    let [orden, setOrden] = useState('fecha_solicitud?direccion=1');
    //Estados para los mensajes
    let [mensaje, setMensaje] = useState('');
    let [error, setError] = useState('');

    useEffect(() => {
        const intervalId = setInterval(conseguirCanciones, 60000); // Ejecutar cada 1 minuto (60000 ms)
        
        // Limpieza al desmontar el componente
        return () => clearInterval(intervalId);
    
    }, []);
    
    //Efecto que se lanzara cuando se modifica el valor de orden (select)
    useEffect(() => {
        conseguirCanciones();
    }, [orden]);

//Función para adquirir las canciones de la BBDD
    const conseguirCanciones = async () => {
        const url = `${urlBack}/ordenar/${orden}`;
        try {
            let { datos } = await Peticion(url, "GET");
            console.log("Has ejecutado conseguirCanciones a la ruta "+url)
            if(!datos){ //Verifica si datos es null
                throw new Error('No se recibieron datos.');
            }
            if(datos.status === "ok"){
                setCanciones(datos.cancionesBBDD);
                setError('');
            }else{
                setError(datos.mensaje);
            }
        } catch (error) {
            setError("Se ha producido un error al intentar listar las canciones de la BBDD");
            console.log("Error: "+error);
        }
    }

    
//Función para borrar una canción de la BBDD
    const handleBorrar = async (e) => {
        const id_cancion = e.target.getAttribute('data-id');

        //URL donde realizamos la peticion
        let url = `${urlBack}/borrar/`;
    
        // Enviar cambios al servidor
        try {
            const {datos} = await Peticion(url+id_cancion, "DELETE");

            setMensaje(datos.mensaje)

            if(datos.status === "ok"){
                setMensaje("La canción se ha borrado correctamente");
                setError('');
                
            }else{
                setMensaje('');
                setError("Se ha producido un error");
            }
        } catch (error) {
            console.log("Error: "+error)
            setError('Hubo un error al intentar borrar la canción');
            setMensaje('');
        }

        //volvemos a llamar a la función para que consulte las canciones actualizadas
        conseguirCanciones();
    };

//Función para cambiar el estado de la cancion en la BBDD
    const handleReproducir = async (e) => {
        const id_cancion = e.target.getAttribute('data-id');

        //URL donde realizamos la peticion
        let url = `${urlBack}/editar/`;

        let cambioEstado = {
            estado: "reproducido"
        }
    
        // Enviar cambios al servidor
        try {
            const {datos} = await Peticion(url+id_cancion, "PUT", cambioEstado);

            setMensaje(datos.mensaje)

            if(datos.status === "ok"){
                setMensaje("La canción ha cambiado su estado a "+cambioEstado.estado);
                setError('');
                
            }else{
                setMensaje('');
                setError("Se ha producido un error");
            }
        } catch (error) {
            console.log("Error: "+error)
            setError('Hubo un error al intentar borrar la canción');
            setMensaje('');
        }

        //volvemos a llamar a la función para que consulte las canciones actualizadas
        conseguirCanciones();
    }

//Función para manejar el cambio de selección
    const handleOrdenChange = (e) => {
        setOrden(e.target.value); // Actualizar el estado con la nueva opción seleccionada
    };

    return (
        <>
            <div className='admin-container'>
                
                <div className='container_filtrar'>
                    <p>Ordenar por:</p>
                    <select defaultValue={orden} onChange={handleOrdenChange} onBlur={handleOrdenChange}>
                        <option value="fecha_solicitud?direccion=1">Fecha antigua</option>
                        <option value="fecha_solicitud?direccion=-1">Fecha nueva</option>
                        <option value="autor">Autor</option>
                        <option value="titulo">Título</option>
                    </select>
                </div>
                
                <h1>Canciones Pendientes</h1>
                <div className="table-container">
                    <table className="canciones-table table-pendientes">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Estado</th>
                                <th>Solicitante</th>
                                <th className='th-botones'>Borrar / Reproducir </th>
                            </tr>
                        </thead>
                        <tbody>
                            {canciones.map(cancion => (
                                cancion.estado === "pendiente" && (
                                <tr key={cancion._id}>
                                    <td>{cancion.titulo}</td>
                                    <td>{cancion.autor}</td>
                                    <td>{cancion.estado}</td>
                                    <td>{cancion.solicitante?.nombre}</td>
{   /*  <td>{new Date(cancion.fecha_solicitud).toLocaleString()}</td>   */}
                                    <td className='td-botones'>
                                        <button className='button-borrar' onClick={handleBorrar} data-id={cancion._id}>Borrar</button>
                                        <button className='button-reproducir' onClick={handleReproducir} data-id={cancion._id}>Reproducir</button>
                                    </td>
                                </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='mensajes'>
                    <p className="error">{error}</p>
                    <p id="correcto">{mensaje}</p>
                </div>

                <h1>Canciones Reproducidas</h1>
                <div className="table-container">
                    <table className="canciones-table table-reproducidas">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Estado</th>
                                <th>Solicitante</th>
                                <th>Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {canciones.map(cancion => (
                                cancion.estado === "reproducido" && (
                                <tr key={cancion._id}>
                                    <td>{cancion.titulo}</td>
                                    <td>{cancion.autor}</td>
                                    <td>{cancion.estado}</td>
                                    <td>{cancion.solicitante?.nombre}</td>
{   /*  <td>{new Date(cancion.fecha_solicitud).toLocaleString()}</td>   */}
                                    <td><button className='button-borrar' onClick={handleBorrar} data-id={cancion._id}>Borrar</button></td>
                                </tr>
                            )
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            
            
        </>
    

    )
}
