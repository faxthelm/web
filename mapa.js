function initMap() {
  var lat =0;
  var long =0;
  var map;
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude);
    });
  }

  if (lat != 0 && long != 0) {
    var latlng = new google.maps.LatLng(lat, long);
    //precisa ativar os botoes
  } else {
    var latlng = new google.maps.LatLng(-23.481996, -46.500503);
    //botoes desativados
  }


  var options = {
      zoom: 16,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map'), options);
}
