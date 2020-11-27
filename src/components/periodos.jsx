import React, { useEffect, useState } from "react";
import { Button, Table, Select, Modal } from "semantic-ui-react";
import {
  obtenerPeriodos,
  obtenerCursosPorIdPeriodo,
} from "../servicios/periodos";
import ListarCursosGuardados from "./listarCursosGuadados";
import styles from "./styles.module.css";
import Eliminar from "./eliminarPeriodo";
import NuevoPeriodo from "./nuevoperiodo";

export default function Periodos() {
  const [periodos, setPeriodos] = useState([]);
  const [
    estaAbiertoModalNuevoPerido,
    setEstaAbiertoModalNuevoPerioto,
  ] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState(true);
  const [cursosAMostrar, setCursosAMostrar] = useState([]);
  const [informacionListaCursos, setInformacionListaCursos] = useState(false);
  const [idPeriodo, setIdPeriodo] = useState(0);

  useEffect(() => {
    obtenerPeriodos()
      .then((response) => response.json())
      .then((response) => setPeriodos(response.response));
  }, []);

  return (
    <div className={styles.vistaPeriodos}>
      <div className={"opcionesPeriodo"}>
        <div className={"selectBar"}>
          <Select
            placeholder={"Ingrese el estado"}
            className={"custom-select"}
            options={[
              { key: "activo", value: true, text: "Activo" },
              { key: "inactivo", value: false, text: "Inactivo" },
            ]}
            onChange={(x, data) => {
              setFiltroEstado(data.value === true);
            }}
          />
        </div>
        <h1>Periodos</h1>
        <NuevoPeriodo
          abierto={estaAbiertoModalNuevoPerido}
          estaAbierto={setEstaAbiertoModalNuevoPerioto}
          estaEditando={false}
          periodos={periodos}
          setPeriodos={setPeriodos}
        />
      </div>
      <ListarCursosGuardados
        cursos={cursosAMostrar}
        estaAbierto={informacionListaCursos}
        setAbierto={setInformacionListaCursos}
        idPeriodo={idPeriodo}
      />
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Periodo</Table.HeaderCell>
            <Table.HeaderCell>Año</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Topico</Table.HeaderCell>
            <Table.HeaderCell className={"displayFlex  centered"}>
              Acciones
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {periodos.map((p) => {
            if (p.estado == filtroEstado) {
              return (
                <Table.Row key={`periodo-${p.id}`}>
                  <Table.Cell>{p.periodo}</Table.Cell>
                  <Table.Cell>{p.anio}</Table.Cell>
                  <Table.Cell>{p.estado ? "Activo" : "Inactivo"}</Table.Cell>
                  <Table.Cell>{p.topico.nombre}</Table.Cell>
                  <Table.Cell>
                    <div className={"displayFlex centered columnGap"}>
                      <Button
                        color="green"
                        onClick={(x) => {
                          obtenerCursosPorIdPeriodo(p.id)
                            .then((cursoperiodo) => {
                              return cursoperiodo.json();
                            })
                            .then((cursoperiodo) => {
                              setCursosAMostrar(cursoperiodo.response);
                              setInformacionListaCursos(true);
                              setIdPeriodo(p.id);
                            });
                        }}
                      >
                        Ver cursos
                      </Button>
                      <Eliminar egresadeId={p.id}></Eliminar>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            }
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
