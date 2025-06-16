document.getElementById('criarCarona').addEventListener('click', () => {
  const partida = document.getElementById('partida').value;
  const destino = document.getElementById('destino').value;
  const horario = document.getElementById('horario').value;

  if (!partida || !destino || !horario) {
    alert('Preencha todos os campos.');
    return;
  }

  // Preenche o card com os dados inseridos
  document.getElementById('saidaInfo').value = partida;
  document.getElementById('destinoInfo').value = destino;
  document.getElementById('horarioInfo').value = horario;

  // Exibe o card
  document.getElementById('cardCarona').style.display = 'block';

});

fetch('motorista.json')
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