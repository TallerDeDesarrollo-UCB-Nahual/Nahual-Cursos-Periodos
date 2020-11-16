import React, {useEffect, useState} from "react";
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";

export default function ListarCursosGuardados({cursos, estaAbierto, setAbierto}) {
    const listacursos = <div>cursos</div>;
    return (            
        <Modal size="lg" open={estaAbierto} toggle={() => setAbierto(!estaAbierto)}>
            <ModalHeader>Cursos</ModalHeader>
            <ModalBody>
                {cursos.length > 0 ? listacursos : <h2>No hay cursos</h2>}
            </ModalBody>
        </Modal>)
}