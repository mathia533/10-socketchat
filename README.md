# webserver + RestServer

recuerden que deben ejecutar ```npm install``` para reconstruir los modulos de node



# Acceso heroku a mongo atlas

1) Deben ingresar a "MongoDB Atlas (desde el navegador).
2) Una vez que se hayan logueado con sus datos deben ir a su proyecto cargado en MongoDB (la BD de la cafetería).
3) En las opciones que aparecen en el lado izquierdo deben ir a la opción de "Security" -> "Network Access".
4) Modifican el "IP Access List", la IP que aparezca lo más seguro es que sea la de ustedes (por lo que tendría acceso restringido). En esa IP, al lado derecho, deben hacer clic en el botón de "edit". Cuando se abra el recuadro aparecerá un botón arriba que indicará que dan acceso de conexión desde cualquier lugar ( cambiando el IP Address a: 0.0.0.0/0 de forma automática ).
5) Esperan a que Atlas procese la solicitud y se dirigen a Heroku.
6) Deben resetear la conexión de Heroku al lado del botón que dice "Open App". En el botón que dice "More" -> "Restart all dynos".
7) Una vez reiniciado el servicio, prueben en Postman sus métodos en fase "Producción" con su URL de Heroku.