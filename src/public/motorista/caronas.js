const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
if (!usuario || usuario.tipo !== "motorista") {
  alert("Você precisa estar logado como motorista.");
  window.location.href = "/login.html";
}

let caronas = JSON.parse(localStorage.getItem("caronas") || "[]");
const agora = new Date();
const futuras = [];
const passadas = [];

caronas
  .filter(c => c.motoristaEmail === usuario.email)
  .forEach(carona => {
    const dataHora = new Date(carona.data);
    if (dataHora >= agora) {
      futuras.push(carona);
    } else {
      passadas.push(carona);
    }
  });

function salvarCaronasAtualizadas() {
  localStorage.setItem("caronas", JSON.stringify(caronas));
  window.location.reload();
}

function cancelarCarona(id) {
  if (!confirm("Deseja realmente cancelar esta carona?")) return;
  caronas = caronas.filter(c => c.id !== id);
  salvarCaronasAtualizadas();
}

function editarCarona(id) {
  const carona = caronas.find(c => c.id === id);
  if (!carona) return;

  const novaData = prompt("Nova data (formato YYYY-MM-DDTHH:MM):", carona.data);
  const novasVagas = prompt("Novo número de vagas:", carona.vagas);

  if (novaData) carona.data = novaData;
  if (novasVagas) carona.vagas = parseInt(novasVagas);

  salvarCaronasAtualizadas();
}

function exibirCaronas(lista, containerId, exibirControles = false) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (lista.length === 0) {
    container.innerHTML = `<p class="text-muted">Nenhuma carona encontrada.</p>`;
    return;
  }

  lista.forEach(carona => {
    const card = document.createElement("div");
    card.className = "card mb-3 shadow-sm";
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${carona.partida} → ${carona.destino}</h5>
        <p class="card-text">
          <strong>Data:</strong> ${new Date(carona.data).toLocaleString()}<br>
          <strong>Vagas:</strong> ${carona.vagas || "N/A"}<br>
          <strong>Passageiros confirmados:</strong> ${carona.confirmados || 0}
        </p>
        ${exibirControles ? `
          <button class="btn btn-primary btn-sm me-2" onclick="editarCarona(${carona.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="cancelarCarona(${carona.id})">Cancelar</button>
        ` : ""}
      </div>
    `;
    container.appendChild(card);
  });
}

exibirCaronas(futuras, "caronasFuturas", true);
exibirCaronas(passadas, "caronasPassadas");
