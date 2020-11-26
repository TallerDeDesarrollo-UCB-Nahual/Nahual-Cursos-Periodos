import React from "react";
import BASE_ROUTE from "./rutas";

function obtenerNodos() {
  return fetch(`${BASE_ROUTE}/sedes`);
}

export { obtenerSedes };
