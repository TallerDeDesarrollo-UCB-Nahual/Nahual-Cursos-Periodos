import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { obtenerModulos } from "../../servicios/modulos";
import { obtenerPeriodoPorId, obtenerCursosPorIdPeriodo, editarPeriodo } from "../../servicios/periodos";
import { Container, Button, Form, ButtonGroup } from "semantic-ui-react";
import styles from "../styles.module.css";

export default function EditarPeriodo() {

  const [periodo, setPeriodo] = useState({ topico: {} });
  const [modulos, setModulos] = useState([]);
  const [estadoPeriodo, setEstadoPeriodo] = useState(false);
  const [anio, setAnio] = useState();
  const [topico, setTopico] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    obtenerPeriodo(id)
      .then((response) => {
        return response.data;
      })
      .then(response => {
        setPeriodo(response.response.periodo);
        setEstadoPeriodo(response.response.estado);
        setTopico(response.response.topico.id);
        setAnio(response.response.anio);
      });

    obtenerModulos()
      .then((response) => response.json())
      .then((response) => {
        setModulos(response.response);
        setTopico(response.response[0].id);
      });
  }, []);

  function obtenerPeriodo(id) {
    return obtenerPeriodoPorId(id);
  }

  return (
    <div>
      <div>
        <div className={"editarPeriodo"}>
          <h1>Editar Periodo</h1>
        </div>
        <Container>
          <Form.Input
            label="Periodo"
            fluid
            value={periodo}
            type="text"
            onChange={(e, data) => setPeriodo(data.value)}
          />
          <br />
          <Form.Select
            id="inputState"
            label="Topico"
            fluid
            value={topico}
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
            value={estadoPeriodo}
            onChange={(e, data) => setEstadoPeriodo(data.value)}
          />
          <br />
          <Form.Input
            label="Año"
            type="number"
            fluid
            className={"form-control"}
            value={anio}
            onChange={(x, data) => setAnio(parseInt(data.value))}
          />
          <br />
          <div className={"actionsCrearPeriodo"}>
            <ButtonGroup>
              <Button color="green" onClick={() => {
                editarPeriodo(id, {
                  anio: anio,
                  periodo: periodo,
                  estado: estadoPeriodo,
                  TopicoId: parseInt(topico)
                });
                history.push("/periodos");
                window.location.reload();
              }}>Guardar</Button>
              <Button color="red" onClick={() => {
                history.push("/periodos");
              }}>Cancelar</Button>
            </ButtonGroup>
          </div>
        </Container>
      </div>
    </div>
  );
}
