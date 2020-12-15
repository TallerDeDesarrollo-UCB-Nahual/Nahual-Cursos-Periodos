import React, {useEffect, useState} from "react";
import { Button, Modal, Form, TextArea, Icon,Grid, Image } from "semantic-ui-react";
import {obtenerSedes} from "../../servicios/sedes"
import JTimepicker from 'reactjs-timepicker'
import { editarCurso } from "../../servicios/cursos";
import { obtenerCurso } from "../../servicios/cursos";
import LogoNahual from '../../assets/logo-proyecto-nahual.webp'
import { useHistory } from 'react-router'

export default function EditarCurso({curso, estaAbierto,setAbierto, idCurso}) {

    const [sedes, setSedes] = useState([]);
    const [horario, setHorario] = useState("");
    const [sedeNodo, setSedeNodo] = useState([])
    const [sede, setSede] = useState("")
    const [nodo, setNodo] = useState("")
    const [notas, setNota] = useState("");
    const [profesores, setProfesor] = useState("")
    const [habilitado, setHabilitado] = useState(false)
    const history = useHistory()

  
    useEffect(()=>{
      obtenerCurso(idCurso)
      .then(curso => { return curso.json()})
      .then(curso => {
        if(curso.respuesta != null){
          setHorario(curso.respuesta.horario);
          setSedeNodo([curso.respuesta.SedeId,curso.respuesta.NodoId]);
          setSede(curso.respuesta.SedeId);
          setNodo(curso.respuesta.NodoId);
          setNota(curso.respuesta.notas);
          setProfesor(curso.respuesta.profesores);
        }
    }) 
        inicializarSedes();
    }, [idCurso])

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

    function editar(horario,nota,profesor) {
        editarCurso(idCurso,{"horario":horario,
            "SedeId": sedeNodo.SedeId,
            "NodoId": sedeNodo.NodoId,
            "notas":nota,
            "profesores":profesor}).then(curso => {
        })
        history.go("/periodos");
        setAbierto(!estaAbierto);
    }


    return (
      <Modal closeIcon open={estaAbierto} onClose={() => setAbierto(!estaAbierto)}>
        <Modal.Header>
          <Grid columns='equal'>
            <Grid.Column>
              <Image src={LogoNahual} size='small' />
            </Grid.Column>
            <Grid.Column>
              Nuevo Curso
            </Grid.Column>
          </Grid>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Select
              fluid
              label="Sede - Nodo"
              value = {[sede,nodo]}
              options={sedes.map((s) => {
                return {
                  key: `sede-${s.id}`,
                  value: [s.nodo.id, s.id],
                  //value = {[sede,nodo]},
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
                value={horario}
                className={"form-control"}
                onChange={(x, data) => setHorario(data.value)}
              />
              <Form.Input
                label="Profesor"
                fluid
                type="text"
                value={profesores}
                class="form-control"
                onChange={(x, data) => setProfesor(data.value)}
              />
              <Form.Input
                label="Notas"
                fluid
                type="text"
                value={notas}
                class="form-control"
                control={TextArea}
                onChange={(x, data) => setNota(data.value)}
              />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            className="cancelButton"
            onClick={() => {
              setAbierto(!estaAbierto);
            }}
          >
            Cancelar <Icon name="remove" style={{ margin: '0 0 0 10px' }}/>
          </Button>
          <Button disabled={habilitado}
            type="submit"
            className="confirmButton"
            color="green"
            onClick={() => {
              editar(horario,
                notas,
                profesores);
            }}
          >
            Editar <Icon name="checkmark" style={{ margin: '0 0 0 10px' }}/>
          </Button>
        </Modal.Actions>
      </Modal>
    );
}