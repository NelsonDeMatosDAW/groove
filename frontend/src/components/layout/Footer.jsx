import React from 'react'
import { FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

import "./css/footer.css";

export const Footer = () => {
  return (
    <>
    <div className='fondoFooter'>
      <div className='tarjetasContacto'>
        <div className='tarjeta'>
          <FaHome className='iconosTarjeta' style={{ color: 'white' }}/>
          <h4>Dirección</h4>
          <hr></hr>
          <a>Madrid</a>
        </div>
        <div className='tarjeta'>
          <MdEmail className='iconosTarjeta' style={{ color: 'white' }}/>
          <h4>Email</h4>
          <hr></hr>
          <a href="mailto:nelsondematos16@gmail.com?subject=Interesados%20en%20su%20perfil%20profesional">Contacto correo</a>
        </div>
        <div className='tarjeta'>
          <FaPhone className='iconosTarjeta' style={{ color: 'white' }}/>
          <h4>WhatsApp</h4>
          <hr></hr>
          <a target="_blank" href="https://api.whatsapp.com/send?phone=%2B34638851459&amp;text=Hola%21%21%21+estamos+interesados+en+tu+perfil+profesional."><IoLogoWhatsapp className='iconoTarjetaEnlace'/></a>
        </div>
      </div>

      <div className='iconosSociales'>
        <div><a href='https://www.linkedin.com/in/nelsondematos/' target='_blank' rel='noopener noreferrer'><FaLinkedinIn className='iconoRed'></FaLinkedinIn></a></div>
        <div><a href='https://www.instagram.com/nmgravity_visuals/?igshid=OGQ5ZDc2ODk2ZA%3D%3D' target='_blank' rel='noopener noreferrer'><FaInstagram className='iconoRed'/></a></div>
        <div><a href='https://www.youtube.com/channel/UCucHGT1Xkt2wPraXGlDdiNA' target='_blank' rel='noopener noreferrer'><FaYoutube className='iconoRed'/></a></div>
      </div>

      <footer className='footer'>
        <div>&copy;GrooveCall</div> <div>Made by: <a href='https://www.linkedin.com/in/nelsondematos/' target='_blank'>nelsonDeMatosDesigner</a></div>
      </footer>
    </div>
    </>
    
  )
}
