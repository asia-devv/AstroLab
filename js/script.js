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

oi