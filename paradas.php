<?php

///paradas.php?lng0=-46.63803859807166&lng1=-46.67503162480506&lat0=-23.549337399877942&lat1=-23.572074645590266


echo "lng0" . $_GET['lng0'];
echo "lng1" . $_GET['lng1'];
echo "lat0" . $_GET['lat0'];
echo "lat1" . $_GET['lat1'];


header('Access-Control-Allow-Origin: 0');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
$mysqli = new mysqli('localhost','root','9778881',"sptrans");

$lng0 = $_GET['lng0'];
$lng1 = $_GET['lng1'];
$lat0 = $_GET['lat0'];
$lat1 = $_GET['lat1'];

// // Check connection
// if ($mysqli->connect_error) {
//     die("Connection failed: " . $mysqli->connect_error);
// } 
// echo "Connected successfully";
$resp = $mysqli->query("select stop_lat,stop_long,stop_desc,stop_name from paradas where stop_long between " . $lng1 . " and " . $lng0 . " and stop_lat between " . $lat1 . " and ". $lat0);

//$resp = $mysqli->query("select stop_lat,stop_long,stop_desc,stop_name from paradas limit 1");

if($resp){

  $myArray = array();
  if ($resp) {
      while($row = $resp->fetch_object()) {
              $myArray[] = $row;
      }
      echo json_encode($myArray);
  }
  
  $resp->close();
  $mysqli->close();

}

?>