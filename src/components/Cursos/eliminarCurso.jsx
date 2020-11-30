import React, { useReducer } from "react";
import { Button, Icon } from 'semantic-ui-react'
import { eliminarCursoDePeriodo } from "../../servicios/periodos";


function EliminarCurso({ idPeriodo, idCurso }) {

    const eliminarCursoDeAPI = (idPeriodo, idCurso) => {
        eliminarCursoDePeriodo(idPeriodo, idCurso);
        window.location.replace("/periodos");
    }

    return (
        <>
            <Button  negative color="red" size="small" onClick={() => eliminarCursoDeAPI(idPeriodo, idCurso)}>
                Eliminar <Icon color='white' name='delete' style={{ margin: '0 0 0 10px' }} />
            </Button>
        </>
    );
}

export default EliminarCurso;