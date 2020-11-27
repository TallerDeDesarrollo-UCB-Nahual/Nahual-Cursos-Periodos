import React from "react";
import BASE_ROUTE from "./rutas";

function obtenerNodos() {
  return fetch(`${BASE_ROUTE}/nodos`);
}

function obtenerSedesPorIdNodo(id) {
  return fetch(`${BASE_ROUTE}/nodos/${id}/sedes`);
}

export { obtenerNodos, obtenerSedesPorIdNodo };