const content = document.getElementById("content");

function updateClock() {

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleDateString("pt-BR") +
        " " +
        now.toLocaleTimeString("pt-BR");
}

setInterval(updateClock, 1000);

updateClock();


const questions = [
  {
    tag: "QUIZ COMUNICAÇÃO",
    text: "Qual o tempo máximo de latência em uma comunicação Marte-Terra?",
    options: ["5 minutos", "2 horas", "20 minutos", "40 minutos"],
    answer: 3,
  },
  {
    tag: "QUIZ TECNOLOGIA",
    text: "Na estrutura tecnológica do AstroLab, qual funcionalidade atua como os 'Olhos Digitais' para monitorar a integridade dos equipamentos e prever falhas?",
    options: ["Visão Computacional", "Impressão 3D Inteligente", "Inteligência Artificial", "Reconhecimento de Voz"],
    answer: 0,
  },
  {
    tag: "QUIZ OBJETIVO",
    text: "Na seção 'Objetivos'. Quais são as duas metas numéricas e operacionais destacadas para o ecossistema das naves?",
    options: ["Impressão Infinita e Peso Nula", "50% de Economia de Redução de Danos", "100% Local e Zero Latência", "40 Minutos de Resposta e Triagem Remota"],
    answer: 2,
  },
  {
    tag: "QUIZ PUBLICO ALVO",
    text: "Qual dos seguintes locais NÃO é listado explicitamente na seção 'Público Alvo' (Projetado para ambientes extremos) do AstroLab?",
    options: ["Colonização de Marte", "Oceanos Profundos", "Estações Espaciais", "Bases Lunares"],
    answer: 1,
  },
  {
    tag: "QUIZ BENEFICIOS",
    text: "A seção 'Benefícios' exibe quatro pilares fundamentais. Quais são eles?",
    options: ["Segurança, Autonomia, Menos Erros e Menos Desperdício", "Sustentabilidade, Velocidade de Dobra, Oxigênio e Gravidade", "Velocidade, Lucro, Conforto e Comunicação", "Conexão, Inteligência, Baixo Custo, Expansão"],
    answer: 0,
  },
  {
    tag: "QUIZ NA PRÁTICA",
    text: "No fluxo do 'AstroLab na Prática', o que acontece na Etapa 02",
    options: ["Ajustar a temperatura do bico injetor da impressora 3D", "É solicitada uma confirmação final de segurança humana.", "O sistema identifica o design, verifica se há material disponível e compatível.", "O astronauta fotografa a peça danificada."],
    answer: 2,
  },
  {
    tag: "QUIZ APLICAÇÕES NA TERRA",
    text: "O AstroLab também foi projetado para ambientes extremos na Terra. Quais são as quatro aplicações terrestres mencionadas?",
    options: ["Cidades inteligentes, Fábricas automotivas, Fazendas e Escolas.", "Escritórios, Shoppings, Aeroportos e Metrôs.", "Submarinos, Desertos, Floresta Amazônica e Centros de Pesquisa Urbanos.Metano e oxigênio líquido", "Offshore, Antártida, Hospitais de campanha e Mineração.Hidrazina"],
    answer: 3,
  },
  {
    tag: "QUIZ PROBLEMA",
    text: "Quais são os três principais cartões (cards) de desafios apresentados na seção do Problema?",
    options: ["Radiação solar, Falha mecânica e Distância da Terra.", "Suporte Remoto Inviável, Estoque Limitado de Peças e Dependência de Especialistas.", "Falta de energia, Desperdício de água e Gravidade zero.", "Latência de rede, Fadiga dos astronautas e Erros de software."],
    answer: 1,
  },
  {
    tag: "QUIZ NA PRATICA",
    text: "De acordo com o passo 04 (Impressão Inteligente), o que o astronauta NÃO precisa fazer ou consultar para fabricar a peça?",
    options: ["Não precisa de autorização do comandante.", "Não precisa consultar manuais, contatar a Terra ou ter conhecimento técnico de impressão 3D.", "Não precisa usar comandos de voz.", "Não precisa abastecer a máquina com filamento."],
    answer: 1,
  },
  {
    tag: "QUIZ SOBRE NOS",
    text: "Qual é o slogan oficial do projeto AstroLab presente no site?",
    options: ["'Exploring the universe. Today and tomorrow.'", "'Autonomy in deep space exploration.'", "'Print the future. Wherever you are.'", "'The digital brain of space stations.'"],
    answer: 2,
  }
];

const letters = ['A', 'B', 'C', 'D'];
let current = 0;
let score = 0;
let answered = false;

