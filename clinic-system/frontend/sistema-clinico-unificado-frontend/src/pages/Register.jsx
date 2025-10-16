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
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [consentimento, setConsentimento] = useState(false);

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);

    // Senha: 8+ chars, 1 maiúscula e 1 número
    const validarSenha = (s) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(s);

    // Validador de CPF (com dígitos verificadores)
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

        // Campos obrigatórios
        if (!nome || !dataNasc || !endereco || !cpf || !genero || !nacionalidade) {
            setErro("Preencha todos os campos obrigatórios.");
            return;
        }

        // CPF
        if (!validarCPF(cpf)) {
            setErro("Informe um CPF válido.");
            return;
        }

        // Senha
        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }
        if (!validarSenha(senha)) {
            setErro("A senha deve ter 8+ caracteres, 1 letra maiúscula e 1 número.");
            return;
        }

        // Consentimento LGPD
        if (!consentimento) {
            setErro("É necessário aceitar o consentimento de privacidade.");
            return;
        }

        // Calcula idade a partir da data de nascimento
        const calcularIdade = (dataNascimento) => {
            const hoje = new Date();
            const nasc = new Date(dataNascimento);
            let idade = hoje.getFullYear() - nasc.getFullYear();
            const m = hoje.getMonth() - nasc.getMonth();
            if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
                idade--;
            }
            return idade;
        };


        // Preparar objeto para enviar ao back-end
        const paciente = {
            fullName: nome,
            birthDate: dataNasc,
            age: calcularIdade(dataNasc), // adiciona a idade aqui
            gender: genero,
            address: endereco,
            cpf: cpf.replace(/\D/g, ""),
            nationality: nacionalidade,
            password: senha,
            consent: consentimento,
            consentDate: new Date().toISOString().split("T")[0]
        };


        try {
            const response = await fetch("http://localhost:8080/api/pacients/register", {
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
            // Limpar campos (opcional)
            setNome("");
            setDataNasc("");
            setEndereco("");
            setCpf("");
            setGenero("");
            setNacionalidade("");
            setSenha("");
            setConfirmarSenha("");
            setConsentimento(false);

        } catch (err) {
            setErro(err.message);
            setSucesso(false);
        }
    };

    return (
        <div className="register-wrapper">
            <div className="login-container">
                <div className="login-left">
                    <div className="login-box">
                        <h1>Bem vindo ao SCU!</h1>
                        <p className="subtitle">Preencha os dados para criarmos sua conta</p>

                        <form className="login-form" onSubmit={handleCadastro}>
                            <label>Nome</label>
                            <input
                                type="text"
                                placeholder="Digite seu nome completo"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />

                            <label>Data de nascimento</label>
                            <input
                                type="date"
                                value={dataNasc}
                                onChange={(e) => setDataNasc(e.target.value)}
                                required
                            />

                            <label>Endereço</label>
                            <input
                                type="text"
                                placeholder="Rua, número, bairro, cidade"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                required
                            />

                            <label>CPF</label>
                            <input
                                type="text"
                                placeholder="000.000.000-00"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                inputMode="numeric"
                                pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
                                required
                            />

                            <label>Gênero</label>
                            <select
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                required
                            >
                                <option value="" disabled>Selecione</option>
                                <option value="feminino">Feminino</option>
                                <option value="masculino">Masculino</option>
                                <option value="nao-binario">Não-binário</option>
                                <option value="prefiro-nao-informar">Prefiro não informar</option>
                                <option value="outro">Outro</option>
                            </select>

                            <label>Nacionalidade</label>
                            <select
                                value={nacionalidade}
                                onChange={(e) => setNacionalidade(e.target.value)}
                                required
                            >
                                <option value="" disabled>Selecione</option>
                                <option value="brasileira">Brasileira</option>
                                <option value="alemã">Alemã</option>
                                <option value="portuguesa">Portuguesa</option>
                                <option value="espanhola">Espanhola</option>
                                <option value="italiana">Italiana</option>
                                <option value="outra">Outra</option>
                            </select>

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
                                    <input
                                        type="checkbox"
                                        checked={consentimento}
                                        onChange={(e) => setConsentimento(e.target.checked)}
                                        required
                                    />{" "}
                                    Li e concordo com o{" "}
                                    <a href="#">termo de consentimento e privacidade</a>.
                                </label>
                            </div>

                            <button type="submit">Criar</button>

                            {erro && <p style={{ color: "red" }}>{erro}</p>}
                            {sucesso && (
                                <p style={{ color: "green" }}>
                                    Cadastro realizado com sucesso! (somente front-end)
                                </p>
                            )}

                            <div className="divider">or</div>

                            <p className="signup">
                                Já possui uma conta? <Link to="/login">Entrar</Link>
                            </p>
                        </form>
                    </div>
                </div>

                <div className="login-right"></div>
            </div>
        </div>
    );

}

export default TelaCadastro;