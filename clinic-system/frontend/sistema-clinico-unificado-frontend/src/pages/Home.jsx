import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Section from "../components/Section";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      {/* Visão Geral (separada do carrossel) */}
      <Section id="visao-geral">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <div className="brand-left-border p-4 bg-white rounded-4 shadow-soft h-100">
              <h2 className="fw-bold mb-2">Visão Geral</h2>
              <p className="text-secondary mb-0">
                O SCU centraliza todas as etapas do atendimento clínico — do primeiro contato do paciente à consulta médica — em um sistema único.
                Com interfaces pensadas para cada perfil (paciente, recepção, triagem, médico e gestor), reduz papéis, elimina retrabalhos e
                fornece dados confiáveis para decisões mais rápidas.
              </p>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <img src="/assets/medico.jpg" alt="Médico" className="img-fluid rounded-4 shadow-soft" />
          </div>
        </div>
      </Section>

      {/* Carrossel de imagens */}
      <Carousel />

      {/* Quem Somos */}
      <Section id="quem-somos">
        <div className="card shadow-soft p-4 text-center">
          <h2 className="fw-bold mb-3">Quem Somos</h2>
          <p className="mx-auto" style={{ maxWidth: 800 }}>
            Somos uma equipe multidisciplinar dedicada a transformar a experiência clínica por meio da tecnologia.
            Nosso objetivo é simplificar o fluxo de atendimento, garantindo eficiência, segurança e centralização de dados para médicos, pacientes e gestores.
          </p>
        </div>
      </Section>

      {/* Motivo */}
      <Section id="motivo">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <div className="card shadow-soft mb-3">
              <div className="card-body p-4">
                <h2 className="fw-bold mb-2">Por que o SCU existe</h2>
                <ul className="list-bullets mb-0">
                  <li><strong>Excesso de processos manuais</strong>: formulários, cópias, retrabalho.</li>
                  <li><strong>Sistemas desconectados</strong>: informação fragmentada entre áreas.</li>
                  <li><strong>Tempo de espera alto</strong>: cadastros repetidos e filas desnecessárias.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-soft mb-3">
              <div className="card-body p-4">
                <h6 className="text-uppercase">Como resolvemos</h6>
                <ul className="small list-check mb-0">
                  <li><i className="bi bi-check2-circle me-2"></i>Jornada contínua e sem papel</li>
                  <li><i className="bi bi-check2-circle me-2"></i>Dados integrados em tempo real</li>
                  <li><i className="bi bi-check2-circle me-2"></i>Fluxos otimizados por perfil de usuário</li>
                </ul>
              </div>
            </div>
            <img src="/assets/hospital.jpg" alt="Descrição da imagem" className="img-fluid rounded-4 shadow-soft" />
          </div>
        </div>
      </Section>

      {/* Como funciona */}
      <Section id="como">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Como funciona</h2>
          <p className="text-secondary">Do app do paciente à plataforma clínica, tudo conectado</p>
        </div>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-4 bg-white rounded-4 shadow-soft h-100">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-phone-vibrate fs-2 text-primary me-2"></i><h5 className="mb-0">App do Paciente</h5>
              </div>
              <ul className="small text-secondary list-bullets mb-0">
                <li>Autocadastro seguro</li>
                <li>Chatbot de triagem com sugestão de especialista</li>
                <li>Histórico de consultas, exames e prescrições</li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white rounded-4 shadow-soft h-100">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-pc-display fs-2 text-primary me-2"></i><h5 className="mb-0">Plataforma Clínica</h5>
              </div>
              <ul className="small text-secondary list-bullets mb-0">
                <li>Recepção digital: busca, agendamento e check-in</li>
                <li>Triagem: sinais vitais e observações integradas</li>
                <li>Médico (PEP): evolução, pedidos e prescrições digitais</li>
                <li>Gestão: KPIs em tempo real e relatórios</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Capacidades */}
      <Section id="capacidades" className="bg-soft">
        <div className="text-center mb-5">
          <h2 className="fw-bold">O que o sistema é capaz de fazer</h2>
          <p className="text-secondary">Capacidades-chave para cada etapa do atendimento</p>
        </div>
        <div className="row g-4">
          {[
            {i:"bi-person-plus", t:"Autocadastro", d:"Crie perfis de pacientes com segurança e rapidez."},
            {i:"bi-chat-dots", t:"Triagem por Chatbot", d:"Coleta sintomas e sugere o especialista adequado."},
            {i:"bi-calendar-check", t:"Agendamento & Check-in", d:"Organize agendas e reduza filas e retrabalhos."},
            {i:"bi-journal-medical", t:"Prontuário Eletrônico", d:"Histórico unificado para decisões mais rápidas."},
            {i:"bi-activity", t:"Triagem Digital", d:"Registre sinais vitais e observações iniciais."},
            {i:"bi-file-earmark-plus", t:"Pedidos & Prescrições", d:"Solicite exames e gere prescrições digitais."},
            {i:"bi-graph-up", t:"Dashboards & KPIs", d:"Tempo de espera, picos de agenda e mais."},
            {i:"bi-diagram-3", t:"Integrações", d:"APIs e webhooks com ERPs e mensageria."},
          ].map((c, idx) => (
            <div className="col-sm-6 col-lg-3" key={idx}>
              <div className="cap card p-4 h-100">
                <i className={`${c.i} text-primary fs-3`}></i>
                <h6 className="mt-2">{c.t}</h6>
                <p className="small text-secondary mb-0">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefícios */}
      <Section id="beneficios">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Benefícios para cada perfil</h2>
          <p className="text-secondary">Mais agilidade para todos os envolvidos</p>
        </div>
        <div className="row g-4">
          {[
            {t:"Paciente", it:["Jornada digital antes de chegar","Transparência do histórico","Notificações e lembretes"]},
            {t:"Recepção", it:["Check-in rápido e sem papel","Busca e cadastro unificados","Agendamento simples"]},
            {t:"Triagem", it:["Visualização da triagem do chatbot","Registro de sinais vitais","Padronização de protocolos"]},
            {t:"Médico", it:["Visão completa do paciente","Evolução e diagnóstico","Pedidos e prescrições digitais"]},
            {t:"Gestor", it:["KPIs em tempo real","Relatórios por período","Governança e auditoria"]},
          ].map((b, idx)=>(
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="p-4 bg-white rounded-4 shadow-soft h-100">
                <h6>{b.t}</h6>
                <ul className="small text-secondary list-tight mb-0">
                  {b.it.map((x,i)=><li key={i}>{x}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Segurança */}
      <Section id="seguranca" className="bg-soft">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <h2 className="fw-bold mb-2">Segurança e Confiabilidade</h2>
            <ul className="text-secondary list-bullets mb-0">
              <li>Conformidade com a LGPD</li>
              <li>Criptografia em trânsito e em repouso</li>
              <li>Controle de acesso baseado em perfis (RBAC)</li>
              <li>Disponibilidade mínima de 99,5%</li>
              <li>Logs e trilhas de auditoria</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div className="card shadow-soft">
              <div className="card-body p-4">
                <h6 className="text-uppercase text-secondary">Qualidade de experiência</h6>
                <p className="small text-secondary mb-0">
                  Interface clara para pacientes e fluxos otimizados para profissionais. Dados consistentes refletidos em tempo real entre todos os módulos, com compatibilidade entre os principais navegadores modernos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Integrações */}
      <Section id="integracoes">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Integrações e arquitetura</h2>
          <p className="text-secondary">Aberto, escalável e pronto para crescer</p>
        </div>
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="p-4 bg-white rounded-4 shadow-soft h-100">
              <h6 className="text-uppercase text-secondary mb-2">Integrações</h6>
              <ul className="small text-secondary list-bullets mb-0">
                <li>APIs REST para ERPs e prontuários</li>
                <li>Webhooks para laudos e eventos</li>
                <li>Mensageria: e-mail, SMS e WhatsApp*</li>
              </ul>
              <p className="text-secondary small mt-2 mb-0">*A depender do provedor contratado.</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="p-4 bg-white rounded-4 shadow-soft h-100">
              <h6 className="text-uppercase text-secondary mb-2">Arquitetura</h6>
              <ul className="small text-secondary list-bullets mb-0">
                <li>Cloud first com opção on-premise</li>
                <li>Escalabilidade horizontal e observabilidade</li>
                <li>Logs centralizados e monitoramento</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Contato */}
      <Section id="contato">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Fale Conosco</h2>
          <p className="text-secondary">Envie sua mensagem e nossa equipe retornará em breve</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form className="card shadow-soft p-4" onSubmit={(e)=>e.preventDefault()}>
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome</label>
                <input type="text" id="nome" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input type="email" id="email" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="mensagem" className="form-label">Mensagem</label>
                <textarea id="mensagem" className="form-control" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}
