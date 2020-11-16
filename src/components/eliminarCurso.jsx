import React from "react";
//import { Button, Confirm } from "semantic-ui-react";
//import 'semantic-ui-css/semantic.min.css'
import { Button } from "shards-react";
import { eliminarCursoDePeriodo } from "../servicios/periodos";
import {useHistory} from "react-router-dom"
import { Link } from "react-router-dom"

function EliminarCurso({ idPeriodo, idCurso }) {
    const history = useHistory();

    const eliminarCursoDeAPI = (idPeriodo, idCurso) => {
        eliminarCursoDePeriodo(idPeriodo, idCurso);
        <Link to="/periodos"></Link>
        history.push("/periodos")
    }

    return (
        <>
            <Button style={{ float: "right" }} theme="danger" size="sm" onClick={() => eliminarCursoDeAPI(idPeriodo, idCurso)}>Eliminar</Button>
        </>
    );
}

export default EliminarCurso;