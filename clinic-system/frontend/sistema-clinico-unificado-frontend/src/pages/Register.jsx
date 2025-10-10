import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/register.css";

function TelaCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const validarSenha = (senha) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(senha);

  const handleCadastro = (e) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);

    if (email !== confirmarEmail) {
      setErro("Os e-mails não coincidem.");
      return;
    }
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    if (!validarSenha(senha)) {
      setErro("A senha deve conter ao menos 8 caracteres, uma letra maiúscula e um número.");
      return;
    }

    // Simulação de cadastro somente no front-end
    setSucesso(true);
    // Se quiser “limpar” o formulário após sucesso:
    // setNome(""); setEmail(""); setConfirmarEmail(""); setSenha(""); setConfirmarSenha("");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-box">
          <h1>Bem vindo ao SCU!</h1>
          <p className="subtitle">Insira suas credenciasi, assim podemos criar sua conta</p>

          <form className="login-form" onSubmit={handleCadastro}>
            <label>Nome</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <label>Endereço de email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Confirme seu email</label>
            <input
              type="email"
              placeholder="Confirm your email"
              value={confirmarEmail}
              onChange={(e) => setConfirmarEmail(e.target.value)}
              required
            />

            <label>Senha</label>
            <input
              type="password"
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <label>Confirme sua senha</label>
            <input
              type="password"
              placeholder="********"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />

            <div className="form-options">
              <label>
                <input type="checkbox" required /> I agree to the <a href="#">terms &amp; policy</a>
              </label>
            </div>

            <button type="submit">Criar</button>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            {sucesso && <p style={{ color: "green" }}>Cadastro realizado com sucesso! (somente front-end)</p>}

            <div className="divider">or</div>

            <p className="signup">
              Já possui uma conta? <Link to="/login">Entrar</Link>
            </p>
          </form>
        </div>
      </div>
      <div className="login-right"></div>
    </div>
  );
}

export default TelaCadastro;
