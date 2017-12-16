
      var markersP = [];
      var markersB = [];
      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -23.481996, lng: -46.500503},
          zoom: 18
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            map.setCenter(pos);
            document.getElementById("onibus").disabled = false;
            document.getElementById("paradas").disabled = false;
            document.getElementById("onibus").checked = true;
            document.getElementById("paradas").checked = true;
            document.getElementById("map").style.visibility = 'visible';
            checkParada();
            //checkBusao();
          }
          );
        }else {

        }
        map.addListener("zoom_changed", function() {
           // send the new bounds back to your server
           lat0 = map.getBounds().getNorthEast().lat();
           long0 = map.getBounds().getNorthEast().lng();
           lat1 = map.getBounds().getSouthWest().lat();
           long1 = map.getBounds().getSouthWest().lng();
           center = map.getCenter();
           move(lat0,long0,lat1,long1,center);
        });
        map.addListener('dragend', function () {
          var idleListener = map.addListener('idle', function () {
          google.maps.event.removeListener(idleListener);
          lat0 = map.getBounds().getNorthEast().lat();
          long0 = map.getBounds().getNorthEast().lng();
          lat1 = map.getBounds().getSouthWest().lat();
          long1 = map.getBounds().getSouthWest().lng();
          center = map.getCenter();


          move(lat0,long0,lat1,long1,center);
        });
        });

        function move(lat0,long0,lat1,long1,center){
        map.setCenter(center);
        if (document.getElementById("paradas").checked) {
          sendJsonData(lat0,long0,lat1,long1); //paradas
        }
        }
        function addMarker(lat, long, name, desc, bool) {
          var iconid = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
          if(bool){
            iconid = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
          }
          var info = name +" "+ desc;
          marker = new google.maps.Marker({
          position: new google.maps.LatLng({lat:lat,lng:long}),
          icon: iconid,
          map: map
          });
          var infowindow = new google.maps.InfoWindow({
            content: info
          });
          marker.addListener('click', function() {
            infowindow.open(map, this);
          });
          return marker;
        }
        function sendJsonData(lt0,long0,lt1,long1){
          var lng0 = long0;
          var lat0= lt0;
          var lng1= long1;
          var lat1= lt1;
          var reqs = {"lng0":lng0,"lng1":lng1,"lat0":lat0,"lat1":lat1};
          var xhr = new XMLHttpRequest();
          var uri = encodeURIComponent(JSON.stringify(reqs));
          var url = "https://esperandobusao.tk/paradas.php?lng0=" + lng0 + "&lng1=" + lng1 + "&lat0=" + lat0 + "&lat1=" + lat1;
          console.log(url);
          xhr.open("GET", url, true);
          xhr.setRequestHeader("Content-type", "application/json");
          xhr.send();
          xhr.onreadystatechange = function () {
            clearOverlays(markersP);
              if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                  var json = JSON.parse(xhr.responseText);
                  console.log(json);
                  for(i=0;i<=json.length-1;i++){
                    var markP = addMarker(parseFloat(json[i].stop_lat),parseFloat(json[i].stop_long),json[i].stop_name,'Descrição:<br />'+json[i].stop_desc, false);
                    markersP.push(markP);
                  }

              }
          }
        }
        document.getElementById("onibus").addEventListener("click",checkBusao,false)
        function checkBusao(){
          if (document.getElementById("onibus").checked) {
            lat0 = map.getBounds().getNorthEast().lat();
            long0 = map.getBounds().getNorthEast().lng();
            lat1 = map.getBounds().getSouthWest().lat();
            long1 = map.getBounds().getSouthWest().lng();
            center = map.getCenter();
            document.getElementById("atualizar").hidden = false;
            move(lat0,long0,lat1,long1,center);
          } else {
            document.getElementById("atualizar").hidden = true;
            clearOverlays(markersB);
          }
        };
        document.getElementById("atualizar").addEventListener("click",atualizar,false)
        function atualizar(){

        }
        document.getElementById("paradas").addEventListener("click",checkParada,false)
        function checkParada(){
          if (document.getElementById("paradas").checked) {
            lat0 = map.getBounds().getNorthEast().lat();
            long0 = map.getBounds().getNorthEast().lng();
            lat1 = map.getBounds().getSouthWest().lat();
            long1 = map.getBounds().getSouthWest().lng();
            center = map.getCenter();
            move(lat0,long0,lat1,long1,center);
          } else {
            clearOverlays(markersP);
          }
        };
        function clearOverlays(markersArray){
          console.log(markersArray);
          while(markersArray.length) {
            var p = markersArray.pop();
            p.setMap(null);
          }
            markersArray.length = 0;
          }
    }
