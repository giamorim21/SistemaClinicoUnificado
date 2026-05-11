import { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { saveAuth } from "../utils/auth";

function TelaLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }

    setCarregando(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas.");
      }

      const data = await response.json();
      saveAuth(data);

      const role = data.role;
      if (role === "ROLE_MANAGER" || role === "ROLE_ADMIN") {
        navigate("/dashboard-admin");
      } else if (role === "ROLE_DOCTOR") {
        navigate("/dashboard-medico");
      } else {
        navigate("/dashboard-paciente");
      }
    } catch (err) {
      setErro(err.message || "Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-wrapper min-vh-100 d-flex">
      {/* ── Coluna do Formulário ── */}
      <div className="col-lg-5 d-flex flex-column justify-content-center align-items-center p-4 p-md-5">
        <div className="login-form-card w-100" style={{ maxWidth: 420 }}>
          <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold font-inter fs-7 mb-3">
            Área do Paciente
          </span>
          <h2 className="fw-bold font-poppins mb-1">Bem-vindo de volta!</h2>
          <p className="text-secondary font-inter mb-4">
            Insira suas credenciais para acessar o sistema
          </p>

          <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
            {/* E-mail */}
            <div>
              <label className="form-label fw-semibold font-inter fs-7">E-mail</label>
              <div className="input-group login-input-group">
                <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="form-label fw-semibold font-inter fs-7">Senha</label>
              <div className="input-group login-input-group">
                <span className="input-group-text"><i className="bi bi-lock"></i></span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold font-inter"
              disabled={carregando}
            >
              {carregando ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Entrando...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>Entrar
                </>
              )}
            </button>

            {/* Erro */}
            {erro && (
              <div className="alert alert-danger py-2 text-center font-inter fs-7 mb-0">
                {erro}
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="d-flex align-items-center my-4">
            <hr className="flex-grow-1" />
            <span className="mx-3 text-secondary fs-7 font-inter">ou</span>
            <hr className="flex-grow-1" />
          </div>

          {/* Link cadastro */}
          <p className="text-center font-inter fs-7 mb-0">
            Ainda não possui uma conta?{" "}
            <Link to="/register" className="text-primary fw-semibold text-decoration-none">
              Cadastrar
            </Link>
          </p>
        </div>
      </div>

      {/* ── Hero lateral ── */}
      <div className="col-lg-7 d-none d-lg-flex login-hero position-relative align-items-center justify-content-center">
        <div className="login-hero-overlay position-absolute top-0 start-0 w-100 h-100"></div>
        <div className="text-center text-white position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-5 fw-bold font-poppins mb-3">
            Sistema Clínico<br />
            <span className="text-accent">Unificado</span>
          </h1>
          <p className="lead font-inter opacity-75">
            Gestão completa para sua clínica em um só lugar
          </p>
        </div>
      </div>
    </div>
  );
}

export default TelaLogin;
