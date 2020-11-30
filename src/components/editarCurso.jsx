import React, {useEffect, useState} from "react";
import { Button, Modal, Form } from 'semantic-ui-react'
import {obtenerSedes} from "../servicios/sedes"
import JTimepicker from 'reactjs-timepicker'
import { editarCurso } from "../servicios/cursos";

export default function EditarCurso({curso, estaAbierto,setAbierto, idCurso}) {

    const [sedes, setSedes] = useState([]);
    const [horario, setHorario] = useState("00:00");
    const [sedeNodo, setSedeNodo] = useState(null)
    const [nota, setNota] = useState("");
    const [profesor, setProfesor] = useState("")

    function inicializarSedes () {
        obtenerSedes().then(response => response.json()).then(response => {
            setSedes(response.response)
            setSedeNodo({"SedeId": response.response[0].id, "NodoId": response.response[0].NodoId})
        })
    }

    function editar() {
        editarCurso(idCurso).then(curso => {
            return curso.json()
        }).then(curso => {
            console.log("CURSO",curso)
        })

        setAbierto(!estaAbierto);
    }
    useEffect(()=>{
        inicializarSedes();
    }, [])
    return (
        <Modal open={estaAbierto} onClose={() => setAbierto(!estaAbierto)}>
          <Modal.Header>Editar Curso</Modal.Header>
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
/*                       aceptar({
                        horario: horario,
                        ...sedeNodo,
                        notas: nota,
                        profesores: profesor,
                      }); */
                      editar();
                    }}
                  >
                    Editar Curso
                  </Button>
                  <Button
                    theme="danger"
                    onClick={() => {
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