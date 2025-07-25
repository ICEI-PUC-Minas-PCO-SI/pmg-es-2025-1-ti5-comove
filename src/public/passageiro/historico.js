// historico.js
import { buscarMotoristas, formatarData } from "./utils.js";

function carregarHistoricoCaronas() {
  const lista = document.getElementById("lista-caronas");
  lista.innerHTML = "";

  const historico = JSON.parse(localStorage.getItem("historicoCaronas")) || [];
  const motoristas = JSON.parse(localStorage.getItem("motoristas")) || [];

  if (historico.length === 0) {
    lista.innerHTML = "<li class='list-group-item'>Nenhuma carona no histórico.</li>";
    return;
  }

  historico.forEach((registro) => {
    const motorista = motoristas.find(m => m.id === registro.motoristaId);
    const item = document.createElement("li");
    item.className = "list-group-item list-group-item-secondary";
    item.innerHTML = `
      <strong>[HISTÓRICO]</strong><br>
      <strong>Origem:</strong> ${registro.partida}<br>
      <strong>Destino:</strong> ${registro.destino}<br>
      <strong>Parada:</strong> ${registro.parada}<br>
      <strong>Status:</strong> ${registro.status}<br>
      <strong>Data:</strong> ${formatarData(registro.data)}<br>
      <strong>Motorista:</strong> ${motorista ? motorista.nome : "Desconhecido"}
    `;
    lista.appendChild(item);
  });
}

window.onload = carregarHistoricoCaronas;