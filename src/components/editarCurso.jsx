import React, {useEffect, useState} from "react";
import { Button, Modal, Form } from 'semantic-ui-react'
import {obtenerSedes} from "../servicios/sedes"
import JTimepicker from 'reactjs-timepicker'
import { editarCurso } from "../servicios/cursos";

export default function EditarCurso({curso, estaAbierto,setAbierto, idCurso}) {

    const [sedes, setSedes] = useState([]);
    const [horario, setHorario] = useState("");
    const [sedeNodo, setSedeNodo] = useState([])
    const [notas, setNota] = useState("");
    const [profesores, setProfesor] = useState("")

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

  function inicializarCurso(){
        setHorario(curso.horario);
        setSedeNodo([curso.SedeId,curso.NodoId]);
        setNota(curso.notas);
        setProfesor(curso.profesores);
  }

    function editar(horario,nota,profesor) {
        editarCurso(idCurso,{"horario":horario,
            "SedeId": sedeNodo.SedeId,
            "NodoId": sedeNodo.NodoId,
            "notas":nota,
            "profesores":profesor}).then(curso => {
                console.log("se edito")
            //return curso.json()
        })
        setAbierto(!estaAbierto);
    }

    useEffect(()=>{
        inicializarSedes();
        inicializarCurso();
        console.log("--------------------------",curso)
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
                  value = {[curso.SedeId,curso.NodoId]}
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
                    value={horario}
                    className={"form-control"}
                    onChange={(x, data) => setHorario(data.value)}
                  />
                </div>
              </div>
              <div class="forceFlex columnGap">
                <div className={"dosentradasformulario"}>
                  <Form.Input
                    label="Notas"
                    fluid
                    type="text"
                    value={notas}
                    className={"form-control"}
                    onChange={(x, data) => setNota(data.value)}
                  />
                </div>
                <div className={"dosentradasformulario"}>
                  <Form.Input
                    label="Profesor"
                    fluid
                    type="text"
                    value={profesores}
                    className={"form-control"}
                    onChange={(x, data) => setProfesor(data.value)}
                  />
                </div>
              </div>
              <br />
            </div>
          </Modal.Content>
          <Modal.Actions>
                <div className={"displayFlex spacedBetween"}>
                  <Button
                    color="green"
                    onClick={() => {
                      editar(horario,
                            notas,
                            profesores);
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
        </Modal>
      );
}