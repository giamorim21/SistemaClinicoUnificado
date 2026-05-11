import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/register.css";

function TelaCadastro() {
    const [nome, setNome] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cpf, setCpf] = useState("");
    const [genero, setGenero] = useState("");
    const [nacionalidade, setNacionalidade] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [consentimento, setConsentimento] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);

    const validarSenha = (s) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(s);

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

    const handleCadastro = async (e) => {
        e.preventDefault();
        setErro("");
        setSucesso(false);

        if (!nome || !dataNasc || !endereco || !cpf || !genero || !nacionalidade) {
            setErro("Preencha todos os campos obrigatórios.");
            return;
        }
        if (!email) { setErro("Informe um email válido."); return; }
        const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);
        if (!validarEmail(email)) { setErro("Formato de e-mail inválido."); return; }
        if (!validarCPF(cpf)) { setErro("Informe um CPF válido."); return; }
        if (senha !== confirmarSenha) { setErro("As senhas não coincidem."); return; }
        if (!validarSenha(senha)) {
            setErro("A senha deve ter 8+ caracteres, 1 letra maiúscula e 1 número.");
            return;
        }
        if (!consentimento) {
            setErro("É necessário aceitar o consentimento de privacidade.");
            return;
        }

        const paciente = {
            name: nome,
            email: email,
            cpf: cpf.replace(/\D/g, ""),
            birthDate: dataNasc,
            password: senha,
        };

        try {
            const response = await fetch("/api/pacients/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paciente),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao registrar paciente.");
            }
            setSucesso(true);
            setErro("");
            setNome(""); setDataNasc(""); setEndereco(""); setCpf("");
            setGenero(""); setNacionalidade(""); setEmail("");
            setSenha(""); setConfirmarSenha(""); setConsentimento(false);
        } catch (err) {
            setErro(err.message);
            setSucesso(false);
        }
    };

    return (
        <div className="register-wrapper min-vh-100 d-flex">
            {/* ── Coluna do Formulário ── */}
            <div className="col-lg-5 d-flex flex-column justify-content-center align-items-center p-4 p-md-5"
                 style={{ overflowY: "auto", maxHeight: "100vh" }}>
                <div className="register-form-card w-100" style={{ maxWidth: 480 }}>
                    <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold font-inter fs-7 mb-3">
                        Criar Conta
                    </span>
                    <h2 className="fw-bold font-poppins mb-1">Bem-vindo ao SCU!</h2>
                    <p className="text-secondary font-inter mb-4">
                        Preencha os dados para criarmos sua conta
                    </p>

                    <form onSubmit={handleCadastro}>
                        {/* ── Seção: Dados Pessoais ── */}
                        <div className="register-section mb-4">
                            <h6 className="fw-bold font-poppins text-primary mb-3">
                                <i className="bi bi-person-vcard me-2"></i>Dados Pessoais
                            </h6>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label fw-semibold font-inter fs-7">Nome completo</label>
                                    <div className="input-group register-input-group">
                                        <span className="input-group-text"><i className="bi bi-person"></i></span>
                                        <input type="text" className="form-control" placeholder="Digite seu nome completo"
                                               value={nome} onChange={(e) => setNome(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className="form-label fw-semibold font-inter fs-7">Data de nascimento</label>
                                    <div className="input-group register-input-group">
                                        <span className="input-group-text"><i className="bi bi-calendar3"></i></span>
                                        <input type="date" className="form-control" value={dataNasc}
                                               onChange={(e) => setDataNasc(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className="form-label fw-semibold font-inter fs-7">Gênero</label>
                                    <div className="input-group register-input-group">
                                        <span className="input-group-text"><i className="bi bi-gender-ambiguous"></i></span>
                                        <select className="form-select" value={genero}
                                                onChange={(e) => setGenero(e.target.value)} required>
                                            <option value="" disabled>Selecione</option>
                                            <option value="feminino">Feminino</option>
                                            <option value="masculino">Masculino</option>
                                            <option value="nao-binario">Não-binário</option>
                                            <option value="prefiro-nao-informar">Prefiro não informar</option>
                                            <option value="outro">Outro</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className="form-label fw-semibold font-inter fs-7">CPF</label>
                                    <div className="input-group register-input-group">
                                        <span className="input-group-text"><i className="bi bi-credit-card"></i></span>
                                        <input type="text" className="form-control" placeholder="000.000.000-00"
                                               value={cpf} onChange={(e) => setCpf(e.target.value)} inputMode="numeric" required />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className="form-label fw-semibold font-inter fs-7">Nacionalidade</label>
                                    <div className="input-group register-input-group">
                                        <span className="input-group-text"><i className="bi bi-globe"></i></span>
                                        <select className="form-select" value={nacionalidade}
                                                onChange={(e) => setNacionalidade(e.target.value)} required>
                                            <option value="" disabled>Selecione</option>
                                            <option value="brasileira">Brasileira</option>
                                            <option value="alemã">Alemã</option>
                                            <option value="portuguesa">Portuguesa</option>
                                            <option value="espanhola">Espanhola</option>
                                            <option value="italiana">Italiana</option>
                                            <option value="outra">Outra</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-semibold font-inter fs-7">Endereço</label>
                                    <div className="input-group register-input-group">
                                        <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
                                        <input type="text" className="form-control" placeholder="Rua, número, bairro, cidade"
                                               value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Seção: Dados de Acesso ── */}
                        <div className="register-section mb-4">
                            <h6 className="fw-bold font-poppins text-primary mb-3">
                                <i className="bi bi-shield-lock me-2"></i>Dados de Acesso
                            </h6>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label fw-semibold font-inter fs-7">E-mail</label>
                                    <div className="input-group register-input-group">
                                        <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                        <input type="email" className="form-control" placeholder="seuemail@exemplo.com"
                                               value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className="form-label fw-semibold font-inter fs-7">Senha</label>
                                    <div className="input-group register-input-group">
                                        <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                        <input type="password" className="form-control" placeholder="••••••••"
                                               value={senha} onChange={(e) => setSenha(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className="form-label fw-semibold font-inter fs-7">Confirmar senha</label>
                                    <div className="input-group register-input-group">
                                        <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                                        <input type="password" className="form-control" placeholder="••••••••"
                                               value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <small className="text-secondary font-inter">
                                        <i className="bi bi-info-circle me-1"></i>
                                        Mínimo 8 caracteres, 1 letra maiúscula e 1 número.
                                    </small>
                                </div>
                            </div>
                        </div>

                        {/* Consentimento LGPD */}
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" id="consentimento"
                                   checked={consentimento} onChange={(e) => setConsentimento(e.target.checked)} required />
                            <label className="form-check-label font-inter fs-7" htmlFor="consentimento">
                                Li e concordo com o{" "}
                                <a href="#" className="text-primary text-decoration-none fw-semibold">
                                    termo de consentimento e privacidade
                                </a>.
                            </label>
                        </div>

                        {/* Botão */}
                        <button type="submit" className="btn btn-primary w-100 py-2 fw-bold font-inter mb-3">
                            <i className="bi bi-person-plus me-2"></i>Criar Conta
                        </button>

                        {/* Mensagens */}
                        {erro && (
                            <div className="alert alert-danger py-2 text-center font-inter fs-7">{erro}</div>
                        )}
                        {sucesso && (
                            <div className="alert alert-success py-2 text-center font-inter fs-7">
                                Cadastro realizado com sucesso!
                            </div>
                        )}
                    </form>

                    {/* Divider */}
                    <div className="d-flex align-items-center my-3">
                        <hr className="flex-grow-1" />
                        <span className="mx-3 text-secondary fs-7 font-inter">ou</span>
                        <hr className="flex-grow-1" />
                    </div>

                    <p className="text-center font-inter fs-7 mb-0">
                        Já possui uma conta?{" "}
                        <Link to="/login" className="text-primary fw-semibold text-decoration-none">Entrar</Link>
                    </p>
                </div>
            </div>

            {/* ── Hero lateral ── */}
            <div className="col-lg-7 d-none d-lg-flex register-hero position-relative align-items-center justify-content-center">
                <div className="register-hero-overlay position-absolute top-0 start-0 w-100 h-100"></div>
                <div className="text-center text-white position-relative" style={{ zIndex: 2 }}>
                    <h1 className="display-5 fw-bold font-poppins mb-3">
                        Sistema Clínico<br />
                        <span className="text-accent">Unificado</span>
                    </h1>
                    <p className="lead font-inter opacity-75">
                        Crie sua conta e tenha acesso à gestão completa
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TelaCadastro;