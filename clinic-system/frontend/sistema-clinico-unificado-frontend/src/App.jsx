import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";
import "./styles/theme.css";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
      </Routes>
    </BrowserRouter>
  );
}
