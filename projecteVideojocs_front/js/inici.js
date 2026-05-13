import {consultar} from "./api.js";

async function domTresMillorsValorats () {
    let res = await obtenirTresMillorsValorats();

    res.forEach(function(r){
        const div = document.createElement("div");
        const img = document.createElement("img");
        const titol = document.createElement("p");
        const valoracio = document.createElement("p");

        img.src = "assets/LogoPagina.png";
        titol.textContent = r.titol;
        valoracio.textContent = r.mitjana_puntuacio;

        document.querySelector("#mes_valorats").appendChild(div);
        div.appendChild(img);
        div.appendChild(titol);
        div.appendChild(valoracio);
    });
    console.log(res);
}


domTresMillorsValorats();

function obtenirTresMillorsValorats () {
    const query = "SELECT vj.titol, AVG(v.puntuacio) AS mitjana_puntuacio FROM videojoc vj INNER JOIN valoracio v ON v.id_videojoc = vj.id GROUP BY vj.id, vj.titol, v.puntuacio ORDER BY mitjana_puntuacio DESC LIMIT 3;";

    return consultar(query);
}