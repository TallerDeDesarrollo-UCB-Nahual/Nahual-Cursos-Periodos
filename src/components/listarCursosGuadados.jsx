import React from "react";
import { Modal, ModalBody, ModalHeader, Alert } from "shards-react";
import EliminarCurso from "./eliminarCurso"

export default function ListarCursosGuardados({cursos, estaAbierto, setAbierto, idPeriodo}) {
    const listacursos = <div>
        {cursos.map(c => {
            return (
            <Alert theme="light">
                {c.horarioInicio} - {c.horarioFin} - <span class="badge badge-pill badge-primary">Nodo: {c.nodo.nombre}</span>{" "}
                <span class="badge badge-pill badge-success">Sede: {c.sede.nombre}</span>{" "}
                <span class="badge badge-pill badge-info">Profesores: {c.profesores}</span>{" "}
                <span class="badge badge-pill badge-secondary">Notas: {c.notas}</span>

                <EliminarCurso idPeriodo={idPeriodo} idCurso={c.id}></EliminarCurso>
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