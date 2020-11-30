import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Container, TextArea } from "semantic-ui-react";
import { obtenerSedes } from "../servicios/sedes";
// import styles from "./styles.module.css";
import { crearCurso } from "../servicios/cursos";

export default function CrearCurso({estaAbierto, setAbierto, idPeriodo }) {
  const [sedes, setSedes] = useState([]);
  const [horario, setHorario] = useState("");
  const [sedeNodo, setSedeNodo] = useState(null);
  const [nota, setNota] = useState("");
  const [profesor, setProfesor] = useState("");
  function inicializarSedes() {
    obtenerSedes()
      .then((response) => response.json())
      .then((response) => {
        setSedes(response.response);
        setSedeNodo({
          SedeId: response.response[0].id,
          NodoId: response.response[0].NodoId,
        });
      });
  }

  function resetValores() {
    setHorario("");
    inicializarSedes();
    setNota("");
    setProfesor("");
    setAbierto(!estaAbierto);
  }
  useEffect(() => {
    inicializarSedes();
  }, []);
  return (
    <Modal open={estaAbierto} onClose={() => setAbierto(!estaAbierto)}>
      <Modal.Header>Nuevo curso</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Select
            fluid
            label="Sede - Nodo"
            options={sedes.map((s) => {
              return {
                key: `sede-${s.id}`,
                value: [s.nodo.id, s.id],
                text: s.nombre + " - " + s.nodo.nombre,
              };
            })}
            onChange={(e, data) => {
              const selected = data.value;
              setSedeNodo({
                SedeId: selected[1],
                NodoId: selected[0],
              });
            }}
          />
            <Form.Input
              label="Horario"
              fluid
              type="text"
              className={"form-control"}
              onChange={(x, data) => setHorario(data.value)}
            />
            <Form.Input
              label="Profesor"
              fluid
              type="text"
              class="form-control"
              onChange={(x, data) => setProfesor(data.value)}
            />
            <Form.Input
              label="Notas"
              fluid
              type="text"
              class="form-control"
              control={TextArea}
              onChange={(x, data) => setNota(data.value)}
            />
        </Form>
      </Modal.Content>
      <Modal.Actions>
          <Button
            color="green"
            onClick={() => {
              crearCurso({                
                ...sedeNodo,
                horario: horario,
                profesores: profesor,
                notas: nota,
                PeriodoId: idPeriodo
              });
              resetValores();
            }}
          >
            Crear curso
          </Button>
          <Button
            theme="danger"
            onClick={() => {
              resetValores();
              setAbierto(!estaAbierto);
            }}
          >
            Cancelar
          </Button>
      </Modal.Actions>
    </Modal>
  );
}
