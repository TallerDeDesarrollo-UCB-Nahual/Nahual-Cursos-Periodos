import React from "react";
import { Button, Modal} from 'semantic-ui-react'
import { eliminarPeriodo } from "../servicios/periodos";


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
    }

    return (
        <>
            <Button color="red" onClick={onOpen}>
                <i className="user delete icon"></i>
                <label className="icon-delete">Eliminar</label>
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
