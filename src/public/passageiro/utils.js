// utils.js

// Busca todos os motoristas cadastrados
export async function buscarMotoristas() {
  const res = await fetch("http://localhost:3000/motorista");
  return await res.json();
}

// Formata datas em português (para histórico etc.)
export function formatarData(dataString) {
  const data = new Date(dataString);
  return data.toLocaleString("pt-BR");
}

// Mostra uma mensagem de erro abaixo do formulário de parada
export function mostrarErroNaPagina(mensagem) {
  const divErro = document.createElement("div");
  divErro.className = "alert alert-danger mt-3";
  divErro.textContent = mensagem;
  const form = document.getElementById("formDesvio");
  form.parentNode.insertBefore(divErro, form.nextSibling);
}
