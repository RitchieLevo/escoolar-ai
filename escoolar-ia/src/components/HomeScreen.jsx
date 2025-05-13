import React, { useState } from "react";
import {
  FaThLarge,
  FaUser,
  FaBook,
  FaGlobe,
  FaChalkboardTeacher,
  FaTv,
  FaClipboardList,
  FaCogs,
  FaChartPie,
  FaLanguage,
  FaStore,
} from "react-icons/fa";

// Relación ítem-ícono
const sidebarItems = [
  { key: "aplicaciones", label: "Aplicaciones", icon: <FaThLarge /> },
  { key: "biografias", label: "Biografias", icon: <FaUser /> },
  { key: "biblioteca", label: "Biblioteca", icon: <FaBook /> },
  { key: "enciclopedia", label: "Enciclopedia", icon: <FaGlobe /> },
  { key: "cursos", label: "Cursos", icon: <FaChalkboardTeacher /> },
  { key: "escoolar-tv", label: "Escoolar TV", icon: <FaTv /> },
  { key: "materias-escolares", label: "Materias escolares", icon: <FaClipboardList /> },
  { key: "simuladores", label: "Simuladores", icon: <FaCogs /> },
  { key: "infografias", label: "Infografias", icon: <FaChartPie /> },
  { key: "ingles", label: "Inglés", icon: <FaLanguage /> },
  { key: "tienda", label: "Tienda", icon: <FaStore /> },
];

const cardData = [
  { key: "cursos", label: "Cursos" },
  { key: "clube-en-vivo", label: "Clube en Vivo" },
  { key: "infografias", label: "Infografías" },
  { key: "infovideos", label: "Infovideos" },
  { key: "favoritos", label: "Lista de Favoritos" },
  { key: "escoolar-tv", label: "Escoolar TV" },
  { key: "aplicaciones", label: "Aplicaciones" },
  { key: "biblioteca", label: "Biblioteca" },
  { key: "anatomia", label: "Anatomía" },
  { key: "simuladores", label: "Simuladores" },
  { key: "alquimia", label: "Alquimia" },
  { key: "geoescoolar", label: "Geoescoolar" },
];

const destacados = [
  { key: "destacado-1", label: "Destacado 1", description: "Descripción del destacado 1", color: "#17a2b8" },
  { key: "destacado-2", label: "Destacado 2", description: "Descripción del destacado 2", color: "#6dd5ed" },
  { key: "destacado-3", label: "Destacado 3", description: "Descripción del destacado 3", color: "#00bfae" },
  { key: "destacado-4", label: "Destacado 4", description: "Descripción del destacado 4", color: "#00c6ff" },
  { key: "destacado-5", label: "Destacado 5", description: "Descripción del destacado 5", color: "#2193b0" }
];

const SIDEBAR_COLLAPSED_WIDTH = 64;
const SIDEBAR_EXPANDED_WIDTH = 220;

