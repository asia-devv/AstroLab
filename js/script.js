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


// -- Validação do Formulário de Contato --

const form = document.getElementById('form-contato');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const valido = validarFormulario();

        if (valido) {
            const status = document.getElementById('form-status');
            const btn = document.querySelector('.btn-transmitir');

            btn.disabled = true;
            btn.textContent = 'TRANSMITINDO...';

            setTimeout(() => {
                status.textContent = '✓ TRANSMISSÃO CONFIRMADA - MENSAGEM ENVIADA';
                status.className = 'form-status sucesso';
                btn.textContent = 'TRANSMITIR ›';
                btn.disabled = false;
                form.reset();
                limparErros();
            }, 1200);
        }
    });

    // Limpa erro ao começar a digitar
    form.querySelectorAll('input, select, textarea').forEach(campo => {
        campo.addEventListener('input', () => {
            campo.classList.remove('invalido');
            const erroId = 'erro-' + campo.id;
            const erroEl = document.getElementById(erroId);
            if (erroEl) erroEl.textContent = '';

            const status = document.getElementById('form-status');
            if (status) { status.textContent = ''; status.className = 'form-status'; }
        });
    });
}

function validarFormulario() {
    let valido = true;

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const assunto = document.getElementById('assunto');
    const mensagem = document.getElementById('mensagem');

    limparErros();

    // Nome
    if (!nome.value.trim()) {
        mostrarErro(nome, 'erro-nome', 'Campo obrigatório — informe sua identificação.');
        valido = false;
    } else if (nome.value.trim().length < 2) {
        mostrarErro(nome, 'erro-nome', 'Nome muito curto.');
        valido = false;
    }

    // Email
    if (!email.value.trim()) {
        mostrarErro(email, 'erro-email', 'Campo obrigatório — informe seu email de uplink.');
        valido = false;
    } else if (!validarEmail(email.value.trim())) {
        mostrarErro(email, 'erro-email', 'Formato de email inválido.');
        valido = false;
    }

    // Assunto
    if (!assunto.value) {
        mostrarErro(assunto, 'erro-assunto', 'Selecione um protocolo.');
        valido = false;
    }

    // Mensagem
    if (!mensagem.value.trim()) {
        mostrarErro(mensagem, 'erro-mensagem', 'Campo obrigatório — escreva sua mensagem.');
        valido = false;
    } else if (mensagem.value.trim().length < 10) {
        mostrarErro(mensagem, 'erro-mensagem', 'Mensagem muito curta (mínimo 10 caracteres).');
        valido = false;
    }

    return valido;
}

function mostrarErro(campo, erroId, mensagem) {
    campo.classList.add('invalido');
    const erroEl = document.getElementById(erroId);
    if (erroEl) erroEl.textContent = mensagem;
}

function limparErros() {
    document.querySelectorAll('.form-erro').forEach(el => el.textContent = '');
    document.querySelectorAll('.invalido').forEach(el => el.classList.remove('invalido'));
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
let fotos = [
    { src: "offshore.jpeg",    legenda: "Plataformas Offshore"   },
    { src: "antartida.jpeg",   legenda: "Antártica"              },
    { src: "hospital.jpeg",    legenda: "Hospitais de Campanha"  },
    { src: "mineração.jpeg",   legenda: "Mineração Remota"       }
];
let x = 0;

const fotoA   = document.getElementById("foto-a");
const fotoB   = document.getElementById("foto-b");
const legenda = document.getElementById("slide-legenda");
let ativa   = fotoA;
let proxima = fotoB;

function slideshow() {
    x = (x + 1) % fotos.length;

    proxima.src = "./images/" + fotos[x].src;
    ativa.classList.remove("ativa");
    proxima.classList.add("ativa");

    // Fade na legenda
    legenda.style.opacity = 0;
    setTimeout(() => {
        legenda.textContent = fotos[x].legenda;
        legenda.style.opacity = 1;
    }, 400);

    [ativa, proxima] = [proxima, ativa];
}

setInterval(slideshow, 5000);

// -- Scroll Spy: destaca o link ativo na sidebar --

const secoes = [
    { id: 'inicio',       nav: '.nav-inicio'   },
    { id: 'problema',     nav: '.nav-problema'  },
    { id: 'tecnologia',   nav: '.nav-tecnologia'},
    { id: 'objetivos',    nav: '.nav-objetivos' },
    { id: 'publico',      nav: '.nav-publico'   },
    { id: 'beneficios',   nav: '.nav-beneficios'},
    { id: 'dia_a_dia',    nav: '.nav-dia'       },
    { id: 'planeta-terra',nav: '.nav-planeta'   },
    { id: 'contato',      nav: '.nav-contato'   },
    { id: 'fim',          nav: '.nav-fim'        },
];

function atualizarNavAtiva() {
    let secaoAtual = secoes[0].id;

    secoes.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const topo = el.getBoundingClientRect().top;
        if (topo <= window.innerHeight * 0.4) {
            secaoAtual = id;
        }
    });

    secoes.forEach(({ id, nav }) => {
        const link = document.querySelector(nav);
        if (!link) return;
        link.classList.toggle('active', id === secaoAtual);
    });
}

window.addEventListener('scroll', atualizarNavAtiva);
atualizarNavAtiva(); // roda na carga pra já marcar o início


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