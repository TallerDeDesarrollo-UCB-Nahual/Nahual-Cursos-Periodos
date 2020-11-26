import React, { useEffect, useState } from "react";
import styles from "./styles.module.css"
import {obtenerModulos} from "../servicios/modulos";
//import { Container, Button, Form, ButtonGroup } from 'semantic-ui-react'
import CrearCurso from "./crearcurso";
import {useHistory} from "react-router-dom"
import { crearPeriodo } from "../servicios/periodos";
import { crearCurso } from "../servicios/cursos";
import ListaCursosACrear from "./listaCursosACrear";

import { Button, Table, Select, Modal, Header } from 'semantic-ui-react'
import { obtenerPeriodos, obtenerCursosPorIdPeriodo } from "../servicios/periodos";
import { Link } from "react-router-dom"
import ListarCursosGuardados from "./listarCursosGuadados";
import Eliminar from './eliminarPeriodo';


function EditarPeriodo({ periodoId, estaAbierto, setAbierto }) {

    //const [abierto, setAbierto] = React.useState(false);

    const onOpen = () => {
        setAbierto(true)
    };
    /*
        const onClose = () => {
            setAbierto(false)
        };
    */
    return (
        <>
            <Button color="ui blue button" onClick={onOpen}>
                <i className="edit icon"></i>
                <label className="ui blue">Editar</label>
            </Button>
            <Modal open={estaAbierto} onClose={() => setAbierto(!estaAbierto)}>
                <Header>Edición de periodo</Header>
                <Modal.Content>
                    <h2>{periodoId}</h2>
                </Modal.Content>
            </Modal>
        </>
    );
}

export default EditarPeriodo;