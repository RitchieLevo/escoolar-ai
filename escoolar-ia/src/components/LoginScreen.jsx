import React from "react";
import { useNavigate } from "react-router-dom";
import escoolarLogo from "../assets/escoolar-03.svg";

const LoginScreen = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar lógica de autenticación real
    // Por ahora, simplemente navega a la pantalla de selección de perfil
    navigate("/select-profile");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <img
        src={escoolarLogo}
        alt="Escoolar Logo"
        style={{
          width: 120,
          marginBottom: 16,
          filter: "drop-shadow(0 0 10px #fff3)",
        }}
      />
      <h2 className="mb-3 text-info">Inicia sesión en Escoolar IA</h2>
      <p className="mb-4 text-center" style={{ maxWidth: 350 }}>
        Accede a tu cuenta y deja que nuestros <strong>maestros virtuales con IA</strong> te acompañen en tu aprendizaje. ¡Relájate y aprende a tu ritmo, carnal!
      </p>
      <form className="w-100" style={{ maxWidth: 350 }} onSubmit={handleSubmit}>
        <div className="mb-3 text-start">
          <label htmlFor="login-username" className="form-label">
            Usuario o correo electrónico
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            id="login-username"
            placeholder="Tu usuario o email"
            autoComplete="username"
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="login-password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control bg-dark text-light"
            id="login-password"
            placeholder="Tu contraseña"
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn btn-info w-100 mb-3">
          Iniciar sesión
        </button>
        <div className="d-flex justify-content-between">
          <a href="/register" className="btn btn-outline-light btn-sm">
            Crear cuenta
          </a>
          <a href="/forgot-password" className="btn btn-link text-info btn-sm p-0">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;