import React, { useReducer } from "react";
import { Button } from "shards-react";
import { eliminarCursoDePeriodo } from "../servicios/periodos";


function EliminarCurso({ idPeriodo, idCurso }) {

    const eliminarCursoDeAPI = (idPeriodo, idCurso) => {
        eliminarCursoDePeriodo(idPeriodo, idCurso);
        window.location.replace("/periodos");
    }

    return (
        <>
            <Button style={{ float: "right" }} theme="danger" size="sm" onClick={() => eliminarCursoDeAPI(idPeriodo, idCurso)}>Eliminar</Button>
        </>
    );
}

export default EliminarCurso;