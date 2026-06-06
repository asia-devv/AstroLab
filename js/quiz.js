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
    options: ["Reconhecimento de Voz", "Impressão 3D Inteligente", "Inteligência Artificial", "Visão Computacional"],
    answer: 3,
  },
  {
    tag: "QUIZ SOBREVIVÊNCIA",
    text: "Qual é a temperatura média na superfície de Marte?",
    options: ["-63°C", "0°C", "-120°C", "25°C"],
    answer: 0,
  },
  {
    tag: "QUIZ FABRICAÇÃO",
    text: "Qual tecnologia de impressão 3D é mais adequada para ambientes de microgravidade?",
    options: ["FDM com extrusora padrão", "SLA com resina líquida", "FDM com contenção de filamento", "Impressão a jato de tinta"],
    answer: 2,
  },
  {
    tag: "QUIZ BIOLOGIA",
    text: "Quanto tempo um astronauta pode ficar na ISS sem danos severos à saúde?",
    options: ["3 meses", "6 meses", "12 meses", "24 meses"],
    answer: 1,
  },
  {
    tag: "QUIZ ÓRBITA",
    text: "A que altitude orbita a Estação Espacial Internacional (ISS)?",
    options: ["200 km", "408 km", "1.000 km", "36.000 km"],
    answer: 1,
  },
  {
    tag: "QUIZ PROPULSÃO",
    text: "Qual é o combustível usado nos foguetes Falcon 9 da SpaceX?",
    options: ["Hidrogênio líquido", "Querosene e oxigênio líquido", "Metano e oxigênio líquido", "Hidrazina"],
    answer: 1,
  },
  {
    tag: "QUIZ_GEOLOGIA",
    text: "Qual é o maior vulcão do sistema solar?",
    options: ["Vesúvio (Terra)", "Olympus Mons (Marte)", "Maxwell Montes (Vênus)", "Pico de Teide (Terra)"],
    answer: 1,
  },
  {
    tag: "QUIZ_FÍSICA",
    text: "Qual fenômeno faz o tempo passar mais devagar em maior aceleração gravitacional?",
    options: ["Efeito Doppler", "Dilatação temporal gravitacional", "Paradoxo dos gêmeos", "Efeito de lente gravitacional"],
    answer: 1,
  },
  {
    tag: "QUIZ MISSÃO",
    text: "Em qual ano o humano pisou na Lua pela primeira vez?",
    options: ["1965", "1967", "1969", "1972"],
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
