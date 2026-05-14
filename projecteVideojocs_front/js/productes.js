import {consultar} from "./api.js";

let res = await obtenirTotsJocs();
console.log(res)

function obtenirTotsJocs () {
    const query = "SELECT v.titol, v.preu, AVG(val.puntuacio) AS puntuacio_mitjana, GROUP_CONCAT(DISTINCT c.nom, ' ', c.cognom SEPARATOR ', ') AS creadors FROM videojoc v LEFT JOIN valoracio val ON val.id_videojoc = v.id LEFT JOIN videojoc_creador vc ON vc.id_videojoc = v.id LEFT JOIN creador c ON c.id = vc.id_creador GROUP BY v.id, v.titol, v.preu;"

    return consultar(query);
}