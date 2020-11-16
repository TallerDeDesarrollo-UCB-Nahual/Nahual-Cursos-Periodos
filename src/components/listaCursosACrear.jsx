import React from "react";
import { Modal, ModalBody, ModalHeader, Alert } from "shards-react";

export default function ListaCursosACrear({cursos, estaAbierto, setAbierto}) {
    const listacursos = <div>
        {cursos.map(c => {
            return (
            <Alert theme="light">
                {c.horarioInicio} - {c.horarioFin} - <span class="badge badge-pill badge-primary">Notas: {c.notas}</span>{" "}
                <span class="badge badge-pill badge-success">Profesores: {c.profesores}</span>
            </Alert>)
        })}
    </div>;
    return (            
        <Modal size="lg" open={estaAbierto} toggle={() => setAbierto(!estaAbierto)}>
            <ModalHeader>Cursos</ModalHeader>
            <ModalBody>
                {cursos.length > 0 ? listacursos : <h2>No hay cursos</h2>}
            </ModalBody>
        </Modal>)
}