// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.jsx';

// // Bootstrap (via npm)
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'bootstrap-icons/font/bootstrap-icons.css';


// // Seus estilos
// import './styles/global.css';
// import './styles/theme.css';

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Se você estiver usando CDN do Bootstrap, mantenha as tags no index.html.
// Se preferir via NPM, descomente a linha abaixo:
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);