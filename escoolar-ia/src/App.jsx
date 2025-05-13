import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import LoginScreen from "./components/LoginScreen";
import ProfileSelectionScreen from "./components/ProfileSelectionScreen";
import AnimatedCircuitBackground from "./components/AnimatedCircuitBackground";
import './App.css'

function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <AnimatedCircuitBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/select-profile" element={<ProfileSelectionScreen />} />
            {/* Agrega más rutas aquí */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;