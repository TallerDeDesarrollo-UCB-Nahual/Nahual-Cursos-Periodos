import React from "react";
import { Modal, Header, Table } from 'semantic-ui-react';

export default function ListaCursosACrear({cursos, estaAbierto, setAbierto}) {
    const listacursos = <div className={"forceFlex isColumn rowGap"}>
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Horario</Table.HeaderCell>
                    <Table.HeaderCell>Profesores</Table.HeaderCell>
                    <Table.HeaderCell>Notas</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body> 
                {cursos.map(c => {
                    return (       
                        <Table.Row key={`curso-${c.id}`}>
                            <Table.Cell>{c.horario}</Table.Cell>
                            <Table.Cell>{c.profesores}</Table.Cell>
                            <Table.Cell>{c.notas}</Table.Cell>
                        </Table.Row>
                    )}
                )}
            </Table.Body>
        </Table>
    </div>;
    return (            
        <Modal open={estaAbierto} onClose={() => setAbierto(!estaAbierto)}>
            <Header>Cursos</Header>
            <Modal.Content>
                {cursos.length > 0 ? listacursos : <h2>No hay cursos</h2>}
            </Modal.Content>
        </Modal>)
}