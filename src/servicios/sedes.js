import React from "react";
import BASE_ROUTE from "./rutas";

function obtenerSedes() {
  return fetch(`${BASE_ROUTE}/sedes`);
}

function eliminarSede(id) {
  return fetch(`${BASE_ROUTE}/sedes/${id}`);
}

export { obtenerSedes, eliminarSede };
