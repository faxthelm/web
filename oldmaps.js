var latlng = new google.maps.LatLng(-23.481996, -46.500503);

var options = {
    zoom: 5,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

map = new google.maps.Map(document.getElementById("mapa"), options);
}
