import React from "react";
import { Modal, Header, Advertisement, Button } from 'semantic-ui-react';
import EliminarCurso from "./eliminarCurso";
import { Icon, Label } from 'semantic-ui-react'

export default function ListarCursosGuardados({cursos, estaAbierto, setAbierto, idPeriodo}) {
    console.log(cursos)
    const listacursos = 
    <div className={"forceFlex isColumn rowGap"}>
        {cursos.map(c => {
            return (
            <Advertisement>
                {c.horarioInicio} - {c.horarioFin} - {" "}
                <Label color="blue" size="tiny">Nodo: {c.nodo.nombre}</Label>{" "}
                <Label color="teal" size="tiny">Sede: {c.sede.nombre}</Label>{" "}
                <Label color="yellow" size="tiny">Profesores: {c.profesores}</Label>
                <Label color="violet" size="tiny">Notas: {c.notas}</Label>
                
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