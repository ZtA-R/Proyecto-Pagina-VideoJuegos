import {consultar} from "./api.js";

const jocs = await consultar("SELECT * FROM videojocs");
console.log(jocs);