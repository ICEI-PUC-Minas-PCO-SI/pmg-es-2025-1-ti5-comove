// Busca todos os motoristas cadastrados no localStorage
export async function buscarMotoristas() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const motoristas = usuarios.filter(user => user.tipo === "motorista");
  return motoristas;
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
  if (form) {
    form.parentNode.insertBefore(divErro, form.nextSibling);
  }
}
