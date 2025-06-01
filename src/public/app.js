// Função para calcular distância usando Google Maps
function calcularRotasComDesvio(origem, destino, parada) {
  const service = new google.maps.DirectionsService();

  const direto = {
    origin: origem,
    destination: destino,
    travelMode: google.maps.TravelMode.DRIVING
  };

  const comParada = {
    origin: origem,
    destination: destino,
    waypoints: [{ location: parada }],
    travelMode: google.maps.TravelMode.DRIVING
  };

  service.route(direto, (diretaResult, status1) => {
    if (status1 !== "OK") {
      alert("Erro ao calcular rota direta.");
      return;
    }

    const distanciaDireta = diretaResult.routes[0].legs[0].distance.value;

    service.route(comParada, (paradaResult, status2) => {
      if (status2 !== "OK") {
        alert("Erro ao calcular rota com parada.");
        return;
      }

      const distanciaParada = paradaResult.routes[0].legs.reduce(
        (acc, leg) => acc + leg.distance.value, 0
      );

      const dentroDoLimite = distanciaParada <= distanciaDireta * 1.2;

      const dadosCarona = {
        origem,
        destino,
        parada,
        data: new Date().toISOString(),
        status: dentroDoLimite ? "solicitado" : "recusado"
      };

      salvarNoHistorico(dadosCarona);

      if (dentroDoLimite) {
        alert("O desvio de rota está dentro do limite e a solicitação foi enviada ao motorista.");
        window.location.href = "historico.html";
      } else {
        mostrarErroNaPagina("Limite de desvio ultrapassado, tente novamente.");
      }
    });
  });
}

// Exibe alerta na própria página
function mostrarErroNaPagina(mensagem) {
  const divErro = document.createElement("div");
  divErro.className = "alert alert-danger mt-3";
  divErro.textContent = mensagem;
  const form = document.getElementById("formDesvio");
  form.parentNode.insertBefore(divErro, form.nextSibling);
}

// Salva no localStorage
function salvarNoHistorico(carona) {
  let historico = JSON.parse(localStorage.getItem("historico")) || [];
  historico.push(carona);
  localStorage.setItem("historico", JSON.stringify(historico));
}

// Manipula o formulário na index.html
if (document.getElementById("formDesvio")) {
  document.getElementById("formDesvio").addEventListener("submit", function (e) {
    e.preventDefault();
    const origem = document.getElementById("origem").value;
    const destino = document.getElementById("destino").value;
    const parada = document.getElementById("parada").value;

    calcularRotasComDesvio(origem, destino, parada);
  });
}

// Exibe o histórico na historico.html
if (window.location.pathname.includes("historico.html")) {
  const lista = document.getElementById("lista-caronas");
  const historico = JSON.parse(localStorage.getItem("historico")) || [];

  if (historico.length === 0) {
    lista.innerHTML = "<li class='list-group-item'>Nenhuma carona registrada.</li>";
  } else {
    historico.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item";

      const dataFormatada = new Date(item.data).toLocaleString("pt-BR");

      li.innerHTML = `
        <strong>Carona ${index + 1}</strong><br>
        <strong>Origem:</strong> ${item.origem}<br>
        <strong>Destino:</strong> ${item.destino}<br>
        <strong>Parada:</strong> ${item.parada}<br>
        <strong>Data:</strong> ${dataFormatada}
      `;

      if (item.status === "solicitado") {
        li.innerHTML += `<div class="alert alert-warning mt-2 mb-0 py-2 px-3">Solicitação enviada</div>`;
      } else if (item.status === "recusado") {
        li.innerHTML += `<div class="alert alert-danger mt-2 mb-0 py-2 px-3">Desvio ultrapassado — solicitação recusada</div>`;
      }

      lista.appendChild(li);
    });
  }
}
