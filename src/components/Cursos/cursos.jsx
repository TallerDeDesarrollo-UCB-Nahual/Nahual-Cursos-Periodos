import React, { useEffect, useState } from "react";
import { Button, Table, Select, Icon, Message, Input, Label, Header } from "semantic-ui-react";
import { obtenerCursos } from "../../servicios/cursos";
import { useHistory } from "react-router-dom";
import styles from "../styles.module.css";
import EditarCurso from "./editarCurso";
import EliminarCurso from "./eliminarCurso";
import CrearCurso from "./crearcurso";
import iconCurso from '../../assets/reading-book.png';

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState(true);

  const [idCurso, setIdCurso] = useState(0)

  const [informacionCurso, setInformacionCurso] = useState(false)
  const [modalNuevoCurso,setmodalNuevoCurso] = useState(false);

  useEffect(() => {
  obtenerCursos()
    .then((response) => response.json())
    .then((response) => setCursos(response.response));
  }, []);

  const listaCursos = <Table>
    <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Periodo</Table.HeaderCell>
      <Table.HeaderCell>Nodo</Table.HeaderCell>
      <Table.HeaderCell>Sede</Table.HeaderCell>
      <Table.HeaderCell>Horario</Table.HeaderCell>
      <Table.HeaderCell>Profesores</Table.HeaderCell>
      <Table.HeaderCell>Topico</Table.HeaderCell>
      <Table.HeaderCell className={"displayFlex  centered"}>
      Acciones
      </Table.HeaderCell> 
    </Table.Row>
    </Table.Header>
    <Table.Body>
    {cursos.map((c) => {
      if (c.estado === filtroEstado) {
      return (
        <Table.Row key={`curso-${c.id}`}>
        <Table.Cell>{c.anio}/{c.periodo}</Table.Cell>
        <Table.Cell>{c.nodo.nombre}</Table.Cell>
        <Table.Cell>{c.sede.nombre}</Table.Cell>
        <Table.Cell>{c.horario}</Table.Cell>
        <Table.Cell>{c.profesores}</Table.Cell>
        <Table.Cell>{c.topico.nombre}</Table.Cell>
        <Table.Cell>
          <div className={"displayFlex centered columnGap"}>
          <Button size="small" color="blue" onClick={x => {
            setInformacionCurso(true)
            setIdCurso(c.id);
            }}>Editar <Icon color='white' name='edit' style={{ margin: '0 0 0 10px' }} />
          </Button>
          <EditarCurso estaAbierto={informacionCurso} setAbierto={setInformacionCurso} idCurso={idCurso} />  
          <EliminarCurso idCurso={c.id}></EliminarCurso>
          </div>
        </Table.Cell>
        </Table.Row>
      );
      }
    })}
    </Table.Body>
  </Table>

  const mensajeSinCursos = <Message
  icon="warning sign"
  warning
  header={"No existen periodos aún."}
  content={"Crea Cursos para Nahual."}
  />

  return (
  <div className={styles.vistaPeriodos}>
  <Header center="true" as='h1'  image={iconCurso} textAlign="center" content='Cursos'/>
    <div className={"opcionesPeriodo"}>
 
    <Input
      label= {"Estado"}
      fluid
      input={
        <Select
        className={"custom-select"}
        value={filtroEstado}
        options={[
          { key: "activo", value: true, text: "Activo" },
          { key: "inactivo", value: false, text: "Inactivo" },
        ]}
        onChange={(x, data) => {
          setFiltroEstado(data.value === true);
        }}
        />
      }
    />

    <Button color='green' onClick={() => setmodalNuevoCurso(true)}>
      Nuevo Curso
        <Icon color='white' name='add circle' style={{ margin: '0 0 0 10px' }} />
    </Button>
    </div>
    
    <CrearCurso
    estaAbierto={modalNuevoCurso}
    setAbierto={setmodalNuevoCurso}
    cursos={cursos}
    setCursos={setCursos}
    />
   { cursos.length > 0 ? listaCursos : mensajeSinCursos}
  </div>
  );
}
