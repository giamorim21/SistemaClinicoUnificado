import { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";

function TelaLogin() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");

  // Validador de CPF com dígitos verificadores
  const validarCPF = (valor) => {
    const c = (valor || "").replace(/\D/g, "");
    if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(c.charAt(i)) * (10 - i);
    let d1 = 11 - (soma % 11);
    d1 = d1 >= 10 ? 0 : d1;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(c.charAt(i)) * (11 - i);
    let d2 = 11 - (soma % 11);
    d2 = d2 >= 10 ? 0 : d2;
    return d1 === parseInt(c.charAt(9)) && d2 === parseInt(c.charAt(10));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErro("");
    setOk("");

    if (!cpf || !senha) {
      setErro("Preencha CPF e senha.");
      return;
    }

    if (!validarCPF(cpf)) {
      setErro("Informe um CPF válido.");
      return;
    }

    // Aqui você pode adicionar a chamada de API futuramente
    setOk("Login realizado com sucesso! (validação de CPF ok)");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-box">
          <h1>Bem-Vindo de volta!</h1>
          <p>Insira suas credenciais para realizar o login</p>

          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              inputMode="numeric"
              pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
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
                <input type="checkbox" /> Lembrar de mim por 30 dias
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

        {/* Carrossel mantido intacto */}
        <div className="brand-carousel" aria-label="logos de parceiros">
          <div className="brand-track">
            <img src="" alt="logo 1" />
            <img src="" alt="logo 2" />
            <img src="" alt="logo 3" />
            <img src="" alt="logo 4" />
            <img src="" alt="logo 5" />
            <img src="" alt="logo 6" />
            <img src="" alt="logo 1" />
            <img src="" alt="logo 2" />
            <img src="" alt="logo 3" />
            <img src="" alt="logo 4" />
            <img src="" alt="logo 5" />
            <img src="" alt="logo 6" />
          </div>
        </div>
      </div>

      <div className="login-right"></div>
    </div>
  );
}

export default TelaLogin;
