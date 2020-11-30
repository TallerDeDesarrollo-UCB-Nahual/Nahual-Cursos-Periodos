import React, {useEffect, useState} from "react";
import { Modal, Header, Advertisement, Button, Table } from 'semantic-ui-react';
import EliminarCurso from "./eliminarCurso";
import EditarCurso from "./editarCurso";
import { obtenerCurso } from "../servicios/cursos";

export default function ListarCursosGuardados({cursos, estaAbierto, setAbierto, idPeriodo}) {
    console.log(cursos)
    const [idCurso, setIdCurso] = useState(0)
    const [informacionCurso, setInformacionCurso] = useState(false)
    const [cursoI, setCursoAEditar] = useState({})
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
                                                    obtenerCurso(c.id).then(curso => {
                                                        return curso.json()
                                                    }).then(curso => {
                                                        setCursoAEditar(curso.respuesta)
                                                        setInformacionCurso(true)
                                                        setIdCurso(c.id);
                                                        console.log("ya opues",cursoI)
                                                        return (
                                                            <EditarCurso curso={cursoI} estaAbierto={informacionCurso} setAbierto={setInformacionCurso} idCurso={idCurso}/>     
                                                        )
                                                    }) 
                                                }}>Editar</Button>
                                <EliminarCurso idPeriodo={idPeriodo} idCurso={c.id}></EliminarCurso>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    </div>;
    return (       
        <div>
        <Modal open={estaAbierto} onClose={() => setAbierto(!estaAbierto) }>
            <Header>Cursos</Header>
            <Modal.Content scrolling={true} >
                {cursos.length > 0 ? listacursos : <h2>No hay cursos</h2>}
            </Modal.Content>
        </Modal>
        </div>
        )
}