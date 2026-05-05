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
      // data = { token, name, email, role }
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
    <div className="login-container">
      <div className="login-left">
        <div className="login-box">
          <h1>Bem-Vindo de volta!</h1>
          <p>Insira suas credenciais para realizar o login</p>

          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <button type="submit" disabled={carregando}>
              {carregando ? "Entrando..." : "Entrar"}
            </button>

            {erro && <p style={{ color: "red", marginTop: "15px" }}>{erro}</p>}

            <div className="divider">or</div>

            <p className="signup">
              Ainda não possui uma conta? <Link to="/register">Cadastrar</Link>
            </p>
          </form>
        </div>

        <div className="brand-carousel" aria-label="logos de parceiros">
          <div className="brand-track">
            <img src="/assets/sus-logo.png" alt="logo 1" />
            <img src="/assets/hob-logo.png" alt="logo 2" />
            <img src="/assets/carmed-logo.webp" alt="logo 3" />
            <img src="/assets/sicredi-logo.png" alt="logo 4" />
            <img src="/assets/sus-logo.png" alt="logo 1" />
            <img src="/assets/hob-logo.png" alt="logo 2" />
            <img src="/assets/carmed-logo.webp" alt="logo 3" />
            <img src="/assets/sicredi-logo.png" alt="logo 4" />
          </div>
        </div>
      </div>

      <div className="login-right"></div>
    </div>
  );
}

export default TelaLogin;
