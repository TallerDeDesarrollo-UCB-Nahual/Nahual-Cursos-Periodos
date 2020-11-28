import BASE_ROUTE from "./rutas";
import axios from "axios";

function obtenerNodos() {
  return fetch(`${BASE_ROUTE}/nodos`);
}

function obtenerSedesPorIdNodo(id) {
  return fetch(`${BASE_ROUTE}/nodos/${id}/sedes`);
}

function eliminarSede(id) {
  return axios.delete(`${BASE_ROUTE}/nodos/sedes/${id}`);
}

function obtenerSede(id){
  return fetch(`${BASE_ROUTE}/nodos/`)
}

export { obtenerNodos, obtenerSedesPorIdNodo,eliminarSede };