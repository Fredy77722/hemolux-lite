import { useEffect, useState } from 'react';
import HemoglobinField from './components/HemoglobinField';
import HeroCarousel, { type HeroCarouselCard } from './components/HeroCarousel';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowLeft,
  Activity,
  BrainCircuit,
  ChevronRight,
  Cloud,
  Droplets,
  Dna,
  HeartPulse,
  Mail,
  Menu,
  Microscope,
  MonitorSmartphone,
  Radio,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  WifiOff,
  X,
} from 'lucide-react';

const images = {
  team: '/assets/images/team/WhatsApp_Image_2026-09-24_at_16.15.55.jpeg',
  award: '/assets/images/awards/WhatsApp_Image_2026-09-24_at_16.12.22.jpeg',
  device: '/assets/images/prototype/WhatsApp_Image_2026-09-24_at_16.09.32.jpeg',
  detail: '/assets/images/prototype/WhatsApp_Image_2026-09-24_at_16.09.30.jpeg',
  sicklePortrait: 'https://images.pexels.com/photos/12895423/pexels-photo-12895423.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sickleCommunity: 'https://images.pexels.com/photos/37285165/pexels-photo-37285165.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const flowSteps = [
  { number: '01', label: 'Dedo no sensor', text: 'O paciente coloca o dedo no dispositivo, sem agulhas e sem recolha de sangue.', icon: Droplets },
  { number: '02', label: 'Captação óptica', text: 'PPG e espectroscopia multiespectral captam sinais fisiológicos e dados espectrais.', icon: Radio },
  { number: '03', label: 'IA processa', text: 'Algoritmos transformam os sinais captados em informação clínica útil.', icon: BrainCircuit },
  { number: '04', label: 'Resultado em tempo real', text: 'Hemoglobina, frequência cardíaca e SpO₂ aparecem na aplicação móvel.', icon: MonitorSmartphone },
  { number: '05', label: 'Histórico sincronizado', text: 'Os dados ficam disponíveis offline e sincronizam quando a ligação regressa.', icon: Cloud },
];

const useCases = [
  { icon: Stethoscope, title: 'Hospitais', text: 'Apoia a triagem e o acompanhamento de pacientes com uma leitura rápida e portátil.' },
  { icon: Activity, title: 'Centros de saúde', text: 'Leva monitorização inteligente para equipas que precisam de decisões mais ágeis.' },
  { icon: WifiOff, title: 'Comunidades remotas', text: 'Funciona mesmo sem internet, aproximando cuidados essenciais de quem mais precisa.' },
];

const heroCards: HeroCarouselCard[] = [
  { title: 'O problema', description: 'Menos agulhas, menos espera e menos dependência de laboratório.', link: 'problema', icon: Microscope, image: images.award },
  { title: 'Como funciona', description: 'Sensores ópticos transformam sinais fisiológicos em informação útil.', link: 'funciona', icon: BrainCircuit, image: images.detail },
  { title: 'Leitura óptica activa', description: 'Protótipo pronto para medir hemoglobina, frequência cardíaca e SpO₂.', link: 'funciona', icon: HeartPulse, image: images.device },
  { title: 'Impacto', description: 'Decisões clínicas mais rápidas, mesmo onde a distância pesa.', link: 'impacto', icon: Activity, image: '/assets/images/team/sebast.png' },
  { title: 'A equipa', description: 'Engenharia angolana a construir soluções para o próximo cuidado.', link: 'equipa', icon: Users, image: images.team },
];

const teamGallery = [
  { src: images.team, alt: 'Equipa HemoLux Lite — Alberto Ncundi, Marcos Fernando Abel e Feliciano Manuel', label: 'A EQUIPA HEMOLUX' },
  { src: '/assets/images/team/feliciano.png', alt: 'Feliciano Manuel, membro da equipa HemoLux Lite', label: 'FELICIANO MANUEL' },
];

