const btnOpen = document.getElementById("open-modal")
const modal = document.querySelector("dialog")
const closeDiv = document.querySelector(".first-screen")
const btnClose = document.querySelector("#close-button")

btnOpen.addEventListener('click', () => {
    modal.showModal()
    closeDiv.style.display = "none"
})

btnClose.addEventListener('click', () => {
    modal.close()
    closeDiv.style.display = "block"
})

const driverName = document.getElementById("driver-name")
const passengerName = document.getElementById("passenger-name")
const firstAddress = document.getElementById("address-first")
const secondAddress = document.getElementById("address-second")

fetch('./assets/js/dados.json').then((resposta) => {
    return resposta.json()
}).then ((informacoes) => {
    informacoes.trip.map((listagem) => {
        driverName.innerHTML += `${listagem.driver}`
        passengerName.innerHTML += `${listagem.passenger}`
        // firstAddress.innerHTML += `${listagem.initialPoint}`
        // secondAddress.innerHTML += `${listagem.lastPoint}`
    })
})

// let map, infoWindow;

// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'),{center: {lat: -34.397, lng: 150.664, zoom: 10}})

//     infoWindow = new google.maps.infoWindow()

//     const locationButton = document.createElement('button')

//     locationButton.textContent = "Pan to Current Location"
//     locationButton.classList.add("custom-map-control-button")
//     map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton)
//     locationButton.addEventListener('click', () => {
//         if(navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const pos = {
//                         lat: position.coords.latitude,
//                         lng: position.coords.longitude
//                     }

//                     infoWindow.setPosition(pos)
//                     infoWindow.setContent("Location found")
//                     infoWindow.open(map)
//                     map.setCenter(pos)
//                 },
//                 () => {
//                     handleLocationError(true, infoWindow, map.getCenter())
//                 }
//             )
//         } else {
//             handleLocationError(false, infoWindow, map.getCenter())
//         }
//     })
// }

// window.initMap = initMap

let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

initMap();