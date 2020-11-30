import React, { useEffect, useState } from "react";
import { Button, Table, Select, Icon } from "semantic-ui-react";
import { obtenerPeriodos } from "../../servicios/periodos";
import { useHistory } from "react-router-dom";
import ListarCursosGuardados from "../Cursos/listarCursosGuadados";
import styles from "../styles.module.css";
import Eliminar from "../Periodos/eliminarPeriodo";
import NuevoPeriodo from "../Periodos/nuevoperiodo";

export default function Periodos() {
  const [periodos, setPeriodos] = useState([]);
  const [
    estaAbiertoModalNuevoPerido,
    setEstaAbiertoModalNuevoPerioto,
  ] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState(true);
  const [informacionListaCursos, setInformacionListaCursos] = useState(false);
  const [idPeriodo, setIdPeriodo] = useState(0);
  const history = useHistory();

  useEffect(() => {
    obtenerPeriodos()
      .then((response) => response.json())
      .then((response) => setPeriodos(response.response));
  }, []);

  function handleEditButtonClick(id) {
    history.push("/periodos/" + id)
  }

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
        <Button color='green' onClick={() => setEstaAbiertoModalNuevoPerioto(true)}>
          Periodo
              <Icon color='white' name='add circle' style={{ margin: '0 0 0 10px' }} />
        </Button>
      </div>
      <ListarCursosGuardados
        estaAbierto={informacionListaCursos}
        setAbierto={setInformacionListaCursos}
        idPeriodo={idPeriodo}
      />
      <NuevoPeriodo
        abierto={estaAbiertoModalNuevoPerido}
        estaAbierto={setEstaAbiertoModalNuevoPerioto}
        periodos={periodos}
        setPeriodos={setPeriodos}
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
            if (p.estado === filtroEstado) {
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
                            setInformacionListaCursos(true);
                              setIdPeriodo(p.id);
                        }}
                      >
                        Ver cursos
                      </Button>
                      <Button
                        color="yellow"
                        onClick={(x) => {
                          handleEditButtonClick(p.id);
                        }}
                      >
                        Editar <Icon color='white' name='edit' style={{ margin: '0 0 0 10px' }} />
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
