'use strict';

function initMap() {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var location = { lat: -12.145046,
    lng: -77.021865 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: location
  });

  directionsDisplay.setMap(map);

  // Añade marcador de autos
  var myMarker = new google.maps.Marker({
    position: location,
    map: map,
    icon: 'assets/icons/auto1.png'
  });

  // Obtener ubicación actual de usuario
  function search() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(functionSuccess, functionError);
    }
  };

  // autocompletado:
  var startPoint = document.getElementById('start-point');
  var finalPoint = document.getElementById('final-point');
  new google.maps.places.Autocomplete(startPoint);
  new google.maps.places.Autocomplete(finalPoint);

  // obtener ruta:
  var getRoute = function getRoute(event) {
    event.preventDefault();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('route').addEventListener('click', getRoute);
}

var calculateAndDisplayRoute = function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('start-point').value,
    destination: document.getElementById('final-point').value,
    travelMode: 'DRIVING'
  }, function (response, status) {
    if (status === 'OK') {
      var distance = Number(response.routes[0].legs[0].distance.text.replace('km', '').replace(',', '.'));
      console.log(response);
      console.log(distance);
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Estamos teniendo inconvenientes para encontrar su ubicación');
    }
    // document.querySelector('.description-js').innerHTML = 'Punto de origen: ' + document.getElementById('start-point').value + '<br>' + 'Punto de llegada: ' + document.getElementById('final-point').value ;


    document.getElementById('start-point').value = '';
    document.getElementById('final-point').value = '';
  });
};