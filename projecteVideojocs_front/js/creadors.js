import {consultar} from "./api.js";

const query = "SELECT CONCAT(c.nom, ' ', c.cognom) AS nom_creador, COUNT(vc.id_videojoc) AS total_videojocs FROM creador c INNER JOIN videojoc_creador vc ON vc.id_creador = c.id GROUP BY c.id, c.nom, c.cognom;"


const select = document.querySelector("#ordenacio");
select.addEventListener("change", async function (event) {
        const tipusOrdenacio = event.target.value;
        let res;

        switch (tipusOrdenacio) {
                case "num_jocs_desc":
                        res = await obtenirJocsDB("total_videojocs DESC");
                        break;
                case "num_jocs_asc":
                        res = await obtenirJocsDB("total_videojocs ASC");
                        break;
                case "alfabetic_asc":
                        res = await obtenirJocsDB("nom_creador ASC");
                        break;
                case "alfabetic_desc":
                        res = await obtenirJocsDB("nom_creador DESC");
                        break;
                default:
                        res = await obtenirJocsDB("nom_creador ASC");
        }

        const divPrincipal = document.querySelector("#llista_creadors");
        divPrincipal.innerHTML = "";

        res.forEach(function (r) {
                crearContenidor(r.nom_creador, r.total_videojocs, r.id);
        });
});


function obtenirJocsDB(ordenacio) {
        const query = `SELECT c.id, CONCAT(c.nom, ' ', c.cognom) AS nom_creador, COUNT(vc.id_videojoc) AS total_videojocs FROM creador c INNER JOIN videojoc_creador vc ON vc.id_creador = c.id GROUP BY c.id, c.nom, c.cognom ORDER BY ${ordenacio};`;
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