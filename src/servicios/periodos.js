import React from "react";
import BASE_ROUTE from "./rutas";
import axios from "axios";

function obtenerPeriodos() {
  return fetch(`${BASE_ROUTE}/periodos`);
}

function crearPeriodo(body) {
  return axios.post(`${BASE_ROUTE}/periodos`, body);
}

function obtenerPeriodoPorId(id) {
  return axios.get(`${BASE_ROUTE}/periodos/${id}`);
}

function obtenerCursosPorIdPeriodo(id) {
  return fetch(`${BASE_ROUTE}/periodos/${id}/cursos`);
}
function eliminarCursoDePeriodo(id, idCurso) {
  return axios.delete(`${BASE_ROUTE}/periodos/${id}/cursos/${idCurso}`);
}

function eliminarPeriodo(id) {
  return axios.delete(`${BASE_ROUTE}/periodos/${id}`);
}

export {
  obtenerPeriodos,
  crearPeriodo,
  obtenerCursosPorIdPeriodo,
  eliminarCursoDePeriodo,
  eliminarPeriodo,
  obtenerPeriodoPorId,
};
