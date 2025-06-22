let lat = -15.7942;
let lon = -47.8822;
let map;
let marker;

function getLocation() {
  if (!navigator.geolocation) {
    console.error("Geolocalização não é suportada.");
    initMap();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      initMap();
    },
    (err) => {
      console.error("Erro ao obter localização:", err);
      initMap();
    }
  );
}

// 🔄 initMap como global
window.initMap = function () {
  const position = { lat, lng: lon };

  map = new google.maps.Map(document.getElementById("map"), {
    center: position,
    zoom: 12,
  });

  marker = new google.maps.Marker({
    position,
    map,
    title: "Sua localização",
  });

  activateSearchBoxes();
};

function activateSearchBoxes() {
  const campos = ["partida", "destino"]; // só os que existem no seu HTML

  campos.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      const autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", map);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          alert("Local não encontrado.");
          return;
        }

        map.panTo(place.geometry.location);
        map.setZoom(14);
        marker.setPosition(place.geometry.location);
        marker.setTitle(place.name || input.placeholder);
      });
    }
  });
}

getLocation();
