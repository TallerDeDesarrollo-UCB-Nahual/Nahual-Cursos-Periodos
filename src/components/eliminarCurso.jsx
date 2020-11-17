import React, { useReducer } from "react";
import { Button } from 'semantic-ui-react'
import { eliminarCursoDePeriodo } from "../servicios/periodos";


function EliminarCurso({ idPeriodo, idCurso }) {

    const eliminarCursoDeAPI = (idPeriodo, idCurso) => {
        eliminarCursoDePeriodo(idPeriodo, idCurso);
        window.location.replace("/periodos");
    }

    return (
        <>
            <Button color="red" size="small" onClick={() => eliminarCursoDeAPI(idPeriodo, idCurso)}>Eliminar</Button>
        </>
    );
}

export default EliminarCurso;