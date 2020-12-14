import React, { useReducer } from "react";
import { Button, Icon } from 'semantic-ui-react'
import { eliminarCursoDePeriodo } from "../../servicios/periodos";
import  servicionotificacion  from "../../servicios/notificaciones";


function EliminarCurso({ idPeriodo, idCurso }) {

    const mostrarNotificacion = () => { 
        servicionotificacion.mostrarMensajeExito(
          `Curso eliminado con exito`,''
        );
    }

    const eliminarCursoDeAPI = (idPeriodo, idCurso) => {
        eliminarCursoDePeriodo(idPeriodo, idCurso);
        mostrarNotificacion();
        window.location.replace("/periodos");
        setTimeout(function () { window.location.reload();}, 5000); 
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