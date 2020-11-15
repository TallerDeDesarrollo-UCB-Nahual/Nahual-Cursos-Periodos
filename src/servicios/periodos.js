import React from "react";
import BASE_ROUTE from "./rutas";

function obtenerPeriodos() {
  return fetch(`${BASE_ROUTE}/periodos`);
}

export { obtenerPeriodos };
