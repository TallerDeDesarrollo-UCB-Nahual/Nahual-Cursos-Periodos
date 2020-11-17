import React from "react";
import { Modal, Header, Advertisement } from 'semantic-ui-react';

export default function ListarCursosGuardados({cursos, estaAbierto, setAbierto}) {
    const listacursos = 
    <div>
        {cursos.map(c => {
            return (
            <Advertisement theme="light">
                {c.horarioInicio} - {c.horarioFin} - <span class="badge badge-pill badge-primary">Nodo: {c.nodo.nombre}</span>{" "}
                <span class="badge badge-pill badge-success">Sede: {c.sede.nombre}</span>
            </Advertisement>)
        })}
    </div>;
    return (            
        <Modal size="lg" open={estaAbierto} toggle={() => setAbierto(!estaAbierto)}>
            <Header>Cursos</Header>
            <Modal.Content>
                {cursos.length > 0 ? listacursos : <h2>No hay cursos</h2>}
            </Modal.Content>
        </Modal>)
}