import React from "react";
import { Button, Modal, Icon} from 'semantic-ui-react'
import { eliminarPeriodo } from "../../servicios/periodos";
import  servicionotificacion  from "../../servicios/notificaciones";

function Eliminar({ egresadeId }) {

    const [abierto, setAbierto] = React.useState(false);

    const onOpen = () => {
        setAbierto(true)
    };
    const onClose = () => {
        setAbierto(false)
    };

    const eliminarPeriodoDeBD = (egresadeId) => {
        onClose();
        eliminarPeriodo(egresadeId).then(cursoperiodo => {
            if(cursoperiodo.status == 200){
                window.location.reload();
            }
        })
        mostrarNotificacion();
    }

    const mostrarNotificacion = () => { 
        servicionotificacion.mostrarMensajeExito(
          `Curso eliminado con éxito`,''
        );
    }

    return (
        <>
            <Button color="red" onClick={onOpen}>
                Eliminar
                <Icon color='white' name='delete' style={{ margin: '0 0 0 10px' }} />
            </Button>
            <Modal size="m" open={abierto} >
                <Modal.Header>Atencion!</Modal.Header>
                <Modal.Content>Estas seguro que deseas elimnar este periodo?</Modal.Content>
                <Modal.Actions>
                    <Button className="confirmButton" onClick = {() => eliminarPeriodoDeBD(egresadeId)}>Confirmar</Button>
                    <Button className="cancelButton" onClick = {onClose}>Cancelar</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}

export default Eliminar;
