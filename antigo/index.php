<!DOCTYPE html>

<html>
  <meta charset="utf-8"/>
  <head>
    <title>Esperando Busão</title>
    <link rel="stylesheet" href="style.css">  <!--Importar o CSS-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>

  <body>


    <div class="address">
      <h2>Endereço:</h2>
        <form action="action_page.php" method="post">   <!--  para fazer ação depois, nao necessariamente post -->
          <input type="text" name="address" style="width:36vw;" /><br /><br />
          <input type="checkbox" name="option" value="movimento" /> Ônibus em Movimento <br />
          <input type="checkbox" name="option" value="paradas" /> Paradas de Ônibus
        <!-- <input type="button" value="BUSCAR" /> -->
      </form>
        <div id="map">
            <script>
              var map;
              function initMap() {
                map = new google.maps.Map(document.getElementById('map'), {
                  center: {lat: -23.481996, lng: -46.500503},
                  zoom: 17
                });
              }
            </script>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIIYfoCwVPJDG1PN_vxtwzQmzxpq05nfw&callback=initMap"
            async defer></script>
          </div>
    </div>

    <div class = "all">
      <div class = "logo">
        <div class ="title" >
            <h1>ESPERANDO BUSÃO</h1>
        </div>

        <div class = "icon">
            <i class="fa fa-bus"></i>
        </div>
      </div>

      <div class="team">
        <ul>
          <li>Ana Paula Bruno Carbone (9761805) </li>
          <li>Fernando d'Avila Axthelm (9778881) </li>
          <li>Rodrigo Guerra (8516497) </li>
        </ul>
      </div>

    </div>
  </body>
</html>