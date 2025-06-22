const motoristaId = 2; // Simulando login

// Buscar dados do motorista no backend
fetch(`http://localhost:3000/motorista/${motoristaId}`)
  .then(response => response.json())
  .then(data => {
    const infoSection = document.getElementById('dados-motorista');
    infoSection.innerHTML = `
      <h2>Motorista: ${data.nome}</h2>
      <h2>Carro: ${data.carro}</h2>
      <h2>Avaliação: ${data.avaliacao}</h2>
    `;
  })
  .catch(error => {
    console.error('Erro ao carregar dados do motorista:', error);
  });

// Envio da carona ao backend
document.getElementById("formCarona").addEventListener("submit", function (e) {
  e.preventDefault();

  const partida = document.getElementById("partida").value;
  const destino = document.getElementById("destino").value;
  const horario = document.getElementById("horario").value;

  if (!partida || !destino || !horario) {
    alert("Preencha todos os campos da carona.");
    return;
  }

  const novaCarona = {
    partida,
    destino,
    horario,
    motoristaId
  };

  fetch("http://localhost:3000/caronas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novaCarona),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Carona criada com sucesso!");

      document.getElementById('saidaInfo').value = partida;
      document.getElementById('destinoInfo').value = destino;
      document.getElementById('horarioInfo').value = horario;
      document.getElementById('cardCarona').style.display = 'block';

      document.getElementById("formCarona").reset();
    })
    .catch((err) => {
      console.error("Erro ao salvar carona:", err);
    });
});
