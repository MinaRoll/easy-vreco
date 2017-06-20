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
        center: {lat: -9.1191427, lng: -77.0349046},
        zoom: 5
    });

    new AutocompletaDireccion(map);
  }

    /* Constructor */
    function AutocompletaDireccion(map) {
        this.map = map;
        this.origenId = null;
        this.destinoId = null;
        this.viaje = 'CAMINANDO';
        var origen = document.getElementById('origen-input');
        var destino = document.getElementById('destino-input');
        var seleccion = document.getElementById('modo-seleccion');
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var origenAutocompleto = new google.maps.places.Autocomplete(origen, {placeIdOnly: true});
        var destinoAutocompleto = new google.maps.places.Autocomplete(destino, {placeIdOnly: true});

        this.setupClickListener('buscar-caminando', 'CAMINANDO');
        this.setupClickListener('buscar-tpublico', 'TRANSPORTE PÚBLICO');
        this.setupClickListener('buscar-auto', 'AUTO');

        this.setupPlaceChangedListener(origenAutocompleto, 'ORIG');
        this.setupPlaceChangedListener(destinoAutocompleto, 'DEST');

        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(seleccion);
    }

    // Autocompletado
    AutocompletaDireccion.prototype.setupClickListener = function(id, modo) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
            me.viaje = modo;
            me.route();
        });
    };

    AutocompletaDireccion.prototype.setupPlaceChangedListener = function(autocompletado, modo) {
        var me = this;
        autocompletado.bindTo('bounds', this.map);
        autocompletado.addListener('place_changed', function() {
        var place = autocompletado.getPlace();
        if (!place.place_id) {
            window.alert("Por favor selecciona una opción.");
            return;
        }
        if (modo === 'ORIG') {
            me.origenId = place.place_id;
        } 
        else {
            me.destinoId = place.place_id;
        }
        me.route();
        });

    };


    AutocompletaDireccion.prototype.route = function() {
        if (!this.origenId || !this.destinoId) {
            return;
        }
        var me = this;
        var image = 'http://www.adktrailmap.com/webmap/images/Biking.png';
           
        this.directionsService.route({
            origen: {'placeId': this.origenId},
            destino: {'placeId': this.destinoId},
            viaje: this.viaje
        }, function(response, status) {
            if (status === 'OK') {
                document.getElementById("ruta").addEventListener("click", function(){
                    me.directionsDisplay.setDirections(response);
                });
            }
            else {
                window.alert('Se ha producido un error' + status);
            }
        });
      
    };