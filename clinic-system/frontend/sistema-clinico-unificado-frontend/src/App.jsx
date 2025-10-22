import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TelaLogin from "./pages/Login";
import TelaCadastro from "./pages/Register";
// Importar o novo componente
import DashboardPaciente from "./pages/DashBoardPaciente"; 

import "./styles/home.css";
import "./styles/components.css";
import "./styles/register.css";
import "./styles/login.css";


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/register" element={<TelaCadastro />} />
        {/* Rota para o Dashboard do Paciente */}
        <Route path="/dashboard-paciente" element={<DashboardPaciente />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}