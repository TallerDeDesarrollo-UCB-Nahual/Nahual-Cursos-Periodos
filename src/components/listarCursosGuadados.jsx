import React from "react";
import { Modal, Header, Advertisement, Button } from 'semantic-ui-react';
import EliminarCurso from "./eliminarCurso";

export default function ListarCursosGuardados({cursos, estaAbierto, setAbierto, idPeriodo}) {
    console.log(cursos)
    const listacursos = 
    <div className={"forceFlex isColumn rowGap"}>
        {cursos.map(c => {
            return (
            <Advertisement>
                {c.horarioInicio} - {c.horarioFin} - {" "}
                <Button color="blue" size="tiny">Nodo: {c.nodo.nombre}</Button>{" "}
                <Button color="teal" size="tiny">Sede: {c.sede.nombre}</Button>{" "}
                <Button color="yellow" size="tiny">Profesores: {c.profesores}</Button>
                <Button color="violet" size="tiny">Notas: {c.notas}</Button>
                <EliminarCurso idPeriodo={idPeriodo} idCurso={c.id}></EliminarCurso>
            </Advertisement>)
        })}
    </div>;
    return (            
        <Modal open={estaAbierto} onClose={() => setAbierto(!estaAbierto)}>
            <Header>Cursos</Header>
            <Modal.Content>
                {cursos.length > 0 ? listacursos : <h2>No hay cursos</h2>}
            </Modal.Content>
        </Modal>)
}