function TeamGallery() {
  const [activeImage, setActiveImage] = useState(0);
  const image = teamGallery[activeImage];

  const showImage = (index: number) => {
    setActiveImage((index + teamGallery.length) % teamGallery.length);
  };

  return (
    <div className="team-gallery">
      <div className="team-image reveal">
        <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />
        <div className="team-image-tag">{image.label}<br /><span>Luanda, Angola</span></div>
        <div className="team-gallery-controls">
          <button onClick={() => showImage(activeImage - 1)} aria-label="Imagem anterior"><ArrowLeft size={15} /></button>
          <span>{String(activeImage + 1).padStart(2, '0')} / {String(teamGallery.length).padStart(2, '0')}</span>
          <button onClick={() => showImage(activeImage + 1)} aria-label="Imagem seguinte"><ArrowRight size={15} /></button>
        </div>
      </div>
      <div className="team-gallery-next" aria-hidden="true">
        Próxima imagem <ArrowRight size={14} />
      </div>
    </div>
  );
}

function App() {
  const [activeStep, setActiveStep] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <HemoglobinField />
      <div className="top-line" />
      <header className="site-header">
        <button className="brand" onClick={() => scrollTo('top')} aria-label="Voltar ao início">
          <span className="brand-mark"><Droplets size={22} strokeWidth={2.5} /></span>
          <span><strong>Hemo<span>Lux</span></strong><small>LITE</small></span>
        </button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Navegação principal">
          <button onClick={() => scrollTo('problema')}>O problema</button>
          <button onClick={() => scrollTo('funciona')}>Como funciona</button>
          <button onClick={() => scrollTo('impacto')}>Impacto</button>
          <button onClick={() => scrollTo('equipa')}>A equipa</button>
        </nav>
        <div className="header-actions">
          <span className="language">PT <ChevronRight size={13} /> EN</span>
          <button className="header-cta" onClick={() => setShowContact(true)}>Falar connosco <ArrowUpRightIcon /></button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span className="eyebrow-dot" /> FITITEL 2026 <span className="eyebrow-divider" /> FASE NACIONAL</div>
              <h1>O cuidado que<br /><em>começa</em> com um sinal.</h1>
              <p className="hero-lead">Monitorização inteligente, não invasiva e acessível. Sem agulhas, sem laboratório, sem espera — decisões clínicas mais perto de quem precisa.</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => scrollTo('funciona')}>Ver como funciona <ArrowDownRight size={17} /></button>
                <button className="text-link" onClick={() => setShowContact(true)}>Falar com a equipa <ArrowRight size={17} /></button>
              </div>
              <div className="hero-proof"><ShieldCheck size={17} /><span>Protótipo funcional, testado e demonstrado publicamente</span></div>
              <div className="hero-subline">Sem agulhas <span /> Sem laboratório <span /> Sem espera</div>
            </div>
            <div className="hero-visual reveal delay-2">
              <HeroCarousel
                cards={heroCards}
                onNavigate={scrollTo}
              />
            </div>
          </div>
          <div className="hero-bottom reveal"><span>Feito em Angola</span><span className="hero-line" /><span>Para o próximo cuidado</span><span className="scroll-note">SCROLL PARA EXPLORAR <ArrowDownRight size={14} /></span></div>
        </section>

        <section className="recognition-strip"><div className="section-pad recognition-inner"><div className="recognition-badge"><Sparkles size={15} /><span>RECONHECIMENTO</span></div><p>Vencedor nacional e seleccionado para representar Angola num concurso global de startups.</p><button onClick={() => scrollTo('marcos')}>Conhecer a nossa jornada <ArrowRight size={16} /></button></div></section>

        <section className="section-pad problem-section" id="problema">
          <div className="section-heading reveal"><div><span className="section-kicker">01 / O CONTEXTO</span><h2>Quando o acesso<br /><em>não pode esperar.</em></h2></div><p>A monitorização de parâmetros sanguíneos ainda depende, muitas vezes, de uma cadeia que não chega a todo o lado. O HemoLux nasce para encurtar essa distância.</p></div>
          <div className="pain-grid">
            <article className="pain-card reveal"><span className="card-number">01</span><div className="pain-icon"><Microscope size={21} /></div><h3>Dependência laboratorial</h3><p>Recolha de sangue e equipamentos especializados tornam exames rápidos mais difíceis de alcançar.</p><span className="card-accent" /></article>
            <article className="pain-card reveal delay-1"><span className="card-number">02</span><div className="pain-icon"><Activity size={21} /></div><h3>Tempo que pesa</h3><p>Processos demorados podem atrasar a triagem e a resposta clínica onde cada decisão conta.</p><span className="card-accent" /></article>
            <article className="pain-card dark reveal delay-2"><span className="card-number">03</span><div className="pain-icon"><WifiOff size={21} /></div><h3>Dados fora de alcance</h3><p>Sem sistemas digitais, o histórico do paciente perde-se e o acompanhamento torna-se menos eficiente.</p><span className="card-accent" /></article>
          </div>
        </section>

        <section className="section-pad sickle-section">
          <div className="sickle-layout">
            <div className="sickle-images reveal">
              <div className="sickle-portrait-wrap"><img src={images.sicklePortrait} alt="Retrato digno de uma jovem africana — sensibilização para a doença falciforme" loading="lazy" /><div className="sickle-portrait-tag">DOENÇA FALCIFORME</div></div>
              <div className="sickle-community-wrap"><img src={images.sickleCommunity} alt="Comunidade africana em vida quotidiana — dignidade e normalidade" loading="lazy" /></div>
            </div>
            <div className="sickle-copy reveal delay-1">
              <span className="section-kicker">O FOCO CENTRAL</span>
              <h2>Doença falciforme:<br /><em>a urgência que move tudo.</em></h2>
              <p>A doença falciforme é uma condição genética do sangue com elevada prevalência em populações africanas. Os glóbulos vermelhos assumem uma forma de foice, dificultando a circulação e o transporte de oxigénio — o que provoca crises, dor e complicações que exigem acompanhamento constante.</p>
              <p className="sickle-second">A hemoglobina é o parâmetro crítico. Quem vive com esta condição precisa de a monitorizar com frequência para gerir crises antes que se agravem. Mas quando o laboratório está a horas de distância, cada crise é uma corrida contra o tempo.</p>
              <div className="sickle-stats">
                <div className="sickle-stat"><Droplets size={20} /><div><strong>Hemoglobina</strong><small>O parâmetro crítico a monitorizar</small></div></div>
                <div className="sickle-stat"><Dna size={20} /><div><strong>Genética</strong><small>Condição hereditária do sangue</small></div></div>
                <div className="sickle-stat"><HeartPulse size={20} /><div><strong>Acompanhamento</strong><small>Frequente e decisivo para a qualidade de vida</small></div></div>
              </div>
              <div className="sickle-bridge">O HemoLux Lite existe para transformar essa corrida numa leitura de segundos — sem agulhas, sem deslocação, sem espera.</div>
            </div>
          </div>
        </section>

        <section className="section-pad solution-section" id="funciona">
          <div className="section-heading reveal"><div><span className="section-kicker">02 / A SOLUÇÃO</span><h2>Da luz ao cuidado,<br /><em>em cinco movimentos.</em></h2></div><p>Uma experiência simples para o profissional de saúde. Uma nova camada de acesso para o paciente — do dedo ao resultado, sem agulhas nem espera.</p></div>
          <div className="flow-layout">
            <div className="flow-visual reveal"><div className="flow-ring"><div className="flow-core"><Droplets size={38} /><span>HEMOLUX<br /><b>LITE</b></span></div></div><div className="flow-scan scan-a" /><div className="flow-scan scan-b" /><div className="flow-label label-a">PPG</div><div className="flow-label label-b">O₂</div><div className="flow-label label-c">AI</div><div className="flow-vertical-line" /></div>
            <div className="flow-list reveal delay-1">{flowSteps.map((step, index) => { const Icon = step.icon; return <button className={activeStep === index ? 'flow-step active' : 'flow-step'} key={step.number} onClick={() => setActiveStep(index)}><span className="step-index">{step.number}</span><span className="step-icon"><Icon size={18} /></span><span className="step-copy"><strong>{step.label}</strong><small>{step.text}</small></span><ChevronRight size={18} className="step-arrow" /></button>; })}<div className="flow-detail"><span className="detail-status"><span /> ETAPA ACTIVA</span><strong>{flowSteps[activeStep].label}</strong><p>{flowSteps[activeStep].text}</p></div></div>
          </div>
        </section>

        <section className="tech-section section-pad"><div className="tech-intro reveal"><span className="section-kicker light">03 / TECNOLOGIA</span><h2>Precisão que se<br /><em>torna presença.</em></h2><p>Três pilares trabalham juntos para transformar sinais invisíveis em informação útil, no lugar onde o cuidado acontece.</p></div><div className="tech-grid"><article className="tech-card reveal"><div className="tech-top"><Radio size={25} /><span>01</span></div><h3>Fotopletismografia</h3><p>Captação óptica de variações no fluxo sanguíneo através do dedo.</p><div className="tech-line" /></article><article className="tech-card reveal delay-1"><div className="tech-top"><Sparkles size={25} /><span>02</span></div><h3>Espectroscopia multiespectral</h3><p>Diferentes comprimentos de onda revelam padrões nos sinais medidos.</p><div className="tech-line" /></article><article className="tech-card reveal delay-2"><div className="tech-top"><BrainCircuit size={25} /><span>03</span></div><h3>Inteligência Artificial</h3><p>Algoritmos processam os dados e estimam parâmetros em tempo real.</p><div className="tech-line" /></article></div></section>

        <section className="section-pad proof-section"><div className="section-heading reveal"><div><span className="section-kicker">04 / PROVA REAL</span><h2>Não é só uma ideia.<br /><em>É um protótipo a funcionar.</em></h2></div><p>Construído, testado e demonstrado publicamente. O HemoLux já é realidade — não promessa.</p></div><div className="gallery-grid"><figure className="gallery-main reveal"><img src={images.award} alt="Apresentação do HemoLux no stand 15 da FITITEL" /><figcaption><span>01</span><strong>O primeiro contacto</strong><small>HemoLux no centro da FITITEL</small></figcaption></figure><figure className="gallery-side reveal delay-1"><img src={images.detail} alt="Detalhe do protótipo HemoLux Lite com sensores activos" /><figcaption><span>02</span><strong>Sensores activos</strong><small>O sistema inicia em tempo real</small></figcaption></figure><div className="gallery-note reveal delay-2"><span className="note-mark">“</span><p>A inovação ganha valor quando consegue chegar mais longe.</p><span className="note-caption">HEMOLUX LITE / ANGOLA</span></div></div></section>

        <section className="impact-section section-pad" id="impacto"><div className="section-heading reveal"><div><span className="section-kicker">05 / IMPACTO</span><h2>Mais perto de<br /><em>quem precisa.</em></h2></div><p>Uma ferramenta pensada para o contexto real: diferentes equipas, diferentes distâncias, o mesmo compromisso com o cuidado. Já construímos a tecnologia — agora é chegar a quem precisa.</p></div><div className="impact-grid">{useCases.map(({ icon: Icon, title, text }, index) => <article className="impact-card reveal" key={title}><span className="impact-index">0{index + 1}</span><Icon size={25} /><h3>{title}</h3><p>{text}</p><ArrowUpRightIcon /></article>)}</div></section>

        <section className="team-section section-pad" id="equipa"><div className="team-layout"><TeamGallery /><div className="team-copy reveal delay-1"><span className="section-kicker light">06 / QUEM FAZ</span><h2>Engenharia angolana<br /><em>a construir soluções.</em></h2><p>Somos uma equipa angolana que concebeu, desenvolveu e validou o HemoLux Lite de forma autónoma. Da electrónica ao software, do protótipo ao prémio — tudo nasceu do nosso trabalho. Agora levamos o que já construímos para o mundo.</p><div className="team-list"><div><strong>Alberto Ncundi</strong><span>Equipa</span></div><div><strong>Marcos Fernando Abel</strong><span>Equipa</span></div><div><strong>Feliciano Manuel</strong><span>Equipa</span></div></div><div className="team-featured-member"><strong>Três pessoas. Um sinal.</strong><span>Equipa HemoLux Lite</span></div><div className="angola-line"><span /> Construído em Angola, por mérito próprio <span /></div></div></div></section>

        <section className="section-pad timeline-section" id="marcos"><div className="section-heading reveal"><div><span className="section-kicker">07 / MARCOS</span><h2>Já construímos muito.<br /><em>E estamos prontos para mais.</em></h2></div><p>De uma ideia executada em equipa a uma oportunidade de representar Angola no palco global. Tudo por mérito próprio.</p></div><div className="timeline reveal"><div className="timeline-progress" /><div className="timeline-item"><span>01</span><div><small>ORIGEM</small><strong>A ideia</strong><p>Nasce a visão de uma monitorização mais acessível.</p></div></div><div className="timeline-item"><span>02</span><div><small>EXECUÇÃO</small><strong>Protótipo funcional</strong><p>Sensores, ecrã LCD e impressão de resultados ganham forma.</p></div></div><div className="timeline-item highlighted"><span>03</span><div><small>FITITEL 2026</small><strong>Stand 15 + demonstração</strong><p>O HemoLux é apresentado publicamente na categoria Electrónica e Telecomunicações.</p></div></div><div className="timeline-item"><span>04</span><div><small>RECONHECIMENTO</small><strong>Prémio e qualificação nacional</strong><p>Uma prova concreta para continuar a avançar.</p></div></div><div className="timeline-item next"><span>05</span><div><small>PRÓXIMO PASSO</small><strong>Concurso global</strong><p>Levar uma solução angolana para o mundo.</p></div></div></div></section>

        <section className="closing-section section-pad"><div className="closing-panel reveal"><div className="closing-orb" /><span className="section-kicker light">O PRÓXIMO SINAL É TEU</span><h2>Já construímos.<br /><em>Agora vamos escalar.</em></h2><p>Procuramos parceiros estratégicos — instituições, distribuidores e equipas clínicas — que queiram levar o HemoLux Lite para onde o acesso ainda não chegou. Temos tecnologia, temos protótipo, temos tração. Falamos?</p><button className="button button-light" onClick={() => setShowContact(true)}>Falar com a equipa <ArrowRight size={17} /></button><div className="closing-detail"><span>HemoLux Lite</span><span>Luanda, Angola</span><span>FITITEL 2026</span></div></div></section>
      </main>

      <footer className="site-footer section-pad"><div className="footer-top"><div className="brand footer-brand"><span className="brand-mark"><Droplets size={22} strokeWidth={2.5} /></span><span><strong>Hemo<span>Lux</span></strong><small>LITE</small></span></div><p>Monitorização inteligente.<br />Cuidado que ilumina vidas.</p><button className="footer-mail" onClick={() => setShowContact(true)}><Mail size={16} /> hello@hemolux.ao <ArrowUpRightIcon /></button></div><div className="footer-bottom"><span>© 2026 HemoLux Lite</span><span>Desenvolvido no âmbito da FITITEL — ITEL</span><button onClick={() => scrollTo('top')}>Voltar ao topo <ArrowDownRight size={15} className="rotate-up" /></button></div></footer>

      {showContact && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Contactar a equipa"><div className="contact-modal"><button className="modal-close" onClick={() => setShowContact(false)} aria-label="Fechar"><X size={19} /></button><span className="section-kicker">CONTACTO</span><h2>Vamos conversar<br /><em>parceria estratégica.</em></h2><p>Interessado em levar o HemoLux Lite para a sua realidade? Escreve-nos e a equipa responde com a próxima conversa.</p><a className="button button-primary modal-button" href="mailto:hello@hemolux.ao">Enviar email <ArrowRight size={17} /></a><small>hello@hemolux.ao</small></div></div>}
    </div>
  );
}

function ArrowUpRightIcon() { return <ArrowRight size={16} className="arrow-up-right" />; }

export default App;
