<?php
header('Access-Control-Allow-Origin: 0');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
  $mysqli = new mysqli('localhost','root','9778881',"sptrans");
  $json = json_decode($_GET['data']);
  $lat0 = $json->{'lat0'};
  $lat1 = $json->{'lat1'};
  $lng0 = $json->{'lng0'};
  $lng1 = $json->{'lng1'};

  $resp = $mysqli->query("select stop_lat,stop_long,stop_desc,stop_name from paradas where stop_long between $lng1 and $lng0 or stop_lat between $lat1 and $lat0");
  ?>
