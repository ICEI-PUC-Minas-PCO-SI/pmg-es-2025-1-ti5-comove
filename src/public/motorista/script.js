// Ao carregar a página, verifica se tem usuário logado
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
if (!usuarioLogado || usuarioLogado.tipo !== "motorista") {
  alert("Você precisa estar logado como motorista para acessar esta página.");
  window.location.href = "/login.html"; // ajuste o caminho conforme seu projeto
}

// Preenche dados do motorista na página (se quiser exibir)
const infoSection = document.getElementById('dados-motorista');
if (infoSection && usuarioLogado) {
  infoSection.innerHTML = `
    <h2>Motorista: ${usuarioLogado.nome}</h2>
    <h2>Carro: ${usuarioLogado.carro || 'Não informado'}</h2>
  `;
}

// Evento para enviar o formulário e salvar carona
document.getElementById("formCarona").addEventListener("submit", function(e) {
  e.preventDefault();

  const partida = document.getElementById("partida").value.trim();
  const destino = document.getElementById("destino").value.trim();
  const horario = document.getElementById("horario").value.trim();

  if (!partida || !destino || !horario) {
    alert("Preencha todos os campos da carona.");
    return;
  }

  // Pega as caronas do localStorage
  const caronas = JSON.parse(localStorage.getItem("caronas") || "[]");

  const novaCarona = {
    partida,
    destino,
    horario,
    motoristaEmail: usuarioLogado.email,
    motoristaNome: usuarioLogado.nome,
    id: Date.now() // id único simples
  };

  caronas.push(novaCarona);
  localStorage.setItem("caronas", JSON.stringify(caronas));

  alert("Carona criada com sucesso!");
  this.reset();

  mostrarCaronaNaPagina(novaCarona);
});

function mostrarCaronaNaPagina(carona) {
  const cardCarona = document.getElementById('cardCarona');
  document.getElementById('saidaInfo').value = carona.partida;
  document.getElementById('destinoInfo').value = carona.destino;
  document.getElementById('horarioInfo').value = carona.horario;
  cardCarona.style.display = 'block';
}
