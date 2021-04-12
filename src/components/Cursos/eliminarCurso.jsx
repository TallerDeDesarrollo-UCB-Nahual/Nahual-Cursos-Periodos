import React, { useReducer } from "react";
import { Button, Icon } from 'semantic-ui-react'
import { eliminarCurso } from "../../servicios/cursos";
import  servicionotificacion  from "../../servicios/notificaciones";


function EliminarCurso({ idCurso }) {

    const mostrarNotificacion = () => { 
        servicionotificacion.mostrarMensajeExito(
          `Curso eliminado con éxito`,''
        );
    }

    const eliminarCursoDeAPI = ( idCurso) => {
        eliminarCurso( idCurso);
        mostrarNotificacion();
        window.location.replace("/cursos");
        setTimeout(function () { window.location.reload();}, 5000); 
    }

    return (
        <>
            <Button  negative color="red" size="small" onClick={() => eliminarCursoDeAPI( idCurso)}>
                Eliminar <Icon color='white' name='trash' style={{ margin: '0 0 0 10px' }} />
            </Button>
        </>
    );
}

export default EliminarCurso;