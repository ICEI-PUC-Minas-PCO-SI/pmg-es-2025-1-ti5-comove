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
  const data = document.getElementById('data').value;
  const vagas = parseInt(document.getElementById('vagas').value);

  if (!partida || !destino || !data || isNaN(vagas)) {
    alert("Preencha todos os campos da carona.");
    return;
  }

  // Pega as caronas do localStorage
  const caronas = JSON.parse(localStorage.getItem("caronas") || "[]");

  const novaCarona = {
    partida,
    destino,
    data,
    vagas,
    motoristaEmail: usuarioLogado.email,
    motoristaNome: usuarioLogado.nome,
    motoristaGenero: usuarioLogado.genero,
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
  document.getElementById('dataInfo').value = formatarDataHora(carona.data);
  cardCarona.style.display = 'block';
}

function formatarDataHora(valorISO) {
  const data = new Date(valorISO);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
}

