import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import LoginScreen from "./components/LoginScreen";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        {/* Agrega más rutas aquí */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
