import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TelaLogin from "./pages/Login";
import TelaCadastro from "./pages/Register";
// Importar o novo componente
import DashboardPaciente from "./pages/DashBoardPaciente";
import DashBoardMedico from "./pages/DashBoardMedico";
import DashBoardAdmin from "./pages/DashBoardAdmin";

import "./styles/home.css";
import "./styles/components.css";
import "./styles/register.css";
import "./styles/login.css";

// Rotas que usam layout próprio (sem Navbar/Footer globais)
const fullPageRoutes = ["/dashboard-admin"];

export default function App() {
  const location = useLocation();
  const hideShell = fullPageRoutes.includes(location.pathname);

  return (
    <>
      {!hideShell && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/register" element={<TelaCadastro />} />
        {/* Rota para o Dashboard do Paciente */}
        <Route path="/dashboard-paciente" element={<DashboardPaciente />} />
        <Route path="/dashboard-medico" element={<DashBoardMedico />} />
        <Route path="/dashboard-admin" element={<DashBoardAdmin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideShell && <Footer />}
    </>
  );
}