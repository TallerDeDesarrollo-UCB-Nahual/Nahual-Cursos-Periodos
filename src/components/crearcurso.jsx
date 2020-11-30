import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { obtenerSedes } from "../servicios/sedes";

export default function CrearCurso({ aceptar, estaAbierto, setAbierto }) {
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
        <div>
          <div class="form-group">
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
          </div>
          <div class="fullHeight forceFlex columnGap">
            <div className={"dosentradasformulario"}>
              <label>Inicio</label>
              <Form.Input
                label="Horario"
                fluid
                type="text"
                className={"form-control"}
                onChange={(x, data) => setHorario(data)}
              />
            </div>
          </div>
          <div class="forceFlex columnGap">
            <div className={"dosentradasformulario"}>
              <Form.Input
                label="Notas"
                fluid
                type="text"
                class="form-control"
                onChange={(x, data) => setNota(data.value)}
              />
            </div>
            <div className={"dosentradasformulario"}>
              <Form.Input
                label="Profesor"
                fluid
                type="text"
                class="form-control"
                onChange={(x, data) => setProfesor(data.value)}
              />
            </div>
          </div>
          <br />
          <Modal.Actions>
            <div className={"displayFlex spacedBetween"}>
              <Button
                color="green"
                onClick={() => {
                  aceptar({
                    horario: horario,
                    ...sedeNodo,
                    notas: nota,
                    profesores: profesor,
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
            </div>
          </Modal.Actions>
        </div>
      </Modal.Content>
    </Modal>
  );
}