// Carrusel simple para destacados
function DestacadosCarousel({ items }) {
  const [current, setCurrent] = useState(0);

  const goPrev = () => setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const goNext = () => setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  return (
    <div
      className="position-relative mb-4"
      style={{
        width: "100%",
        minHeight: 180,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Botón anterior */}
      <button
        className="btn btn-light position-absolute"
        style={{ left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 2, opacity: 0.7 }}
        onClick={goPrev}
        aria-label="Anterior"
      >
        ‹
      </button>
      {/* Slide actual */}
      <div
        className="card shadow-sm border-info mx-auto"
        style={{
          width: "100%",
          maxWidth: 700,
          minHeight: 160,
          background: `linear-gradient(90deg, ${items[current].color} 0%, #6dd5ed 100%)`,
          color: "#fff",
          transition: "background 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <h4 className="card-title fw-bold mb-2">{items[current].label}</h4>
          <p className="card-text text-center">{items[current].description}</p>
        </div>
      </div>
      {/* Botón siguiente */}
      <button
        className="btn btn-light position-absolute"
        style={{ right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 2, opacity: 0.7 }}
        onClick={goNext}
        aria-label="Siguiente"
      >
        ›
      </button>
      {/* Indicadores */}
      <div
        className="position-absolute w-100 d-flex justify-content-center"
        style={{ bottom: 20, left: 0 }}
      >
        {items.map((_, idx) => (
          <span
            key={idx}
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: idx === current ? "#fff" : "rgba(255,255,255,0.4)",
              margin: "0 10px 0 0",
              transition: "background 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  // Calcula el ancho actual del sidebar para ajustar el main
  const sidebarWidth = sidebarOpen ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Sidebar fijo */}
      <aside
        className={`custom-sidebar  text-white p-2 d-flex flex-column align-items-center`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          minWidth: sidebarWidth,
          maxWidth: sidebarWidth,
          width: sidebarWidth,
          boxShadow: "2px 0 8px rgba(0,0,0,0.04)",
          transition: "min-width 0.9s cubic-bezier(.4,2,.6,1), max-width 0.9s cubic-bezier(.4,2,.6,1), width 0.9s cubic-bezier(.4,2,.6,1)",
          zIndex: 1000,
          overflow: "hidden",
        }}
      >
        {/* Botón de expandir/retraer */}
        <button
          className="btn btn-outline-light mb-3 mt-2"
          style={{
            width: 40,
            height: 40,
            alignSelf: sidebarOpen ? "flex-end" : "center",
            transition: "align-self 0.8s",
          }}
          onClick={handleToggleSidebar}
          aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {/* Ícono de hamburguesa o flecha */}
          <span style={{ fontSize: 15, color: "#fff"}}>
            {sidebarOpen ? "«" : "☰"}
          </span>
        </button>
        {/* Título solo si está expandido */}
        <div
          className="sidebar-title"
          style={{
            height: sidebarOpen ? 40 : 0,
            opacity: sidebarOpen ? 1 : 0,
            transform: sidebarOpen ? "translateX(0)" : "translateX(-20px)",
            transition: "opacity 0.9s, height 0.9s, transform 0.9s",
            overflow: "hidden",
            marginBottom: sidebarOpen ? 24 : 0,
            marginTop: 0,
            width: "100%",
            textAlign: "left",
          }}
        >
          <h4 className="fw-bold mb-0">Menú</h4>
        </div>
        <ul className="nav flex-column gap-2 w-100">
          {sidebarItems.map((item) => (
            <li key={item.key} className="nav-item">
              <a
                href="#"
                className={`nav-link text-white fw-semibold d-flex align-items-center px-2 py-2`}
                style={{
                  borderRadius: 8,
                  gap: 12,
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  transition: "justify-content 0.2s",
                }}
              >
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <span
                  style={{
                    opacity: sidebarOpen ? 1 : 0,
                    maxWidth: sidebarOpen ? 200 : 0,
                    transform: sidebarOpen ? "translateX(0)" : "translateX(-20px)",
                    transition: "opacity 0.3s, max-width 0.3s, transform 0.3s",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                  }}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content desplazado a la derecha del sidebar */}
      <main
        className="p-4"
        style={{
          marginLeft: sidebarWidth,
          transition: "margin-left 0.3s cubic-bezier(.4,2,.6,1)",
        }}
      >
        {/* Sección de destacados como carrusel */}
        <section className="mb-4">
          <h5 className="fw-bold mb-3 text-info">Destacados</h5>
          <DestacadosCarousel items={destacados} />
        </section>

        {/* Grilla dinámica de cards con tamaños adaptativos */}
        <section>
          <div className="row g-4">
            {cardData.map((card, index) => {
              // Define tamaños variables para las cards
              const sizeClass =
                index % 5 === 0
                  ? "col-12 col-md-6 col-lg-8" // Card más grande
                  : index % 3 === 0
                  ? "col-6 col-md-4 col-lg-4" // Card mediana
                  : "col-6 col-md-3 col-lg-2"; // Card más pequeña

              return (
                <div key={card.key} className={sizeClass}>
                  <div
                    className="card h-100 shadow border-0"
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <div
                      className="card-body d-flex flex-column align-items-center justify-content-center"
                      style={{
                        background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
                        borderRadius: "16px",
                        padding: "20px",
                      }}
                    >
                      <div
                        className="mb-3"
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          background: "#17a2b8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: 28,
                          fontWeight: "bold",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        {card.label[0]}
                      </div>
                      <h6 className="fw-bold text-center">{card.label}</h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        </main>
        {/* Estilos adicionales para suavizar la animación */}
      <style>
        {`
        .custom-sidebar .nav-link {
          transition: background 0.2s;
        }
        .custom-sidebar .nav-link:hover {
          background: rgba(255,255,255,0.08);
        }
        `}
      </style>
    </div>
  );
};

export default HomeScreen;
