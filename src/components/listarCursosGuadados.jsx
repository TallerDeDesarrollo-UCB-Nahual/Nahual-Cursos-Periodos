import React, {useEffect, useState} from "react";
import { Button, Modal, ModalBody, ModalHeader, Alert } from "shards-react";

export default function ListarCursosGuardados({cursos, estaAbierto, setAbierto}) {
    const listacursos = <div>
        {cursos.map(c => {
            return (
            <Alert theme="light">
                {c.horarioInicio} - {c.horarioFin} - <span class="badge badge-pill badge-primary">Nodo: {c.nodo.nombre}</span>{" "}
                <span class="badge badge-pill badge-success">Sede: {c.sede.nombre}</span>
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