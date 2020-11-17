import React from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "shards-react";
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
            console.log(cursoperiodo);
            if(cursoperiodo.status == 200){
                //mostrar "se ha eliminado correctamente"
                window.location.reload();
            }
            else{
                //fallo al eliminar
            }
        })
    }

    return (
        <>
            <Button onClick={onOpen}>
                <i className="user delete icon"></i>
                <label className="icon-delete">Eliminar</label>
            </Button>
            <Modal size="m" open={abierto} >
                <ModalHeader>Atencion!</ModalHeader>
                <ModalBody>Estas seguro que deseas elimnar este periodo?</ModalBody>
                <ModalFooter>
                    <Button onClick = {() => eliminarPeriodoDeBD(egresadeId)}>Confirmar</Button>
                    <Button onClick = {onClose}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default Eliminar;