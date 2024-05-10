import React, { useEffect, useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom';
import decoToken from "../../helpers/decoToken";
import { useNavigate } from "react-router-dom";


export const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [modo, setModo] = useState(false);

  const [mostrarDiv, setMostrarDiv] = useState(false);

  //Obtenemos navigate
  const navigate = useNavigate();
  const token = decoToken();

    //UseEffect para mostrar el div
    useEffect(() => {
      setMostrarDiv(!!token);
    }, [token]);

  let rol = null;
  if(token){
    rol = token.rol;
  }
  
  let urlMenu = "buscador";
  if(rol === "admin"){
    urlMenu= "admin";
  }
  if(rol === "cliente"){
    urlMenu= "buscador";
  }
  if(rol === "DJ"){
    urlMenu= "adminDj";
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const cambiarModo = () => {
    setModo(!modo);
    console.log(modo);
    document.body.classList.toggle('dark-mode');
    
  }

  const cerrarSesion = () => {
    localStorage.removeItem('jwt');
    setMostrarDiv(false);
    navigate("/");
  }

  return (
    <>
      <header className={`header ${menuOpen ? 'menu-open' : ''} ${modo ? 'dark-mode' : ''}`}>
        <div className='logo'>
          <h1>Groove<b>Call</b></h1>
        </div>
        <nav>
          <button className='menu-button' onClick={toggleMenu}>
            ☰
          </button>
          <ul className={menuOpen ? 'open' : 'close'}>
            <li><NavLink to="/inicio" activeclass="active" onClick={toggleMenu}>Inicio</NavLink></li>
            <li><NavLink to="/login" activeclass="active" onClick={toggleMenu}>Login</NavLink></li>
            <li><NavLink to={'/'+urlMenu} activeclass="active" onClick={toggleMenu}>Tu espacio</NavLink></li>
          </ul>
        </nav>
        
        {mostrarDiv && (
          <div className='iconoCerrar'>
            <img className='iconoLogo'
              src={`/img/cerrar.png`}
              alt={"cerrar_sesion"} 
              onClick={cerrarSesion} 
            />
          </div>
        )}
        <div className='divCerrarDark'>
          
          <div className='iconoDark'>
            <img className='iconoLogo'
              src={`/img/${modo ? 'sol2.png' : 'luna.png'}`}
              alt={modo ? 'Sol' : 'Luna'} 
              onClick={cambiarModo} 
            />
          </div>
        </div>
        
      </header>
    </>
  )
}
