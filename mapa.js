mainMap.addListener('dragend', function () {
  var idleListener = mainMap.addListener('idle', function () {
  google.maps.event.removeListener(idleListener);
  lat = mainMap.getBounds().getNorthEast().lat();
  long = mainMap.getBounds().getNorthEast().lng();
  lat1 = mainMap.getBounds().getSouthWest().lat();
  long1 = mainMap.getBounds().getSouthWest().lng();
  center = mainMap.getCenter();
  move(lat1,long1,lat,long,center);
});
});

mainMap.addListener("zoom_changed", function() {
   // send the new bounds back to your server
   lat = mainMap.getBounds().getNorthEast().lat();
   long = mainMap.getBounds().getNorthEast().lng();
   lat1 = mainMap.getBounds().getSouthWest().lat();
   long1 = mainMap.getBounds().getSouthWest().lng();
   center = mainMap.getCenter();
   move(lat1,long1,lat,long,center);
});
}
function move(lat,long,lat1,long1,center){
mainMap.setCenter(center);
sendJsonMove(lat,long,lat1,long1);

}
function sendJsonMove(lat,long,lat1,long1){


   var min_long = long;
   var min_lat= lat;
   var max_lat= lat1;
   var max_long= long1;
 var string = {"min_long":min_long,"max_long":max_long,"min_lat":min_lat,"max_lat":max_lat};

 var xhr = new XMLHttpRequest();
 var uri = encodeURIComponent(JSON.stringify(string));
 //console.log(uri);
var url = "/mysql_script.php?data=" + uri;
xhr.open("GET", url, true);
xhr.setRequestHeader("Content-type", "application/json");
xhr.send();
xhr.onreadystatechange = function () {

 clearOverlays();//limpa os markers da tela para poder atualizar

   if (xhr.readyState === 4 && xhr.status === 200) {

       var json = JSON.parse(xhr.responseText);
      //  alert(xhr.responseText);
       for(var i=0;i<=json.length-1;i++){

         addMarker(json[i].lat,json[i].long,json[i].name,'Description:<br />'+json[i].desc);
       }
       addMarker(myLat,myLong,"Your Position","","myPos");

   }
};



}
