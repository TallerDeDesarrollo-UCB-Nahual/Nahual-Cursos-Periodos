import BASE_ROUTE from "./rutas";
import axios from "axios";

function obtenerCursos() {
  return fetch(`${BASE_ROUTE}/cursos`);
}

function crearCurso(body) {
  return axios.post(`${BASE_ROUTE}/cursos`, body);
}

function obtenerCursoPorId(id) {
  return axios.get(`${BASE_ROUTE}/cursos/${id}`);
}

export { obtenerCursos, crearCurso, obtenerCursoPorId };
