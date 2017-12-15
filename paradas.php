<?php

///paradas.php?lng0=-46.63803859807166&lng1=-46.67503162480506&lat0=-23.549337399877942&lat1=-23.572074645590266





header('Access-Control-Allow-Origin: 0');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
$mysqli = mysqli_connect('localhost','root','9778881',"sptrans");

$lng0 = $_GET['lng0'];
$lng1 = $_GET['lng1'];
$lat0 = $_GET['lat0'];
$lat1 = $_GET['lat1'];

echo "lng0" . $_GET['lng0']."\n";
echo "lng1" . $_GET['lng1']."\n";
echo "lat0" . $_GET['lat0']."\n";
echo "lat1" . $_GET['lat1']."\n";

// // Check connection
// if ($mysqli->connect_error) {
//     die("Connection failed: " . $mysqli->connect_error);
// }
// echo "Connected successfully";
$resp = mysqli_query($mysqli,"select stop_lat,stop_long,stop_desc,stop_name from paradas where stop_long between ".$lng0." and ".$lng1." and stop_lat between ".$lat1." and ".$lat0);

//$resp = $mysqli->query("select stop_lat,stop_long,stop_desc,stop_name from paradas limit 10");

  $myArray = array();
  if ($resp) {
    if(mysqli_num_rows($resp) > 0 ){
      while($row = mysqli_fetch_array($resp)) {
          $myArray[] = $row;
      }
        json_encode($myArray);
    }
    $resp->close();
  }

  $mysqli->close();



?>
