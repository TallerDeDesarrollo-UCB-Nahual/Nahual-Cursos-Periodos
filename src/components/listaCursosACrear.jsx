import React from "react";
import { Modal, Header, Advertisement, Button } from 'semantic-ui-react';

export default function ListaCursosACrear({cursos, estaAbierto, setAbierto}) {
    const listacursos = <div className={"forceFlex isColumn rowGap"}>
        {cursos.map(c => {
            return (
            <Advertisement theme="light">
                {c.horarioInicio} - {c.horarioFin} {" "}
                <Button size="small" color="blue">Notas: {c.notas}</Button>{" "}
                <Button size="small" color="green">Profesores: {c.profesores}</Button>
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