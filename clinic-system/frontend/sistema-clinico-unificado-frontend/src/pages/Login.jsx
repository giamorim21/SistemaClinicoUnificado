import { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";


function TelaLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setErro("");
    setOk("");

    // Validação básica no front-end
    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      setErro("Informe um e-mail válido.");
      return;
    }

  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-box">
          <h1>Bem-Vindo de volta!</h1>
          <p>Insira suas Crendencias para realizar o login</p>

          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <div className="form-options">
              <label>
                <input type="checkbox" />Lembrar de mim por 30 dias
              </label>
            </div>

            <button type="submit">Entrar</button>

            {erro && <p style={{ color: "red", marginTop: 8 }}>{erro}</p>}
            {ok && <p style={{ color: "green", marginTop: 8 }}>{ok}</p>}

            <div className="divider">or</div>

            <p className="signup">
              Ainda não possui uma conta? <Link to="/register">Cadastrar</Link>
            </p>
          </form>
        </div>
      </div>

      <div className="login-right"></div>
    </div>
  );
}

export default TelaLogin;
