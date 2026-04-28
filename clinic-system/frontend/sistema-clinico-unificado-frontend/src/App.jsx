import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import TelaLogin from "./pages/Login";
import TelaCadastro from "./pages/Register";
import DashboardPaciente from "./pages/DashBoardPaciente";
import DashBoardMedico from "./pages/DashBoardMedico";
import DashBoardAdmin from "./pages/DashBoardAdmin";

import "./styles/home.css";
import "./styles/components.css";
import "./styles/register.css";
import "./styles/login.css";

const fullPageRoutes = ["/dashboard-admin", "/dashboard-medico", "/dashboard-paciente"];

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

        <Route path="/dashboard-admin" element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
            <DashBoardAdmin />
          </ProtectedRoute>
        } />
        <Route path="/dashboard-medico" element={
          <ProtectedRoute allowedRoles={["ROLE_DOCTOR"]}>
            <DashBoardMedico />
          </ProtectedRoute>
        } />
        <Route path="/dashboard-paciente" element={
          <ProtectedRoute allowedRoles={["ROLE_PATIENT"]}>
            <DashboardPaciente />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideShell && <Footer />}
    </>
  );
}
