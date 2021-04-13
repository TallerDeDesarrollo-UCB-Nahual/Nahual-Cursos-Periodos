import React, { useEffect, useState } from "react";
import { Button, Modal, Form, TextArea, Icon, Grid, Image } from "semantic-ui-react";
import { obtenerSedes } from "../../servicios/sedes"
import JTimepicker from 'reactjs-timepicker'
import { editarCurso, obtenerCurso } from "../../servicios/cursos";
import { obtenerModulos } from "../../servicios/modulos";
import LogoNahual from '../../assets/logo-proyecto-nahual.webp'
import servicioNotificacion from "../../servicios/notificaciones";
import { useHistory } from 'react-router'

export default function EditarCurso({estaAbierto, setAbierto, idCurso }) {

  const [sedes, setSedes] = useState([]);
  const [topicos, setTopicos] = useState([]);

  const [horario, setHorario] = useState("");
  const [sedeNodo, setSedeNodo] = useState([])
  const [sede, setSede] = useState("")
  const [nodo, setNodo] = useState("")
  const [notas, setNota] = useState("");
  const [profesores, setProfesor] = useState("")
  const [periodo, setPeriodo] = useState(null);
  const [estado, setEstado] = useState(null)
  const [topico, setTopico] = useState(null);
  const [anio, setAnio] = useState("")

  const [validacionProfesor, setValidacionProfesor] = useState(false)
  const [validacionNota, setValidacionNota] = useState(false)
  const [validacionHorario, setValidacionHorario] = useState(false)
  const [validacionNodo, setValidacionNodo] = useState(false)
  const [habilitado, setHabilitado] = useState(false)

  useEffect(() => {
    inicializarCurso(idCurso);
    inicializarSedes();
    inicializarTopicos();
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

  function inicializarTopicos() {
    obtenerModulos()
      .then((response) => response.json())
      .then((response) => {
        setTopicos(response.response);
      });
  }

  function inicializarCurso(idCurso){
    obtenerCurso(idCurso)
    .then(curso => { return curso.json() })
    .then(curso => {
      setHabilitado(false);
      if (curso.respuesta != null) {
        setAnio(curso.respuesta.anio);
        setPeriodo(curso.respuesta.periodo);
        setEstado(curso.respuesta.estado);
        setTopico(curso.respuesta.TopicoId);
        setHorario(curso.respuesta.horario);
        setSedeNodo([curso.respuesta.SedeId, curso.respuesta.NodoId]);
        setSede(curso.respuesta.SedeId);
        setNodo(curso.respuesta.NodoId);
        setNota(curso.respuesta.notas);
        setProfesor(curso.respuesta.profesores);
      };
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

  function editar() {
    editarCurso(idCurso, {
      anio: anio,
      periodo: periodo,
      TopicoId: topico,
      estado: estado,
      horario: horario,
      SedeId: sedeNodo.SedeId,
      NodoId: sedeNodo.NodoId,
      notas: notas,
      profesores: profesores
    })
      .then(curso => {
        return curso.data;
      })
      .then((curso) => {
        mostrarNotificacion(curso.Curso);
        window.location.replace("/cursos");
        setTimeout(function () { window.location.reload();}, 5000); 
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
      case "anio":
        setAnio(data)
      break;
      case "periodo":
        setPeriodo(data)
      break;
      case "topico":
        setTopico(data)
      break;
      case "sede-nodo":
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
        <Form.Input
            label="Año"
            fluid
            value={anio}
            type="number"
            className={"form-control"}
            onChange={(x, data) => validarFormulario(data.value , "anio")}
            required={true}
          />
          <Form.Input
            label="Periodo"
            fluid
            placeholder = "Ingrese Periodo (1 o 2)"
            type="text"
            value={periodo}
            className={"form-control"}
            onChange={(x, data) => validarFormulario(data.value , "periodo")}
            required={true}
          />
         <Form.Select
            label="Estado"
            fluid
            value = {estado}
            placeholder = "Seleccione Estado"
            options={[
              { key: "activo", value: true, text: "Activo" },
              { key: "inactivo", value: false, text: "Inactivo" },
            ]}
            onChange={(x, data) => {
              setEstado(data.value === true);
            }}
            required={true}
          />
          <Form.Select
            label="Topico"
            fluid
            value = {topico}
            placeholder = "Seleccione Topico"
            options={topicos.map((t) => {
              return {
                key: `topico-${t.id}`,
                value: t.id,
                text: t.nombre,
              };
            })}
            onChange={(e, data) => { 
              setTopico(data.value);
              validarFormulario(data.value , "topico");
            }}
            required={true}
          />
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