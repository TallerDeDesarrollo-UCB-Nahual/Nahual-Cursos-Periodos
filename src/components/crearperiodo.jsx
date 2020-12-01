import React, {useEffect, useState} from "react";
import styles from "./styles.module.css"
import {obtenerModulos} from "../servicios/modulos";
import { Container, Button, Form, ButtonGroup, Header } from 'semantic-ui-react'
import CrearCurso from "./crearcurso";
import ListaCursosACrear from "./listaCursosACrear";

export default function CrearPeriodo({
  cursos,
  setCursos,
  setPeriodo,
  setEstadoPeriodo,
  setModalCrearCursoAbierto,
  crearCursoEstaAbierto,
  mostrarListaCursosAGuardar,
  setMostrarListaCursosAGuardar,
  setTopico,
  setAnio,
  enviandSolicitud,
  modulos,
  setModulos,
}) {
  function inicializar() {
    obtenerModulos()
      .then((response) => response.json())
      .then((response) => {
        setModulos(response.response);
        setTopico(response.response[0].id);
      });
  }
  useEffect(() => {
    if (enviandSolicitud === false) {
      inicializar();
    }
  }, []);
  const formulariodeperiodos = (
    <div>
      <CrearCurso
        aceptar={(element) => {
          setCursos([...cursos, element]);
        }}
        estaAbierto={crearCursoEstaAbierto}
        setAbierto={setModalCrearCursoAbierto}
      />

      <ListaCursosACrear
        cursos={cursos}
        estaAbierto={mostrarListaCursosAGuardar}
        setAbierto={setMostrarListaCursosAGuardar}
      />

      <div>
        <Container>
          <Form.Input
            label="Periodo"
            fluid
            type="text"
            onChange={(e, data) => setPeriodo(data.value)}
          />
          <br />
          <Form.Select
            id="inputState"
            label="Topico"
            fluid
            options={modulos.map((m) => {
              return {
                key: `modulo-${m.id}`,
                value: m.id,
                text: m.nombre,
              };
            })}
            onChange={(e, data) => setTopico(data.value)}
          />
          <br />
          <Form.Select
            label="Estado"
            fluid
            options={[
              { key: "activo1", value: true, text: "Activo" },
              { key: "inactivo1", value: false, text: "Inactivo" },
            ]}
            className={"form-control"}
            onChange={(e, data) => setEstadoPeriodo(data.value)}
          />
          <br />
          <Form.Input
            label="Año"
            type="number"
            fluid
            className={"form-control"}
            onChange={(x, data) => setAnio(parseInt(data.value))}
          />
          <br />
        </Container>
      </div>
    </div>
  );
  return (
    <div>
      {enviandSolicitud ? (
        <div className={styles.loading}>
          <div className={styles.elementsloading}>
            <div className={styles.loadingdots}>
              <div className={"spinner-grow text-secondary"} role="status">
                <span className={"sr-only"}>Loading...</span>
              </div>
              <div className={"spinner-grow text-success"} role="status">
                <span className={"sr-only"}>Loading...</span>
              </div>
            </div>
            <div>
              <h5>Creando Periodo</h5>
            </div>
          </div>
        </div>
      ) : (
          formulariodeperiodos
        )}
    </div>
  );
}
