import React, { useEffect, useState, componentDidUpdate } from "react";
import { Modal, Button, Table, Icon, Grid, Message, Image } from 'semantic-ui-react';
import EliminarCurso from "../Cursos/eliminarCurso";
import CrearCurso from "../Cursos/crearcurso";
import EditarCurso from "../Cursos/editarCurso";
import { obtenerCursosPorIdPeriodo } from "../../servicios/periodos";
import LogoNahual from '../../assets/logo-proyecto-nahual.webp'

export default function ListarCursosGuardados({estaAbierto, setAbierto, idPeriodo}) {

    const [nuevoCursoModalAbierto, setNuevoCursoModalAbierto] = useState(false);
    const [cursos, setCursos] = useState([]);
    const [idCurso, setIdCurso] = useState(0)
    const [informacionCurso, setInformacionCurso] = useState(false)
    const [curso, setCursoAEditar] = useState({})

    useEffect(() => {
        obtenerCursosPorIdPeriodo(idPeriodo)
          .then((response) => response.json())
          .then((response) => setCursos(response.response));
    },[idPeriodo]);

    //componentDidUpdate(()=>{
    //    console.log("updateeeeee");
    //})

    const listacursos = 
    <div id="listaCursos" className={"forceFlex isColumn rowGap"}>
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Horario</Table.HeaderCell>
                    <Table.HeaderCell>Nodo</Table.HeaderCell>
                    <Table.HeaderCell>Sede</Table.HeaderCell>
                    <Table.HeaderCell>Profesores</Table.HeaderCell>
                    <Table.HeaderCell>Notas</Table.HeaderCell>
                    <Table.HeaderCell className={"displayFlex  centered"}>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>  
                {cursos.map(c => {
                    return (                                            
                        <Table.Row key={`curso-${c.id}`}>
                            <Table.Cell>{c.horario}</Table.Cell>
                            <Table.Cell>{c.nodo.nombre}</Table.Cell>
                            <Table.Cell>{c.sede.nombre}</Table.Cell>
                            <Table.Cell>{c.profesores}</Table.Cell>
                            <Table.Cell>{c.notas}</Table.Cell>
                            <Table.Cell>
                                <div className={'displayFlex centered columnGap'}>
                            <Button size="small" color="blue" onClick={x => {
                                                        setInformacionCurso(true)
                                                        setIdCurso(c.id);

                                                }}>Editar <Icon color='white' name='edit' style={{ margin: '0 0 0 10px' }} /></Button>
                                <EditarCurso estaAbierto={informacionCurso} setAbierto={setInformacionCurso} idCurso={idCurso}/>     
                                <EliminarCurso idPeriodo={idPeriodo} idCurso={c.id}></EliminarCurso>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    </div>;
    
    const mensajeSinCursos = <Message
        icon="warning sign"
        warning
        header={"No existen cursos aún."}
        content={"Crea cursos para este periodo."}
    />
    return (            
        <Modal closeIcon open={estaAbierto} onClose={() => setAbierto(!estaAbierto) }>
            <Modal.Header>
                <Grid columns='equal'>
                  <Grid.Column>
                    <Image src={LogoNahual} size='small' />
                  </Grid.Column>
                  <Grid.Column>
                    Cursos
                  </Grid.Column>
                  <Grid.Column>
                    <Button floated='right' color='green' onClick={() => setNuevoCursoModalAbierto(true)}>Nuevo Curso
                        <Icon color='white' name='add circle' style={{ margin: '0 0 0 10px' }} />
                    </Button>
                    <CrearCurso
                        estaAbierto={nuevoCursoModalAbierto}
                        setAbierto={setNuevoCursoModalAbierto}
                        idPeriodo={idPeriodo}
                        cursos={cursos}
                        setCursos={setCursos}
                    />
                  </Grid.Column>
                </Grid>
            </Modal.Header>
            <Modal.Content scrolling={true} >
                {cursos.length > 0 ? listacursos : mensajeSinCursos}
            </Modal.Content>
        </Modal>)
}