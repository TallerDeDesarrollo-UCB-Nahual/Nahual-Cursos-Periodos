import React from "react";
import BASE_ROUTE from "./rutas";
import axios from "axios";

function obtenerCursos() {
  return fetch(`${BASE_ROUTE}/cursos`);
}
function crearCurso(body) {
  console.log(body);
  return axios.post(`${BASE_ROUTE}/cursos`, body);
}
function obtenerCurso(id) {
  return fetch(`${BASE_ROUTE}/cursos/${id}`);
}
function editarCurso(id) {
  return axios.put(`${BASE_ROUTE}/cursos/${id}`);
}

export { obtenerCursos, crearCurso, obtenerCurso,editarCurso };
