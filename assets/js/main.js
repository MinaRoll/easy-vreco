function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: {lat: -9.1191427, lng: -77.0349046},
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
  });

   function buscar(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }

  document.getElementById("encuentrame").addEventListener("click", buscar);

  var latitud, longitud;

  var funcionExito = function(posicion){
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;
    var image = 'http://http://www.adktrailmap.com/webmap/images/Biking.png';
    var miUbicacion = new google.maps.Marker({
      position: {lat: latitud, lng: longitud},
      animacion: google.maps.Animation.DROP,
      map: map,
      icon: image
    });
    map.setZoom(17);
    map.setCenter({lat: latitud, lng: longitud});
  }

  var funcionError = function(error){
    alert("Tenemos problemas para encontrar tu ubicación");
  }

  var map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  });