import React from "react";
import { Link } from "react-router-dom";
import escoolarLogo from '../assets/escoolar-03.svg';

const WelcomeScreen = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-light">
      <img
        src={escoolarLogo}
        alt="Escoolar Logo"
        style={{ width: 180, marginBottom: 24 }}
      />
      <h1 className="mb-3 text-info">¡Bienvenido a Escoolar IA!</h1>
      <p className="mb-4 text-center" style={{ maxWidth: 420 }}>
        Tu plataforma educativa ahora con <strong>inteligencia artificial</strong>. <strong>Maestros virtuales</strong> que te guiarán en cada sección, respondiendo tus dudas y enseñando temas chidos de manera personalizada. 
        <br /><br />
        Descubre cursos, infografías, clubes en vivo y mucho más, todo potenciado por IA para que tu aprendizaje sea más fácil, divertido y a tu ritmo.
      </p>
      <div>
        <Link to="/login" className="btn btn-primary me-2">
          Iniciar sesión
        </Link>
        <Link to="/register" className="btn btn-outline-primary">
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default WelcomeScreen;