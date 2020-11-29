import React from "react";
import { Modal, Header, Button, Table } from 'semantic-ui-react';
import EliminarCurso from "./eliminarCurso";

export default function ListarCursosGuardados({cursos, estaAbierto, setAbierto, idPeriodo}) {
    console.log(cursos)
    const listacursos = 
    <div id="listaCursos" className={"forceFlex isColumn rowGap"}>
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Horario Inicio</Table.HeaderCell>
                    <Table.HeaderCell>Horario Fin</Table.HeaderCell>
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
                            <Table.Cell>{c.horarioInicio}</Table.Cell>
                            <Table.Cell>{c.horarioFin}</Table.Cell>
                            <Table.Cell>{c.nodo.nombre}</Table.Cell>
                            <Table.Cell>{c.sede.nombre}</Table.Cell>
                            <Table.Cell>{c.profesores}</Table.Cell>
                            <Table.Cell>{c.notas}</Table.Cell>
                            <Table.Cell>
                                <div className={'displayFlex centered columnGap'}>
                                <Button size="small" color="blue" >Editar</Button>
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
        <Modal open={estaAbierto} onClose={() => setAbierto(!estaAbierto) }>
            <Header>Cursos</Header>
            <Modal.Content scrolling={true} >
                {cursos.length > 0 ? listacursos : <h2>No hay cursos</h2>}
            </Modal.Content>
        </Modal>)
}