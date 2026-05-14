import {consultar} from "./api.js";

const query = "SELECT CONCAT(c.nom, ' ', c.cognom) AS nom_creador, COUNT(vc.id_videojoc) AS total_videojocs FROM creador c INNER JOIN videojoc_creador vc ON vc.id_creador = c.id GROUP BY c.id, c.nom, c.cognom;"

const selectGenere = document.querySelector("#ordenacio_genere");
let genere = "tots";
let tipusOrdenacio;
selectGenere.addEventListener("change", async function(event){
        genere = event.target.value;
        tipusOrdenacio = traduirOrdre(event.target.value);
        iniciar(tipusOrdenacio);
});

const select = document.querySelector("#ordenacio");
select.addEventListener("change", async function (event) {
        tipusOrdenacio = event.target.value;
        let res;

        switch (tipusOrdenacio) {
                case "num_jocs_desc":
                        res = await obtenirJocsDB("total_videojocs DESC", genere);
                        break;
                case "num_jocs_asc":
                        res = await obtenirJocsDB("total_videojocs ASC", genere);
                        break;
                case "alfabetic_asc":
                        res = await obtenirJocsDB("nom_creador ASC", genere);
                        break;
                case "alfabetic_desc":
                        res = await obtenirJocsDB("nom_creador DESC", genere);
                        break;
                default:
                        res = await obtenirJocsDB("nom_creador ASC", genere);
        }

        const divPrincipal = document.querySelector("#llista_creadors");
        divPrincipal.innerHTML = "";

        res.forEach(function (r) {
                crearContenidor(r.nom_creador, r.total_videojocs, r.id);
        });
});

async function iniciar(tipusOrdenacio = "nom_creador ASC") {
        let resposta = await obtenirJocsDB(tipusOrdenacio, genere);
        const divPrincipal = document.querySelector("#llista_creadors");
        divPrincipal.innerHTML = "";

        resposta.forEach(function (r) {
                crearContenidor(r.nom_creador, r.total_videojocs, r.id);
        });
}

function obtenirJocsDB(ordenacio, filtreGenere = null) {
        let having = "";
        let innerJoinsGenere = ""
        if (filtreGenere && filtreGenere !== "tots") {
                having = `HAVING SUM(CASE WHEN g.id = ${filtreGenere} THEN 1 ELSE 0 END) = max_counts.max_jocs AND SUM(CASE WHEN g.id = ${filtreGenere} THEN 1 ELSE 0 END) > 0`;

                innerJoinsGenere = `INNER JOIN videojoc_genere vg ON vc.id_videojoc = vg.id_videojoc INNER JOIN genere g ON vg.id_genere = g.id INNER JOIN (SELECT id_creador, MAX(recompte) AS max_jocs FROM (SELECT vc2.id_creador, vg2.id_genere, COUNT(*) AS recompte FROM videojoc_creador vc2 INNER JOIN videojoc_genere vg2 ON vc2.id_videojoc = vg2.id_videojoc GROUP BY vc2.id_creador, vg2.id_genere) AS counts GROUP BY id_creador) AS max_counts ON c.id = max_counts.id_creador`;
        }

        const query = `SELECT c.id, CONCAT(c.nom, ' ', c.cognom) AS nom_creador, COUNT(DISTINCT vc.id_videojoc) AS total_videojocs FROM creador c INNER JOIN videojoc_creador vc ON vc.id_creador = c.id ${innerJoinsGenere} GROUP BY c.id, c.nom, c.cognom ${filtreGenere && filtreGenere !== "tots" ? ", max_counts.max_jocs" : ""} ${having} ORDER BY ${ordenacio};`;

        return consultar(query);
}

function crearContenidor(nom, nombre_jocs, idCreador) {
        const v_div = document.createElement("div");
        v_div.classList.add("targeta_juego");

        const v_a = document.createElement("a");
        v_a.href = `Producto.html?id=${idCreador}`;

        const v_img = document.createElement("img");
        v_img.src = "assets/gato-gato-sacando-la-lengua.png"
        v_img.classList.add("targeta_img");

        const v_nom = document.createElement("p");
        v_nom.textContent = nom;
        v_nom.classList.add("targeta_info");

        const v_jocs = document.createElement("p");
        v_jocs.textContent = nombre_jocs;
        v_jocs.classList.add("targeta_preu");

        document.querySelector("#llista_creadors").appendChild(v_div);
        v_div.appendChild(v_a);
        v_a.appendChild(v_img);
        v_div.appendChild(v_nom);
        v_div.appendChild(v_jocs);
}

function traduirOrdre(valor) {
const ordres = {
        "num_jocs_desc": "total_videojocs DESC",
        "num_jocs_asc": "total_videojocs ASC",
        "alfabetic_asc": "nom_creador ASC",
        "alfabetic_desc": "nom_creador DESC"
};
return ordres[valor] || "nom_creador ASC";
}

iniciar();