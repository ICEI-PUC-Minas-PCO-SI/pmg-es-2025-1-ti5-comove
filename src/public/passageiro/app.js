// app.js (página index/passageiro)
import { mostrarErroNaPagina } from "./utils.js";

let caronas = [];
let caronaSelecionada = null;

function salvarHistoricoCarona(dadosHistorico) {
  const historico = JSON.parse(localStorage.getItem("historicoCaronas")) || [];
  historico.push(dadosHistorico);
  localStorage.setItem("historicoCaronas", JSON.stringify(historico));
}

function carregarCaronas() {
  caronas = JSON.parse(localStorage.getItem("caronas") || "[]");
  const lista = document.getElementById("listaCaronas");

  if (!lista) return;

  lista.innerHTML = "";

  if (caronas.length === 0) {
    lista.innerHTML = "<p>Nenhuma carona disponível no momento.</p>";
    return;
  }

  caronas.forEach((carona, index) => {
    const card = document.createElement("div");
    card.className = "card mb-3 p-3 carona-card";
    card.style.maxWidth = "500px";
    card.innerHTML = `
      <h5 class="mb-2">Carona disponível</h5>
      <p><strong>Partida:</strong> ${carona.partida}</p>
      <p><strong>Destino:</strong> ${carona.destino}</p>
      <p><strong>Horário:</strong> ${carona.horario}</p>
      <p><strong>Motorista:</strong> ${carona.motoristaNome || 'Desconhecido'}</p>
    `;
    card.onclick = () => {
      caronaSelecionada = carona;
      alert("Carona selecionada!");
    };
    lista.appendChild(card);
  });
}

function calcularRotasComDesvio(origem, destino, parada) {
  const service = new google.maps.DirectionsService();

  service.route({
    origin: origem,
    destination: destino,
    travelMode: google.maps.TravelMode.DRIVING
  }, (diretaResult, status1) => {
    if (status1 !== "OK") {
      alert("Erro ao calcular rota direta.");
      return;
    }

    const distanciaDireta = diretaResult.routes[0].legs[0].distance.value;

    service.route({
      origin: origem,
      destination: destino,
      waypoints: [{ location: parada }],
      travelMode: google.maps.TravelMode.DRIVING
    }, (paradaResult, status2) => {
      if (status2 !== "OK") {
        alert("Erro ao calcular rota com parada.");
        return;
      }

      const distanciaParada = paradaResult.routes[0].legs.reduce((acc, leg) => acc + leg.distance.value, 0);
      const dentroDoLimite = distanciaParada <= distanciaDireta * 1.2;

      const passageiro = JSON.parse(localStorage.getItem("usuarioLogado"));

      const dadosHistorico = {
        id: "h" + Date.now(),
        motoristaId: caronaSelecionada.motoristaId,
        passageiroId: passageiro?.email || "desconhecido",
        partida: origem,
        destino: destino,
        parada: parada,
        data: new Date().toISOString(),
        status: dentroDoLimite ? "aceito" : "recusado",
        desvioAceito: dentroDoLimite
      };

      salvarHistoricoCarona(dadosHistorico);

      if (dentroDoLimite) {
        alert("Você foi aceito na carona!");
        window.location.href = "historico.html";
      } else {
        mostrarErroNaPagina("Limite de desvio ultrapassado.");
      }
    });
  });
}

document.getElementById("formDesvio").addEventListener("submit", function (e) {
  e.preventDefault();
  if (!caronaSelecionada) {
    alert("Por favor, selecione uma carona antes.");
    return;
  }

  const parada = document.getElementById("parada").value;
  calcularRotasComDesvio(caronaSelecionada.partida, caronaSelecionada.destino, parada);
});

window.onload = carregarCaronas;
