const button = document.querySelector('button')
const modal = document.querySelector('dialog')
const buttonClose = document.querySelector('dialog button')
const closeDiv = document.querySelector(".first-screen")

button.addEventListener('click', () => {
    modal.showModal()
    closeDiv.style.display = "none"
})

buttonClose.addEventListener('click', () => {
    modal.close()
})

const nome = document.querySelector("#nameH2")
const username = document.querySelector("#username")
const email = document.querySelector("#email")

fetch('./assets/js/dados.json').then((resposta) => {
    return resposta.json()
}).then ((informacoes) => {
    informacoes.user.map((listagem) => {
        nome.innerHTML += `${listagem.name}`
        username.innerHTML += `${listagem.username}`
        email.innerHTML += `${listagem.email}`
    })
})
