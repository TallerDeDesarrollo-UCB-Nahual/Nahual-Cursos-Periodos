import BASE_ROUTE from "./rutas";

function obtenerModulos() {
  return fetch(`${BASE_ROUTE}/modulos`);
}

export { obtenerModulos };
