// app.js
import { buscarMotoristas, mostrarErroNaPagina } from "./utils.js";

let caronas = [];
let caronaSelecionada = null;

async function carregarCaronas() {
  const res = await fetch("http://localhost:3000/caronas");
  const caronasData = await res.json();
  caronas = caronasData;

  console.log("Caronas carregadas:", caronas); // ← Aqui você vê se os dados chegaram

  const motoristas = await buscarMotoristas();
  console.log("Motoristas carregados:", motoristas); // ← Verifica se os motoristas vieram

  const lista = document.getElementById("listaCaronas");
  lista.innerHTML = "";

  if (caronas.length === 0) {
    lista.innerHTML = "<p>Nenhuma carona disponível no momento.</p>";
    return;
  }

  caronas.forEach((carona) => {
    const motorista = motoristas.find(m => m.id == String(carona.motoristaId));
    console.log("Motorista encontrado:", motorista); // ← Aqui você vê se ele foi identificado

    const div = document.createElement("div");
    div.className = "carona-card";
    div.innerHTML = `
      <strong>Origem:</strong> ${carona.partida}<br>
      <strong>Destino:</strong> ${carona.destino}<br>
      <strong>Motorista:</strong> ${motorista ? motorista.nome : "Desconhecido"}
    `;
    div.onclick = () => {
      caronaSelecionada = carona;
      alert("Carona selecionada com sucesso!");
    };
    lista.appendChild(div);
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

      const dadosHistorico = {
        id: "h" + Date.now(),
        motoristaId: caronaSelecionada.motoristaId,
        passageiroId: "1", // <- Ajuste se tiver autenticação
        partida: origem,
        destino: destino,
        parada: parada,
        data: new Date().toISOString(),
        status: dentroDoLimite ? "aceito" : "recusado",
        desvioAceito: dentroDoLimite
      };

      fetch("http://localhost:3000/historicoCaronas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosHistorico)
      });

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
