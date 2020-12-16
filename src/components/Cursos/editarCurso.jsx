import React, { useEffect, useState } from "react";
import { Button, Modal, Form, TextArea, Icon, Grid, Image } from "semantic-ui-react";
import { obtenerSedes } from "../../servicios/sedes"
import JTimepicker from 'reactjs-timepicker'
import { editarCurso } from "../../servicios/cursos";
import { obtenerCurso } from "../../servicios/cursos";
import LogoNahual from '../../assets/logo-proyecto-nahual.webp'
import servicioNotificacion from "../../servicios/notificaciones";
import { useHistory } from 'react-router'

export default function EditarCurso({ curso, estaAbierto, setAbierto, idCurso }) {

  const [sedes, setSedes] = useState([]);
  const [horario, setHorario] = useState("");
  const [sedeNodo, setSedeNodo] = useState([])
  const [sede, setSede] = useState("")
  const [nodo, setNodo] = useState("")
  const [notas, setNota] = useState("");
  const [profesores, setProfesor] = useState("")
  const [validacionProfesor, setValidacionProfesor] = useState(false)
  const [validacionNota, setValidacionNota] = useState(false)
  const [validacionHorario, setValidacionHorario] = useState(false)
  const [validacionNodo, setValidacionNodo] = useState(false)
  const [habilitado, setHabilitado] = useState(false)
  const history = useHistory()


  useEffect(() => {
    obtenerCurso(idCurso)
      .then(curso => { return curso.json() })
      .then(curso => {
        setHabilitado(false);
        if (curso.respuesta != null) {
          setHorario(curso.respuesta.horario);
          setSedeNodo([curso.respuesta.SedeId, curso.respuesta.NodoId]);
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

  function resetValores() {
    setAbierto(!estaAbierto);
    setHabilitado(false);
    setValidacionNota(false);
    setValidacionNodo(false);
    setValidacionHorario(false);
    setValidacionProfesor(false);
  }

  function editar(horario, nota, profesor) {
    editarCurso(idCurso, {
      "horario": horario,
      "SedeId": sedeNodo.SedeId,
      "NodoId": sedeNodo.NodoId,
      "notas": nota,
      "profesores": profesor
    }).then(curso => {
      return curso.data;
    })
      .then((curso) => {
        mostrarNotificacion(curso.Curso);
        history.go("/periodos");
        setAbierto(!estaAbierto);
      })
  }

  function mostrarNotificacion(curso) {
    servicioNotificacion.mostrarMensajeExito(
      "Curso editado con éxito",
      `Se edito el curso ${curso.horario}`
    );
  }

  function validarFormulario(data, tipo) {
    switch (tipo) {
      case "sede-nodo":
        setProfesor(data)
        setValidacionNodo(true)
        break;
      case "profesor":
        setProfesor(data)
        if (data.length != 0)
          setValidacionProfesor(true)
        break;
      case "nota":
        setNota(data)
        if (data.length != 0)
          setValidacionNota(true)
        break;
      case "horario":
        setHorario(data)
        if (data.length != 0)
          setValidacionHorario(true)
        break;
    }
    if (validacionProfesor || validacionHorario || validacionNota || validacionNodo) {
      setHabilitado(true);
    }
  }


  return (
    <Modal closeIcon open={estaAbierto} onClose={() => setAbierto(!estaAbierto)}>
      <Modal.Header>
        <Grid columns='equal'>
          <Grid.Column>
            <Image src={LogoNahual} size='small' />
          </Grid.Column>
          <Grid.Column>
            Editar Curso
            </Grid.Column>
        </Grid>
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Select
            fluid
            label="Sede - Nodo"
            value={[sede, nodo]}
            options={sedes.map((s) => {
              return {
                key: `sede-${s.id}`,
                value: [s.nodo.id, s.id],
                text: s.nombre + " - " + s.nodo.nombre,
              };
            })}
            onChange={(e, data) => {
              const selected = data.value;
              validarFormulario(data.value, "sede-nodo")
              setSedeNodo({
                SedeId: selected[1],
                NodoId: selected[0],
              });
              setNodo(selected[0])
              setSede(selected[1])
            }}
          />
          <Form.Input
            label="Horario"
            fluid
            type="text"
            value={horario}
            className={"form-control"}
            onChange={(x, data) =>
              validarFormulario(data.value, "horario")}
          />
          <Form.Input
            label="Profesor"
            fluid
            type="text"
            value={profesores}
            class="form-control"
            onChange={(x, data) =>
              validarFormulario(data.value, "profesor")}
          />
          <Form.Input
            label="Notas"
            fluid
            type="text"
            value={notas}
            class="form-control"
            control={TextArea}
            onChange={(x, data) =>
              validarFormulario(data.value, "nota")}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          className="cancelButton"
          onClick={() => {
            setAbierto(!estaAbierto);
            resetValores();
          }}
        >
          Cancelar <Icon name="remove" style={{ margin: '0 0 0 10px' }} />
        </Button>
        <Button disabled={!habilitado}
          type="submit"
          className="confirmButton"
          color="green"
          onClick={() => {
            editar(horario,
              notas,
              profesores);
            resetValores();
          }}
        >
          Editar <Icon name="checkmark" style={{ margin: '0 0 0 10px' }} />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}