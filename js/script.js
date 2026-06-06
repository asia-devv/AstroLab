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