import {consultar} from "./api.js";

const params = new URLSearchParams(window.location.search);
const idCreador = params.get("creador");

const select = document.querySelector("#ordenacio");
select.addEventListener("change", async function(event){
    const tipusOrdenacio = event.target.value;
    let res;

    switch(tipusOrdenacio) {
        case "puntuacio_desc":
                res = await obtenirJocsDB("AVG(val.puntuacio) DESC", idCreador);
                break;
        case "puntuacio_asc":
                res = await obtenirJocsDB("AVG(val.puntuacio) ASC", idCreador);
                break;
        case "alfabetic_asc":
                res = await obtenirJocsDB("v.titol ASC", idCreador);
                break;
        case "alfabetic_desc":
                res = await obtenirJocsDB("v.titol DESC", idCreador);
                break;
        case "preu_asc":
                res = await obtenirJocsDB("v.preu ASC", idCreador);
                break;
        case "preu_desc":
                res = await obtenirJocsDB("v.preu DESC", idCreador);
                break;
        default:
            res = await obtenirJocsDB("AVG(val.puntuacio) DESC", idCreador);    
        }

        const divPrincipal = document.querySelector("#llista_videojocs");
        divPrincipal.innerHTML = "";

        res.forEach(function(r){
            crearContenidor(r.titol, r.preu, r.puntuacio_mitjana, r.creadors);
        });
});

function obtenirJocsDB (ordenacio, filtreCreador = null) {

    let where = "";
    if (filtreCreador) {
        where = `WHERE c.id = ${filtreCreador}`;
    }

    const query = `SELECT v.titol, v.preu, AVG(val.puntuacio) AS puntuacio_mitjana, GROUP_CONCAT(DISTINCT c.nom, ' ', c.cognom SEPARATOR ', ') AS creadors FROM videojoc v LEFT JOIN valoracio val ON val.id_videojoc = v.id LEFT JOIN videojoc_creador vc ON vc.id_videojoc = v.id LEFT JOIN creador c ON c.id = vc.id_creador ${where} GROUP BY v.id, v.titol, v.preu ORDER BY ${ordenacio};`

    return consultar(query);
}


function crearContenidor (titol, preu, puntuacio_mitjana, creador) {
    const v_div = document.createElement("div").classList.add("targeta_juego");

    const v_img = document.createElement("img");
    v_img.src = "assets/gato-gato-sacando-la-lengua.png"
    
    const v_titol = document.createElement("p");
    v_titol.textContent = titol;
    
    const v_preu = document.createElement("p");
    v_preu.textContent = preu;
    
    const v_puntuacio = document.createElement("p");
    v_puntuacio.textContent = puntuacio_mitjana;
    
    const v_creador = document.createElement("p");
    v_creador.textContent = creador;

    document.querySelector("#llista_videojocs").appendChild(v_div);
    v_div.appendChild(v_img);
    v_div.appendChild(v_titol);
    v_div.appendChild(v_preu);
    v_div.appendChild(v_puntuacio);
    v_div.appendChild(v_creador);
}