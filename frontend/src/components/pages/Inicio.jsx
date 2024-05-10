import React, { useEffect, useState } from 'react'
import "../pages/css/inicio.css";


export const Inicio = () => {
  
  return (
    <>
    <div className='titulo_fondo'>

      <div className='titulo'>
        <h1>Groove Call</h1>
        <h2>Toma el control de la noche.</h2>
      </div>
    </div>
{/*--------------------------------------PRESENTACION-----------------------------------------------*/}

    <div className='divPresentacion'>
      <div className='tarjetaFoto'>
        <img className='dj_fondo' src='/img/dj_loco_sin_fondo.png'></img>
      </div>

      <div className='tarjetaPresentacion'>
        <h2>¡Bienvenido a Groove <b>Call!</b></h2>
        <p>Revolucionando tu experiencia nocturna con la mejor música y la última tecnología 🎵.</p>
        <p>En Groove Call, te ponemos al control de la pista de baile. Solicita tus canciones favoritas
        directamente al DJ y disfruta al máximo de la noche.</p>
        <p>Con una interfaz fácil de usar, Groove Call hace que sea sencillo y divertido hacer tus peticiones musicales.
        Así que no esperes más, únete a nosotros y haz que cada noche sea una fiesta inolvidable.</p>
        <p id="advertencia">Únete a nosotros y podrás disfrutar de una nueva forma de experimentar la vida nocturna.</p>
      </div>
    </div>

{/*--------------------------------------TITULO INICIO-----------------------------------------------*/}
    <div className='divTituloInicio'>
      <h1>Tu música, <b>tu noche</b>, tu elección.</h1>
      <h3>Haz que cada fin de semana sea <b>inolvidable</b>.</h3>
    </div>
{/*--------------------------------------EN LA NOCHE-----------------------------------------------*/}
    <div className='divPresentacion'>

      <div className='tarjetaPresentacion'>
        <h2>En la noche</h2>
        <p>Groove Call es la plataforma interactiva que transforma tu experiencia en la discoteca. Con solo unos clics, solicita tus 
          canciones favoritas directamente al DJ y deja que la música guíe la noche. Ideal para clientes, DJs y propietarios de clubes.</p>
        <p>Donde Tú Eres el DJ</p>
        <p>Únete ahora y empieza a vivir tus noches al máximo. Crea tu cuenta y sumérgete en la experiencia Groove Call.</p>
      </div>

      <div className='tarjetaFoto'>
        <img src='/img/en_noche.jpeg'></img>
      </div>

    </div>

{/*--------------------------------------CLIENTES-----------------------------------------------*/}
    <div className='divPresentacionBeneficios'>
      <div className='tarjetaFoto'>
        <img src='/img/clientes.jpeg'></img>
      </div>
      <div className='divTextoBeneficios'> 
        <h2>Para clientes.</h2>
          <ul>
            <li><b>Solicita Canciones al Instante:</b> No esperes más para escuchar tus temas favoritos. ¡Pide y baila!</li>
            <li><b>Personaliza tu Noche:</b> Toma el control de la música y disfruta al máximo cada momento.</li>
            <li><b>Descubre Nueva Música:</b> Explora recomendaciones basadas en tus gustos y lo más solicitado en el club.</li>
            <li><b>Escucha lo que bailan tus amigos:</b> En el club tus amigos podrán el ritmo, tu podrás bailarlo. Otra canción para tu lista de me gusta</li>
          </ul>
      </div>
        
    </div>
    

{/*--------------------------------------DJS-----------------------------------------------*/}
  <div className='divPresentacionBeneficios'>
    <div className='tarjetaFoto'>
      <img src='/img/dj.jpeg'></img>
    </div>
    <div className='divTextoBeneficios'>
      <h2>Para Dj's`.</h2>
      <ul>
        <li><b>Conoce a tu Audiencia:</b> Recibe solicitudes de canciones en tiempo real y ajusta tu set para mantener la pista llena.</li>
        <li><b>Interacción Directa:</b> Crea una conexión única con tu público ajustando tu repertorio a sus preferencias.</li>
        <li><b>Herramientas de Análisis:</b> Utiliza datos analíticos para entender mejor las tendencias musicales y la demografía de tus asistentes.</li>
        <li><b>Historial de Peticiones:</b> Accede a un registro de peticiones anteriores para preparar sets más efectivos en futuras sesiones.</li>
      </ul>
    </div>



  </div>
{/*--------------------------------------PROPIETARIOS DE CLUBS-----------------------------------------------*/}

  <div className='divPresentacionBeneficios'>
    <div className='tarjetaFoto'>
      <img src='/img/propietario.jpeg'></img>
    </div>
    <div className='divTextoBeneficios'>
      <h2>Para propietarios de clubs.</h2>
      <ul>
        <li><b>Innovación en Tu Club:</b> Ofrece un servicio único que distingue a tu discoteca de las demás.</li>
        <li><b>Análisis de Preferencias Musicales:</b> Obtén datos valiosos sobre las preferencias musicales de tus clientes para futuros eventos y promociones.</li>
        <li><b>Aumento de la Satisfacción del Cliente:</b> Mejora la experiencia del cliente al hacerlos parte activa de la noche.</li>
        <li><b>Reportes Detallados:</b> Accede a informes detallados sobre la actividad musical que te ayudarán a tomar decisiones informadas sobre la programación y el futuro del club.</li>
      </ul>
    </div>



  </div>
    

      
  </>
    
  )
}
