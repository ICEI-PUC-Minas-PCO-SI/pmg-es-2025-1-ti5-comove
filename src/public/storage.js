// Função para salvar uma carona no localStorage
export function salvarCarona(origem, destino, parada) {
  const caronas = JSON.parse(localStorage.getItem("caronas")) || [];

  const novaCarona = {
    origem,
    destino,
    parada,
    data: new Date().toLocaleString("pt-BR")
  };

  caronas.push(novaCarona);
  localStorage.setItem("caronas", JSON.stringify(caronas));
}

// Função para obter todas as caronas
export function obterCaronas() {
  return JSON.parse(localStorage.getItem("caronas")) || [];
}
