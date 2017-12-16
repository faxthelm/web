<?php

///onibus.php?lng0=-46.63803859807166&lng1=-46.67503162480506&lat0=-23.549337399877942&lat1=-23.572074645590266

/*
echo "lng0" . $_GET['lng0'];
echo "lng1" . $_GET['lng1'];
echo "lat0" . $_GET['lat0'];
echo "lat1" . $_GET['lat1'];
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
$mysqli = new mysqli('localhost','root','9778881',"sptrans");

if (!$mysqli->set_charset("utf8")) {
  printf("Error loading character set utf8: %s\n", $mysqli->error);
  exit();
}

$lng0 = (float) $_GET['lng0'];
$lng1 = (float) $_GET['lng1'];
$lat0 = (float) $_GET['lat0'];
$lat1 = (float) $_GET['lat1'];

if ($lng0 > $lng1){
  $temp = $lng0;
  $lng0 = $lng1;
  $lng1 = $temp;
}

if ($lat0 > $lat1){
  $temp = $lat0;
  $lat0 = $lat1;
  $lat1 = $temp;
}


include('./httpful.phar');
$token = "4622e395db9d7d638990ddcd7297a27610cbe5f8c071953e0ec6d9506e54fee8"; // olho vivo
$urbase = "http://api.olhovivo.sptrans.com.br/v2.1./";
$uri = $urbase . "Login/Autenticar?token=" . $token;
$response = \Httpful\Request::post($uri)->send();



if(!$response) {
    echo "Token Inválido";
  }else{
    
    $uri = $urbase . "Posicao";
    $response2 = \Httpful\Request::get($uri)->send();

    if ($response2){
        echo "Oi";
        echo $response2;
    }else{
        
        echo "error Posicao";
    }
  }


?>