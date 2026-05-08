import {consultar} from "./api.js";


const jocs = "SELECT * FROM videojoc";
let a=consultar(jocs);

console.log(a);