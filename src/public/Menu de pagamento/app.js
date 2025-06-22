document.addEventListener('DOMContentLoaded', function () {
document.querySelectorAll('.picture-input').forEach((inputFile) => {
  const preview = inputFile.nextElementSibling;
  const defaultText = 'Escolha um arquivo';
  preview.textContent = defaultText;

  inputFile.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) {
      preview.textContent = defaultText;
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', function (e) {
      const mediaUrl = e.target.result;
      preview.innerHTML = ''; // limpa conteúdo anterior

      if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = mediaUrl;
        preview.appendChild(img);
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = mediaUrl;
        video.controls = true;
        preview.appendChild(video);
      } else {
        preview.textContent = 'Formato não suportado';
      }
    });

    reader.readAsDataURL(file);
  });
});
});

  fetch('perfil.json')
    .then(response => response.json())
    .then(data => {
      const main = document.getElementById('conteudo-principal');
      main.innerHTML = `
        <div class="container-personalizada">
          <h1>Nome: ${data.nome}</h1>
          <h1>Telefone: ${data.telefone}</h1>
          <h1>Carro: ${data.carro}</h1>
          <h1>Placa: ${data.placa}</h1>
        </div>
      `;
    })
    .catch(error => console.error('Erro ao carregar JSON:', error));