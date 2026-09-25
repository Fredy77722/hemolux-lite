import { useEffect, useRef, useState } from 'react';
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
  MessageCircle,
  Menu,
  Microscope,
  MonitorSmartphone,
  Phone,
  Radio,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Volume2,
  VolumeX,
  WifiOff,
  X,
} from 'lucide-react';

const images = {
  team: '/assets/images/team/WhatsApp_Image_2026-09-24_at_16.15.55.jpeg',
  award: '/assets/images/awards/WhatsApp_Image_2026-09-24_at_16.12.22.jpeg',
  awardMoment: '/assets/images/awards/fititel-award.jpeg',
  awardTeam: '/assets/images/awards/fititel-team.jpeg',
  device: '/assets/images/prototype/WhatsApp_Image_2026-09-24_at_16.09.32.jpeg',
  detail: '/assets/images/prototype/WhatsApp_Image_2026-09-24_at_16.09.30.jpeg',
  sicklePortrait: 'https://images.pexels.com/photos/12895423/pexels-photo-12895423.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sickleCommunity: 'https://images.pexels.com/photos/37285165/pexels-photo-37285165.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

type Language = 'pt' | 'en';

const translations: Record<Language, Record<string, string>> = {
  pt: {},
  en: {
    'O problema': 'The problem', 'Como funciona': 'How it works', Impacto: 'Impact',
    'A equipa': 'The team', 'Falar connosco': 'Talk to us', 'Abrir menu': 'Open menu',
    'Voltar ao início': 'Back to top', 'O cuidado que': 'Care that',
    'começa': 'starts', 'com um sinal.': 'with a signal.',
    'Monitorização inteligente, não invasiva e acessível. Sem agulhas, sem laboratório, sem espera — decisões clínicas mais perto de quem precisa.': 'Smart, non-invasive and accessible monitoring. No needles, no lab, no waiting — clinical decisions closer to those who need them.',
    'Ver como funciona': 'See how it works', 'Falar com a equipa': 'Talk to the team',
    'Protótipo funcional, testado e demonstrado publicamente': 'Functional prototype, publicly tested and demonstrated',
    'Sem agulhas': 'No needles', 'Sem laboratório': 'No lab', 'Sem espera': 'No waiting',
    'Feito em Angola': 'Made in Angola', 'Para o próximo cuidado': 'For the next step in care',
    'SCROLL PARA EXPLORAR': 'SCROLL TO EXPLORE', RECONHECIMENTO: 'RECOGNITION',
    'Vencedor nacional e seleccionado para representar Angola num concurso global de startups.': 'National winner selected to represent Angola in a global startup competition.',
    'Conhecer a nossa jornada': 'Discover our journey', 'RECONHECIMENTO ITEL': 'ITEL RECOGNITION',
    'Um projecto reconhecido': 'A project recognised', 'entre os melhores do país.': 'among the best in the country.',
    'O HemoLux Lite foi considerado um dos melhores projectos do Instituto de Telecomunicações — ITEL, uma referência nacional no ensino técnico médio de tecnologia.': 'HemoLux Lite was recognised as one of the best projects at the Institute of Telecommunications (ITEL), a national reference in technical technology education.',
    'Reconhecimento nacional': 'National recognition', 'Um momento de orgulho para a equipa HemoLux.': 'A proud moment for the HemoLux team.',
    'Entre os melhores projectos do ITEL': 'Among ITEL’s best projects', 'Tecnologia angolana com impacto real.': 'Angolan technology with real impact.',
    'O PROJECTO EM ACÇÃO': 'THE PROJECT IN ACTION', 'Veja como funciona': 'See how it works',
    'o HemoLux Lite.': 'HemoLux Lite.', 'O CONTEXTO': 'THE CONTEXT',
    'Quando o acesso': 'When access', 'não pode esperar.': 'cannot wait.',
    'Dependência laboratorial': 'Laboratory dependence', 'Tempo que pesa': 'Time matters',
    'Dados fora de alcance': 'Data out of reach', 'A SOLUÇÃO': 'THE SOLUTION',
    'TECNOLOGIA': 'TECHNOLOGY', 'Precisão que se': 'Precision that becomes',
    'torna presença.': 'presence.', 'PROVA REAL': 'REAL PROOF',
    'Não é só uma ideia.': 'It is not just an idea.', 'É um protótipo a funcionar.': 'It is a working prototype.',
    'IMPACTO': 'IMPACT', 'Mais perto de': 'Closer to', 'quem precisa.': 'those who need it.',
    'MARCOS': 'MILESTONES', 'Já construímos muito.': 'We have built a lot.',
    'E estamos prontos para mais.': 'And we are ready for more.', 'O PRÓXIMO SINAL É TEU': 'THE NEXT SIGNAL IS YOURS',
    'Agora vamos escalar.': 'Now we scale.',
    'Voltar ao topo': 'Back to top', 'CONTACTO': 'CONTACT', 'Vamos conversar': 'Let’s talk',
    'parceria estratégica.': 'strategic partnership.', 'Enviar email': 'Send email',
    'Fechar': 'Close', 'Próxima imagem': 'Next image',
    'Construído em Angola, por mérito próprio': 'Built in Angola, on our own merit',
    'ETAPA ACTIVA': 'ACTIVE STEP', 'Perfil': 'Profile',
    'Monitorização inteligente.': 'Smart monitoring.', 'Cuidado que ilumina vidas.': 'Care that lights up lives.',
    'Desenvolvido no âmbito da FITITEL — ITEL': 'Developed as part of FITITEL — ITEL',
    'Dedo no sensor': 'Finger on the sensor', 'Captação óptica': 'Optical capture', 'IA processa': 'AI processing',
    'Resultado em tempo real': 'Real-time result', 'Histórico sincronizado': 'Synced history',
    'Hospitais': 'Hospitals', 'Centros de saúde': 'Health centres', 'Comunidades remotas': 'Remote communities',
    'Leitura óptica activa': 'Active optical reading', 'Acompanhamento': 'Follow-up',
    'Hemoglobina': 'Haemoglobin', 'Genética': 'Genetics',
    'O FOCO CENTRAL': 'THE CENTRAL FOCUS', 'Doença falciforme:': 'Sickle cell disease:',
    'a urgência que move tudo.': 'the urgency behind everything.', '02 / A SOLUÇÃO': '02 / THE SOLUTION',
    '06 / QUEM FAZ': '06 / WHO BUILDS IT',
    '07 / MARCOS': '07 / MILESTONES', 'ORIGEM': 'ORIGIN', 'EXECUÇÃO': 'EXECUTION',
    'PRÓXIMO PASSO': 'NEXT STEP', 'A ideia': 'The idea', 'Protótipo funcional': 'Working prototype',
    'Parcerias': 'Partnerships', 'O primeiro contacto': 'The first contact', 'Sensores activos': 'Active sensors',
    'Fotopletismografia': 'Photoplethysmography', 'Espectroscopia multiespectral': 'Multispectral spectroscopy',
    'Inteligência Artificial': 'Artificial intelligence', 'Engenharia angolana': 'Angolan engineering',
    'Três pessoas. Um sinal.': 'Three people. One signal.', 'Founder & Co-CEO · Hardware': 'Founder & Co-CEO · Hardware',
    'Founder & CEO · Produto': 'Founder & CEO · Product', 'Systems Integration & Application Lead': 'Systems Integration & Application Lead',
    'Imagem anterior': 'Previous image', 'Imagem seguinte': 'Next image',
    'Mostrar próxima imagem e perfil': 'Show next image and profile',
    'Menos agulhas, menos espera e menos dependência de laboratório.': 'Fewer needles, less waiting and less dependence on laboratories.',
    'Sensores ópticos transformam sinais fisiológicos em informação útil.': 'Optical sensors turn physiological signals into useful information.',
    'Protótipo pronto para medir hemoglobina, frequência cardíaca e SpO₂.': 'Prototype ready to measure haemoglobin, heart rate and SpO₂.',
    'Decisões clínicas mais rápidas, mesmo onde a distância pesa.': 'Faster clinical decisions, even where distance matters.',
    'Engenharia angolana a construir soluções para o próximo cuidado.': 'Angolan engineering building solutions for the next step in care.',
    'O paciente coloca o dedo no dispositivo, sem agulhas e sem recolha de sangue.': 'The patient places a finger on the device, with no needles or blood draw.',
    'PPG e espectroscopia multiespectral captam sinais fisiológicos e dados espectrais.': 'PPG and multispectral spectroscopy capture physiological signals and spectral data.',
    'Algoritmos transformam os sinais captados em informação clínica útil.': 'Algorithms turn captured signals into useful clinical information.',
    'Hemoglobina, frequência cardíaca e SpO₂ aparecem na aplicação móvel.': 'Haemoglobin, heart rate and SpO₂ appear in the mobile app.',
    'Os dados ficam disponíveis offline e sincronizam quando a ligação regressa.': 'Data remains available offline and syncs when the connection returns.',
    'Apoia a triagem e o acompanhamento de pacientes com uma leitura rápida e portátil.': 'Supports triage and patient follow-up with a fast, portable reading.',
    'Leva monitorização inteligente para equipas que precisam de decisões mais ágeis.': 'Brings smart monitoring to teams that need faster decisions.',
    'Funciona mesmo sem internet, aproximando cuidados essenciais de quem mais precisa.': 'Works even without internet, bringing essential care closer to those who need it most.',
    'CONTACTAR A EQUIPA': 'CONTACT THE TEAM',
    'SINAL DETECTADO': 'SIGNAL DETECTED', 'Explorar': 'Explore', 'Arraste para explorar': 'Drag to explore',
    'DOENÇA FALCIFORME': 'SICKLE CELL DISEASE', 'A EQUIPA HEMOLUX': 'THE HEMOLUX TEAM',
    'Luanda, Angola': 'Luanda, Angola', 'Feliciano Manuel': 'Feliciano Manuel',
    'Alberto Miguel Sandalawa Ncundi': 'Alberto Miguel Sandalawa Ncundi', 'Marcos Fernando Abel': 'Marcos Fernando Abel',
    'Alberto Ncundi': 'Alberto Ncundi', 'Marcos Abel': 'Marcos Abel',
    'Da luz ao cuidado,': 'From light to care,', 'em cinco movimentos.': 'in five steps.',
    'Uma experiência simples para o profissional de saúde. Uma nova camada de acesso para o paciente — do dedo ao resultado, sem agulhas nem espera.': 'A simple experience for healthcare professionals. A new layer of access for patients — from finger to result, without needles or waiting.',
    'Retrato digno de uma jovem africana — sensibilização para a doença falciforme': 'Portrait of a young African woman — raising awareness of sickle cell disease',
    'Uma equipa angolana a transformar electrónica, software e investigação em cuidados mais acessíveis.': 'An Angolan team transforming electronics, software and research into more accessible care.',
    'Fundador e Co-CEO da Hemolux. Tem formação técnica em Electrónica e Telecomunicações e trabalha no hardware e na resolução dos desafios técnicos do projecto. Tem formação adicional em redes, CCTV e manutenção informática.': 'Founder and Co-CEO of Hemolux. With technical training in Electronics and Telecommunications, he works on hardware and solving the project’s technical challenges. He also has additional training in networks, CCTV and computer maintenance.',
    'Fundador e CEO da Hemolux. Com formação técnica em telecomunicações e tecnologia, lidera a programação, electrónica, desenvolvimento do produto e crescimento do projecto.': 'Founder and CEO of Hemolux. With technical training in telecommunications and technology, he leads programming, electronics, product development and project growth.',
    'Técnico de Electrónica e Telecomunicações, lidera a integração de sistemas e aplicações, conectando programação, redes, infraestrutura e tecnologias digitais para criar soluções eficientes e escaláveis.': 'An Electronics and Telecommunications technician, he leads systems and application integration, connecting programming, networks, infrastructure and digital technologies to create efficient, scalable solutions.',
    'Interessado em levar o HemoLux Lite para a sua realidade? Escreve-nos e a equipa responde com a próxima conversa.': 'Interested in bringing HemoLux Lite to your reality? Write to us and the team will start the conversation.',
    'De uma ideia executada em equipa a uma oportunidade de criar novas parcerias. Tudo por mérito próprio.': 'From a team-built idea to an opportunity for new partnerships. All through our own merit.',
    'Nasce a visão de uma monitorização mais acessível.': 'The vision for more accessible monitoring is born.',
    'Vencedores e qualificação nacional': 'Winners and national qualification',
    'O HemoLux é reconhecido na FITITEL e segue para a próxima etapa.': 'HemoLux is recognised at FITITEL and moves to the next stage.',
    'Alianças estratégicas para crescer.': 'Strategic alliances to grow.',
    'A monitorização de parâmetros sanguíneos ainda depende, muitas vezes, de uma cadeia que não chega a todo o lado. O HemoLux nasce para encurtar essa distância.': 'Monitoring blood parameters often still depends on a chain that does not reach everywhere. HemoLux was created to shorten that distance.',
    'Recolha de sangue e equipamentos especializados tornam exames rápidos mais difíceis de alcançar.': 'Blood draws and specialised equipment make rapid tests harder to access.',
    'Processos demorados podem atrasar a triagem e a resposta clínica onde cada decisão conta.': 'Slow processes can delay triage and clinical response where every decision counts.',
    'Sem sistemas digitais, o histórico do paciente perde-se e o acompanhamento torna-se menos eficiente.': 'Without digital systems, patient history is lost and follow-up becomes less efficient.',
    'A doença falciforme é uma condição genética do sangue com elevada prevalência em populações africanas. Os glóbulos vermelhos assumem uma forma de foice, dificultando a circulação e o transporte de oxigénio — o que provoca crises, dor e complicações que exigem acompanhamento constante.': 'Sickle cell disease is a genetic blood condition highly prevalent in African populations. Red blood cells take a sickle shape, hindering circulation and oxygen transport — causing crises, pain and complications that require constant follow-up.',
    'A hemoglobina é o parâmetro crítico. Quem vive com esta condição precisa de a monitorizar com frequência para gerir crises antes que se agravem. Mas quando o laboratório está a horas de distância, cada crise é uma corrida contra o tempo.': 'Haemoglobin is the critical parameter. People living with this condition need frequent monitoring to manage crises before they worsen. But when the lab is hours away, every crisis is a race against time.',
    'O parâmetro crítico a monitorizar': 'The critical parameter to monitor', 'Condição hereditária do sangue': 'Inherited blood condition',
    'Frequente e decisivo para a qualidade de vida': 'Frequent and decisive for quality of life',
    'O HemoLux Lite existe para transformar essa corrida numa leitura de segundos — sem agulhas, sem deslocação, sem espera.': 'HemoLux Lite exists to turn that race into a seconds-long reading — no needles, travel or waiting.',
    'Três pilares trabalham juntos para transformar sinais invisíveis em informação útil, no lugar onde o cuidado acontece.': 'Three pillars work together to turn invisible signals into useful information where care happens.',
    'Captação óptica de variações no fluxo sanguíneo através do dedo.': 'Optical capture of changes in blood flow through the finger.',
    'Diferentes comprimentos de onda revelam padrões nos sinais medidos.': 'Different wavelengths reveal patterns in measured signals.',
    'Algoritmos processam os dados e estimam parâmetros em tempo real.': 'Algorithms process data and estimate parameters in real time.',
    'Construído, testado e demonstrado publicamente. O HemoLux já é realidade — não promessa.': 'Built, tested and publicly demonstrated. HemoLux is already reality — not a promise.',
    'Apresentação do HemoLux no stand 15 da FITITEL': 'HemoLux presentation at FITITEL stand 15',
    'HemoLux no centro da FITITEL': 'HemoLux at the heart of FITITEL',
    'Detalhe do protótipo HemoLux Lite com sensores activos': 'Detail of the HemoLux Lite prototype with active sensors',
    'O sistema inicia em tempo real': 'The system starts in real time',
    'A inovação ganha valor quando consegue chegar mais longe.': 'Innovation gains value when it can reach further.',
    'Uma ferramenta pensada para o contexto real: diferentes equipas, diferentes distâncias, o mesmo compromisso com o cuidado. Já construímos a tecnologia — agora é chegar a quem precisa.': 'A tool designed for the real world: different teams, different distances, the same commitment to care. We have built the technology — now it must reach those who need it.',
    'Vídeo explicativo do projecto HemoLux Lite': 'HemoLux Lite project explainer video', 'O seu navegador não suporta a reprodução deste vídeo.': 'Your browser does not support video playback.',
    'Controlo de volume do vídeo': 'Video volume control', 'Silenciar vídeo': 'Mute video', 'Ativar som do vídeo': 'Unmute video', 'Volume do vídeo': 'Video volume',
    'Já construímos.': 'We have built it.', 'Procuramos parceiros estratégicos — instituições, distribuidores e equipas clínicas — que queiram levar o HemoLux Lite para onde o acesso ainda não chegou. Temos tecnologia, temos protótipo, temos tração. Falamos?': 'We are looking for strategic partners — institutions, distributors and clinical teams — who want to take HemoLux Lite where access has not yet reached. We have technology, a prototype and traction. Shall we talk?',
    'Sensores, ecrã LCD e impressão de resultados ganham forma.': 'Sensors, an LCD screen and result printing take shape.',
  },
};

const translate = (language: Language, text: string) => translations[language]?.[text] || text;

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

const teamProfiles = [
  {
    src: images.team,
    alt: 'Equipa HemoLux Lite — Alberto Ncundi, Marcos Fernando Abel e Feliciano Manuel',
    label: 'A EQUIPA HEMOLUX',
    name: 'Engenharia angolana',
    role: 'Três pessoas. Um sinal.',
    bio: 'Uma equipa angolana a transformar electrónica, software e investigação em cuidados mais acessíveis.',
  },
  {
    src: '/assets/images/team/alberto.jpg',
    alt: 'Alberto Miguel Sandalawa Ncundi',
    label: 'ALBERTO NCUNDI',
    name: 'Alberto Miguel Sandalawa Ncundi',
    role: 'Founder & Co-CEO · Hardware',
    bio: 'Fundador e Co-CEO da Hemolux. Tem formação técnica em Electrónica e Telecomunicações e trabalha no hardware e na resolução dos desafios técnicos do projecto. Tem formação adicional em redes, CCTV e manutenção informática.',
  },
  {
    src: '/assets/images/team/marcos.jpg',
    alt: 'Marcos Fernando Abel',
    label: 'MARCOS ABEL',
    name: 'Marcos Fernando Abel',
    role: 'Founder & CEO · Produto',
    bio: 'Fundador e CEO da Hemolux. Com formação técnica em telecomunicações e tecnologia, lidera a programação, electrónica, desenvolvimento do produto e crescimento do projecto.',
  },
  {
    src: '/assets/images/team/feliciano.png',
    alt: 'Feliciano Manuel',
    label: 'FELICIANO MANUEL',
    name: 'Feliciano Manuel',
    role: 'Systems Integration & Application Lead',
    bio: 'Técnico de Electrónica e Telecomunicações, lidera a integração de sistemas e aplicações, conectando programação, redes, infraestrutura e tecnologias digitais para criar soluções eficientes e escaláveis.',
  },
];

function TeamGallery({ activeImage, onChange, language }: { activeImage: number; onChange: (index: number) => void; language: Language }) {
  const image = teamProfiles[activeImage];
  const t = (text: string) => translate(language, text);

  return (
    <div className="team-gallery">
      <div className="team-image reveal">
        <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />
        <div className="team-image-tag">{t(image.label)}<br /><span>{t('Luanda, Angola')}</span></div>
        <div className="team-gallery-controls">
          <button onClick={() => onChange((activeImage - 1 + teamProfiles.length) % teamProfiles.length)} aria-label={t('Imagem anterior')}><ArrowLeft size={15} /></button>
          <span>{String(activeImage + 1).padStart(2, '0')} / {String(teamProfiles.length).padStart(2, '0')}</span>
          <button onClick={() => onChange((activeImage + 1) % teamProfiles.length)} aria-label={t('Imagem seguinte')}><ArrowRight size={15} /></button>
        </div>
      </div>
      <button
        className="team-gallery-next"
        type="button"
        onClick={() => onChange((activeImage + 1) % teamProfiles.length)}
        aria-label={t('Mostrar próxima imagem e perfil')}
      >
        {t('Próxima imagem')} <ArrowRight size={14} />
      </button>
    </div>
  );
}

function TeamSection({ language }: { language: Language }) {
  const [activeImage, setActiveImage] = useState(0);
  const profile = teamProfiles[activeImage];
  const t = (text: string) => translate(language, text);

  return (
    <section className="team-section section-pad" id="equipa">
      <div className="team-layout">
        <TeamGallery activeImage={activeImage} onChange={setActiveImage} language={language} />
        <div className="team-copy reveal delay-1">
          <span className="section-kicker light">{t('06 / QUEM FAZ')}</span>
          <h2>{t(profile.name)}<br /><em>{t(profile.role)}</em></h2>
          <p>{t(profile.bio)}</p>
          <div className="team-list">
            {teamProfiles.slice(1).map((member) => (
              <div key={member.name} className={member.name === profile.name ? 'active' : ''}>
                <strong>{t(member.name.split(' ').slice(0, 2).join(' '))}</strong><span>{t(member.role.split(' · ')[0])}</span>
              </div>
            ))}
          </div>
          <div className="team-featured-member"><strong>{t(profile.label)}</strong><span>{t('Perfil')} {String(activeImage + 1).padStart(2, '0')} / {String(teamProfiles.length).padStart(2, '0')}</span></div>
          <div className="angola-line"><span /> {t('Construído em Angola, por mérito próprio')} <span /></div>
        </div>
      </div>
    </section>
  );
}

function ProjectVideo({ language }: { language: Language }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [volume, setVolume] = useState(1);
  const t = (text: string) => translate(language, text);

  const updateVolume = (nextVolume: number) => {
    setVolume(nextVolume);
    if (videoRef.current) {
      videoRef.current.volume = nextVolume;
      videoRef.current.muted = nextVolume === 0;
    }
  };

  return (
    <div className="project-video-wrap">
      <video ref={videoRef} className="project-video" controls preload="metadata" playsInline aria-label={t('Vídeo explicativo do projecto HemoLux Lite')}>
        <source src="/assets/videos/hemolux-explicacao-audio.mp4" type="video/mp4" />
        {t('O seu navegador não suporta a reprodução deste vídeo.')}
      </video>
      <div className="project-video-volume" aria-label={t('Controlo de volume do vídeo')}>
        <button type="button" onClick={() => updateVolume(volume > 0 ? 0 : 1)} aria-label={volume > 0 ? t('Silenciar vídeo') : t('Ativar som do vídeo')}>
          {volume > 0 ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => updateVolume(Number(event.target.value))} aria-label={t('Volume do vídeo')} />
        <span>{Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>('pt');
  const [activeStep, setActiveStep] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const t = (text: string) => translate(language, text);

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
        <button className="brand" onClick={() => scrollTo('top')} aria-label={t('Voltar ao início')}>
          <span className="brand-mark"><Droplets size={22} strokeWidth={2.5} /></span>
          <span><strong>Hemo<span>Lux</span></strong><small>LITE</small></span>
        </button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label={t('Navegação principal')}>
        <button onClick={() => scrollTo('problema')}>{t('O problema')}</button>
        <button onClick={() => scrollTo('funciona')}>{t('Como funciona')}</button>
        <button onClick={() => scrollTo('impacto')}>{t('Impacto')}</button>
        <button onClick={() => scrollTo('equipa')}>{t('A equipa')}</button>
        </nav>
        <div className="header-actions">
          <button className="language" onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')} aria-label="Alternar idioma">{language === 'pt' ? 'PT' : 'EN'} <ChevronRight size={13} /> {language === 'pt' ? 'EN' : 'PT'}</button>
          <button className="header-cta" onClick={() => setShowContact(true)}>{t('Falar connosco')} <ArrowUpRightIcon /></button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={t('Abrir menu')}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span className="eyebrow-dot" /> FITITEL 2026 <span className="eyebrow-divider" /> FASE NACIONAL</div>
              <h1>{t('O cuidado que')}<br /><em>{t('começa')}</em> {t('com um sinal.')}</h1>
              <p className="hero-lead">{t('Monitorização inteligente, não invasiva e acessível. Sem agulhas, sem laboratório, sem espera — decisões clínicas mais perto de quem precisa.')}</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => scrollTo('funciona')}>{t('Ver como funciona')} <ArrowDownRight size={17} /></button>
                <button className="text-link" onClick={() => setShowContact(true)}>{t('Falar com a equipa')} <ArrowRight size={17} /></button>
              </div>
              <div className="hero-proof"><ShieldCheck size={17} /><span>{t('Protótipo funcional, testado e demonstrado publicamente')}</span></div>
              <div className="hero-subline">{t('Sem agulhas')} <span /> {t('Sem laboratório')} <span /> {t('Sem espera')}</div>
            </div>
            <div className="hero-visual reveal delay-2">
              <HeroCarousel
                cards={heroCards.map((card) => ({ ...card, title: t(card.title), description: t(card.description) }))}
                onNavigate={scrollTo}
                translate={t}
              />
            </div>
          </div>
          <div className="hero-bottom reveal"><span>{t('Feito em Angola')}</span><span className="hero-line" /><span>{t('Para o próximo cuidado')}</span><span className="scroll-note">{t('SCROLL PARA EXPLORAR')} <ArrowDownRight size={14} /></span></div>
        </section>

        <section className="recognition-strip"><div className="section-pad recognition-inner"><div className="recognition-badge"><Sparkles size={15} /><span>{t('RECONHECIMENTO')}</span></div><p>{t('Vencedor nacional e seleccionado para representar Angola num concurso global de startups.')}</p><button onClick={() => scrollTo('marcos')}>{t('Conhecer a nossa jornada')} <ArrowRight size={16} /></button></div></section>
        <section className="recognition-showcase section-pad">
          <div className="section-heading reveal"><div><span className="section-kicker">{t('RECONHECIMENTO ITEL')}</span><h2>{t('Um projecto reconhecido')}<br /><em>{t('entre os melhores do país.')}</em></h2></div><p>{t('O HemoLux Lite foi considerado um dos melhores projectos do Instituto de Telecomunicações — ITEL, uma referência nacional no ensino técnico médio de tecnologia.')}</p></div>
          <div className="recognition-showcase-grid">
            <figure className="recognition-photo reveal"><img src={images.awardMoment} alt={t('Equipa HemoLux a receber o reconhecimento no ITEL')} /><figcaption><strong>{t('Reconhecimento nacional')}</strong><small>{t('Um momento de orgulho para a equipa HemoLux.')}</small></figcaption></figure>
            <figure className="recognition-photo reveal delay-1"><img src={images.awardTeam} alt={t('Equipa HemoLux entre os projectos reconhecidos no ITEL')} /><figcaption><strong>{t('Entre os melhores projectos do ITEL')}</strong><small>{t('Tecnologia angolana com impacto real.')}</small></figcaption></figure>
          </div>
        </section>
        <section className="video-section section-pad">
          <div className="section-heading reveal"><div><span className="section-kicker">{t('O PROJECTO EM ACÇÃO')}</span><h2>{t('Veja como funciona')}<br /><em>{t('o HemoLux Lite.')}</em></h2></div><p>{t('Uma explicação visual do projecto, do protótipo e da forma como a tecnologia aproxima a monitorização de quem precisa.')}</p></div>
          <div className="reveal"><ProjectVideo language={language} /></div>
        </section>

        <section className="section-pad problem-section" id="problema">
          <div className="section-heading reveal"><div><span className="section-kicker">{t('01 / O CONTEXTO')}</span><h2>{t('Quando o acesso')}<br /><em>{t('não pode esperar.')}</em></h2></div><p>{t('A monitorização de parâmetros sanguíneos ainda depende, muitas vezes, de uma cadeia que não chega a todo o lado. O HemoLux nasce para encurtar essa distância.')}</p></div>
          <div className="pain-grid">
            <article className="pain-card reveal"><span className="card-number">01</span><div className="pain-icon"><Microscope size={21} /></div><h3>{t('Dependência laboratorial')}</h3><p>{t('Recolha de sangue e equipamentos especializados tornam exames rápidos mais difíceis de alcançar.')}</p><span className="card-accent" /></article>
            <article className="pain-card reveal delay-1"><span className="card-number">02</span><div className="pain-icon"><Activity size={21} /></div><h3>{t('Tempo que pesa')}</h3><p>{t('Processos demorados podem atrasar a triagem e a resposta clínica onde cada decisão conta.')}</p><span className="card-accent" /></article>
            <article className="pain-card dark reveal delay-2"><span className="card-number">03</span><div className="pain-icon"><WifiOff size={21} /></div><h3>{t('Dados fora de alcance')}</h3><p>{t('Sem sistemas digitais, o histórico do paciente perde-se e o acompanhamento torna-se menos eficiente.')}</p><span className="card-accent" /></article>
          </div>
        </section>

        <section className="section-pad sickle-section">
          <div className="sickle-layout">
            <div className="sickle-images reveal">
              <div className="sickle-portrait-wrap"><img src={images.sicklePortrait} alt={t('Retrato digno de uma jovem africana — sensibilização para a doença falciforme')} loading="lazy" /><div className="sickle-portrait-tag">{t('DOENÇA FALCIFORME')}</div></div>
              <div className="sickle-community-wrap"><img src={images.sickleCommunity} alt="Comunidade africana em vida quotidiana — dignidade e normalidade" loading="lazy" /></div>
            </div>
            <div className="sickle-copy reveal delay-1">
              <span className="section-kicker">{t('O FOCO CENTRAL')}</span>
              <h2>{t('Doença falciforme:')}<br /><em>{t('a urgência que move tudo.')}</em></h2>
              <p>{t('A doença falciforme é uma condição genética do sangue com elevada prevalência em populações africanas. Os glóbulos vermelhos assumem uma forma de foice, dificultando a circulação e o transporte de oxigénio — o que provoca crises, dor e complicações que exigem acompanhamento constante.')}</p>
              <p className="sickle-second">{t('A hemoglobina é o parâmetro crítico. Quem vive com esta condição precisa de a monitorizar com frequência para gerir crises antes que se agravem. Mas quando o laboratório está a horas de distância, cada crise é uma corrida contra o tempo.')}</p>
              <div className="sickle-stats">
                <div className="sickle-stat"><Droplets size={20} /><div><strong>{t('Hemoglobina')}</strong><small>{t('O parâmetro crítico a monitorizar')}</small></div></div>
                <div className="sickle-stat"><Dna size={20} /><div><strong>{t('Genética')}</strong><small>{t('Condição hereditária do sangue')}</small></div></div>
                <div className="sickle-stat"><HeartPulse size={20} /><div><strong>{t('Acompanhamento')}</strong><small>{t('Frequente e decisivo para a qualidade de vida')}</small></div></div>
              </div>
              <div className="sickle-bridge">{t('O HemoLux Lite existe para transformar essa corrida numa leitura de segundos — sem agulhas, sem deslocação, sem espera.')}</div>
            </div>
          </div>
        </section>

        <section className="section-pad solution-section" id="funciona">
          <div className="section-heading reveal"><div><span className="section-kicker">{t('02 / A SOLUÇÃO')}</span><h2>{t('Da luz ao cuidado,')}<br /><em>{t('em cinco movimentos.')}</em></h2></div><p>{t('Uma experiência simples para o profissional de saúde. Uma nova camada de acesso para o paciente — do dedo ao resultado, sem agulhas nem espera.')}</p></div>
          <div className="flow-layout">
            <div className="flow-visual reveal"><div className="flow-ring"><div className="flow-core"><Droplets size={38} /><span>HEMOLUX<br /><b>LITE</b></span></div></div><div className="flow-scan scan-a" /><div className="flow-scan scan-b" /><div className="flow-label label-a">PPG</div><div className="flow-label label-b">O₂</div><div className="flow-label label-c">AI</div><div className="flow-vertical-line" /></div>
            <div className="flow-list reveal delay-1">{flowSteps.map((step, index) => { const Icon = step.icon; return <button className={activeStep === index ? 'flow-step active' : 'flow-step'} key={step.number} onClick={() => setActiveStep(index)}><span className="step-index">{step.number}</span><span className="step-icon"><Icon size={18} /></span><span className="step-copy"><strong>{t(step.label)}</strong><small>{t(step.text)}</small></span><ChevronRight size={18} className="step-arrow" /></button>; })}<div className="flow-detail"><span className="detail-status"><span /> {t('ETAPA ACTIVA')}</span><strong>{t(flowSteps[activeStep].label)}</strong><p>{t(flowSteps[activeStep].text)}</p></div></div>
          </div>
        </section>

        <section className="tech-section section-pad"><div className="tech-intro reveal"><span className="section-kicker light">{t('03 / TECNOLOGIA')}</span><h2>{t('Precisão que se')}<br /><em>{t('torna presença.')}</em></h2><p>{t('Três pilares trabalham juntos para transformar sinais invisíveis em informação útil, no lugar onde o cuidado acontece.')}</p></div><div className="tech-grid"><article className="tech-card reveal"><div className="tech-top"><Radio size={25} /><span>01</span></div><h3>{t('Fotopletismografia')}</h3><p>{t('Captação óptica de variações no fluxo sanguíneo através do dedo.')}</p><div className="tech-line" /></article><article className="tech-card reveal delay-1"><div className="tech-top"><Sparkles size={25} /><span>02</span></div><h3>{t('Espectroscopia multiespectral')}</h3><p>{t('Diferentes comprimentos de onda revelam padrões nos sinais medidos.')}</p><div className="tech-line" /></article><article className="tech-card reveal delay-2"><div className="tech-top"><BrainCircuit size={25} /><span>03</span></div><h3>{t('Inteligência Artificial')}</h3><p>{t('Algoritmos processam os dados e estimam parâmetros em tempo real.')}</p><div className="tech-line" /></article></div></section>

        <section className="section-pad proof-section"><div className="section-heading reveal"><div><span className="section-kicker">{t('04 / PROVA REAL')}</span><h2>{t('Não é só uma ideia.')}<br /><em>{t('É um protótipo a funcionar.')}</em></h2></div><p>{t('Construído, testado e demonstrado publicamente. O HemoLux já é realidade — não promessa.')}</p></div><div className="gallery-grid"><figure className="gallery-main reveal"><img src={images.award} alt={t('Apresentação do HemoLux no stand 15 da FITITEL')} /><figcaption><span>01</span><strong>{t('O primeiro contacto')}</strong><small>{t('HemoLux no centro da FITITEL')}</small></figcaption></figure><figure className="gallery-side reveal delay-1"><img src={images.detail} alt={t('Detalhe do protótipo HemoLux Lite com sensores activos')} /><figcaption><span>02</span><strong>{t('Sensores activos')}</strong><small>{t('O sistema inicia em tempo real')}</small></figcaption></figure><div className="gallery-note reveal delay-2"><span className="note-mark">“</span><p>{t('A inovação ganha valor quando consegue chegar mais longe.')}</p><span className="note-caption">HEMOLUX LITE / ANGOLA</span></div></div></section>

        <section className="impact-section section-pad" id="impacto"><div className="section-heading reveal"><div><span className="section-kicker">{t('05 / IMPACTO')}</span><h2>{t('Mais perto de')}<br /><em>{t('quem precisa.')}</em></h2></div><p>{t('Uma ferramenta pensada para o contexto real: diferentes equipas, diferentes distâncias, o mesmo compromisso com o cuidado. Já construímos a tecnologia — agora é chegar a quem precisa.')}</p></div><div className="impact-grid">{useCases.map(({ icon: Icon, title, text }, index) => <article className="impact-card reveal" key={title}><span className="impact-index">0{index + 1}</span><Icon size={25} /><h3>{t(title)}</h3><p>{t(text)}</p><ArrowUpRightIcon /></article>)}</div></section>

        <TeamSection language={language} />

        <section className="section-pad timeline-section" id="marcos"><div className="section-heading reveal"><div><span className="section-kicker">{t('07 / MARCOS')}</span><h2>{t('Já construímos muito.')}<br /><em>{t('E estamos prontos para mais.')}</em></h2></div><p>{t('De uma ideia executada em equipa a uma oportunidade de criar novas parcerias. Tudo por mérito próprio.')}</p></div><div className="timeline reveal"><div className="timeline-progress" /><div className="timeline-item"><span>01</span><div><small>{t('ORIGEM')}</small><strong>{t('A ideia')}</strong><p>{t('Nasce a visão de uma monitorização mais acessível.')}</p></div></div><div className="timeline-item"><span>02</span><div><small>{t('EXECUÇÃO')}</small><strong>{t('Protótipo funcional')}</strong><p>{t('Sensores, ecrã LCD e impressão de resultados ganham forma.')}</p></div></div><div className="timeline-item highlighted"><span>03</span><div><small>FITITEL 2026</small><strong>{t('Vencedores e qualificação nacional')}</strong><p>{t('O HemoLux é reconhecido na FITITEL e segue para a próxima etapa.')}</p></div></div><div className="timeline-item next"><span>04</span><div><small>{t('PRÓXIMO PASSO')}</small><strong>{t('Parcerias')}</strong><p>{t('Alianças estratégicas para crescer.')}</p></div></div></div></section>

        <section className="closing-section section-pad"><div className="closing-panel reveal"><div className="closing-orb" /><span className="section-kicker light">{t('O PRÓXIMO SINAL É TEU')}</span><h2>{t('Já construímos.')}<br /><em>{t('Agora vamos escalar.')}</em></h2><p>{t('Procuramos parceiros estratégicos — instituições, distribuidores e equipas clínicas — que queiram levar o HemoLux Lite para onde o acesso ainda não chegou. Temos tecnologia, temos protótipo, temos tração. Falamos?')}</p><button className="button button-light" onClick={() => setShowContact(true)}>{t('Falar com a equipa')} <ArrowRight size={17} /></button><div className="closing-detail"><span>HemoLux Lite</span><span>Luanda, Angola</span><span>FITITEL 2026</span></div></div></section>
      </main>

      <footer className="site-footer section-pad"><div className="footer-top"><div className="brand footer-brand"><span className="brand-mark"><Droplets size={22} strokeWidth={2.5} /></span><span><strong>Hemo<span>Lux</span></strong><small>LITE</small></span></div><p>{t('Monitorização inteligente.')}<br />{t('Cuidado que ilumina vidas.')}</p><button className="footer-mail" onClick={() => setShowContact(true)}><Mail size={16} /> hemolux.ao@gmail.com <ArrowUpRightIcon /></button></div><div className="footer-bottom"><span>© 2026 HemoLux Lite</span><span>{t('Desenvolvido no âmbito da FITITEL — ITEL')}</span><button onClick={() => scrollTo('top')}>{t('Voltar ao topo')} <ArrowDownRight size={15} className="rotate-up" /></button></div></footer>

      {showContact && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={t('CONTACTAR A EQUIPA')}><div className="contact-modal"><button className="modal-close" onClick={() => setShowContact(false)} aria-label={t('Fechar')}><X size={19} /></button><span className="section-kicker">{t('CONTACTO')}</span><h2>{t('Vamos conversar')}<br /><em>{t('parceria estratégica.')}</em></h2><p>{t('Interessado em levar o HemoLux Lite para a sua realidade? Escreve-nos e a equipa responde com a próxima conversa.')}</p><div className="contact-actions"><a className="button button-primary modal-button" href="https://wa.me/244939195101?text=Olá%20HemoLux%20Lite,%20gostaria%20de%20saber%20mais%20sobre%20o%20projecto." target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp <ArrowRight size={17} /></a><a className="button button-call" href="tel:+244939195101"><Phone size={17} /> {t('Ligar')} <ArrowRight size={17} /></a><a className="button button-email" href="mailto:hemolux.ao@gmail.com"><Mail size={17} /> {t('Enviar email')} <ArrowRight size={17} /></a></div><div className="contact-details"><small><Mail size={13} /> hemolux.ao@gmail.com</small><a href="tel:+244939195101"><Phone size={13} /> +244 939 195 101</a><a href="tel:+244951627395"><Phone size={13} /> +244 951 627 395</a></div></div></div>}
    </div>
  );
}

function ArrowUpRightIcon() { return <ArrowRight size={16} className="arrow-up-right" />; }

export default App;
