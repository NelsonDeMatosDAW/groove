
export const Peticion = async (url, metodo, datosGuardar = null) => {
    const token = localStorage.getItem('jwt');

    let headers = {
        'Content-Type': 'application/json', // Default content type
        ...(token && {'Authorization': `${token}`}) // Add Authorization header if token exists
    };

    let opciones = {
        method: metodo,
        headers: headers
    };

    // Añadir el cuerpo de la solicitud para métodos POST y PUT
    if (metodo === "POST" || metodo === "PUT") {
        opciones.body = JSON.stringify(datosGuardar);
    }

    try {
        const respuesta = await fetch(url, opciones);

        if (!respuesta.ok) {
            // Si la respuesta del servidor no es satisfactoria, lanzamos un error
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }

        const datos = await respuesta.json(); // Asumimos que la respuesta es JSON
        return {
            datos,
            cargando: false
        };

    } catch (error) {
        console.error("Error en la petición:", error);
        return {
            datos: {
                status: 'error',
                mensaje: error.mensaje
            },
            cargando: false,
            error: error.message
        };
    }
}