function render() {
  const area = document.getElementById('quiz-area');
  if (!area) return;

  if (current >= questions.length) {
    showResult(area);
    return;
  }

  const q = questions[current];
  const pct = Math.round((current / questions.length) * 100);

  area.innerHTML = `
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width: ${pct}%"></div>
    </div>

    <div class="quiz-question-card">
      <div class="quiz-corner-id">ASTROLAB QUIZ 0${current + 1}</div>
      <div class="quiz-tag">${q.tag}</div>
      <div class="quiz-q-number">PERGUNTA ${current + 1} / ${questions.length}</div>
      <div class="quiz-q-text">${q.text}</div>
    </div>

    <div class="quiz-answers" id="answers"></div>

    <div class="quiz-feedback" id="quiz-feedback"></div>

    <div class="quiz-nav">
      <span class="quiz-score-display">ACERTOS: <strong>${score}</strong></span>
      <button class="quiz-btn-next" id="btn-next" disabled onclick="nextQuestion()">PRÓXIMA &rsaquo;</button>
    </div>
  `;

  const answersEl = document.getElementById('answers');
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-ans-btn';
    btn.innerHTML = `<span class="quiz-ans-letter">${letters[i]}</span><span>${opt}</span>`;
    btn.onclick = () => selectAnswer(i);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const btns = document.querySelectorAll('.quiz-ans-btn');
  const feedback = document.getElementById('quiz-feedback');

  btns.forEach(b => b.disabled = true);
  btns[idx].classList.add(idx === q.answer ? 'correct' : 'wrong');

  if (idx !== q.answer) {
    btns[q.answer].classList.add('correct');
  }

  if (idx === q.answer) {
    score++;
    feedback.className = 'quiz-feedback feedback-correct';
    feedback.textContent = '✓ RESPOSTA CORRETA';
  } else {
    feedback.className = 'quiz-feedback feedback-wrong';
    feedback.textContent = `✗ INCORRETO — Resposta correta: ${letters[q.answer]}`;
  }

  document.getElementById('btn-next').disabled = false;
}

function nextQuestion() {
  answered = false;
  current++;
  render();
}

function showResult(area) {
  const pct = Math.round((score / questions.length) * 100);

  let msg = '';
  let msgClass = '';
  if (pct >= 90) {
    msg = 'Missão cumprida. Você está pronto para o espaço.';
    msgClass = 'result-excellent';
  } else if (pct >= 70) {
    msg = 'Bom desempenho. Mais alguns treinamentos e você decola.';
    msgClass = 'result-good';
  } else if (pct >= 50) {
    msg = 'Resultado razoável. Revise os módulos e tente novamente.';
    msgClass = 'result-ok';
  } else {
    msg = 'Sistema crítico. Reinicialize o treinamento imediatamente.';
    msgClass = 'result-fail';
  }

  area.innerHTML = `
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width: 100%"></div>
    </div>
    <div class="quiz-result-card">
      <div class="quiz-tag">MISSION_COMPLETE</div>
      <div class="result-label">ACERTOS TOTAIS</div>
      <div class="result-score">${score} / ${questions.length}</div>
      <div class="result-pct ${msgClass}">${pct}% DE PRECISÃO</div>
      <div class="result-msg">${msg}</div>
      <button class="quiz-btn-restart" onclick="restartQuiz()">↺ REINICIAR MISSÃO</button>
    </div>
  `;
}

function restartQuiz() {
  current = 0;
  score = 0;
  answered = false;
  render();
}

document.addEventListener('DOMContentLoaded', render);



// --- SISTEMA DE SELEÇÃO DE TRÊS TEMAS (ESCURO, CLARO, GALÁXIA) ---

document.addEventListener('DOMContentLoaded', () => {
  const botaoTema = document.getElementById('tema-alt');
  const iconeTema = document.getElementById('tema-icone');
  const textoTema = document.getElementById('tema-txt');
  const htmlElement = document.documentElement;

  // Lista com a ordem dos temas
  const temas = ['dark', 'light', 'galaxy'];
  
  // Recupera o tema salvo ou começa no padrão 'dark'
  let temaAtual = localStorage.getItem('theme') || 'dark';

  // Aplica o tema salvo logo ao carregar a página
  aplicarTema(temaAtual);

  if (botaoTema) {
    botaoTema.addEventListener('click', () => {
      // Descobre o índice do tema atual e avança para o próximo da lista
      let proximoIndice = (temas.indexOf(temaAtual) + 1) % temas.length;
      temaAtual = temas[proximoIndice];

      // Salva no navegador e aplica o novo tema
      localStorage.setItem('theme', temaAtual);
      aplicarTema(temaAtual);
    });
  }

  function aplicarTema(tema) {
    // 1. Remove todas as classes de temas anteriores para não dar conflito
    htmlElement.classList.remove('light-tema', 'galaxy-tema');

    // 2. Aplica a classe correspondente e atualiza os textos/ícones
    if (tema === 'light') {
      htmlElement.classList.add('light-tema');
      if (iconeTema) iconeTema.className = 'bx bx-sun';
      if (textoTema) textoTema.textContent = ' Modo Claro ';
    } 
    else if (tema === 'galaxy') {
      htmlElement.classList.add('galaxy-tema');
      if (iconeTema) iconeTema.className = 'bx bx-planet'; // Ícone de planeta para o tema espacial
      if (textoTema) textoTema.textContent = ' Modo Galáxia ';
    } 
    else {
      // Padrão Dark
      if (iconeTema) iconeTema.className = 'bx bx-moon';
      if (textoTema) textoTema.textContent = ' Modo Escuro ';
    }
  }
});