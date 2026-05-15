Projecte Tenda de videojocs:

Com aixecar el docker:
    -Dins la carpeta de Proyecto-Pagina-Videojuegos obrir una terminal.
    -Executar la següent comanda: docker compose up -d
    -Per aturar el docker: docker compose down

Com importar la base de dades:
    -Obrir el phpMyAdmin (localhost:8083).
    -Usuari: daw, Contrasenya: iesmanacor
    -Una vegada dins, seleccionar la base de dades practicadaw.
    -Anar a l'apartat importar (a les pestanyes d'adalt).
    -Seleccionar l'arxiu practicaVideojocs.sql de dins la carpeta del projecte.
    -Clicar importar (al final de la pàgina).

URLs del projecte:
    -Front (apache): http://localhost/
    -Servidor node: http://localhost:3000/
    -Enpoint per consultes SQL: http://localhost:3000/daw/<consulta SQL>
    -PhpMyAdmin: http://localhost:8083/

Credencials:
    -Usuari: daw, Contrasenya: iesmanacor

Autors i repartimet de tasques:
    -Gabi: Creador de JS a medias, HTML i CSS.
    -Pere Miquel: Creador de JS completo i base de datos.
    -James: