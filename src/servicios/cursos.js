import BASE_ROUTE from "./rutas";
import axios from "axios";

function obtenerCursos() {
  return fetch(`${BASE_ROUTE}/cursos`);
}

function crearCurso(body) {
  console.log(body);
  return axios.post(`${BASE_ROUTE}/cursos`, body);
}

export { obtenerCursos, crearCurso };
