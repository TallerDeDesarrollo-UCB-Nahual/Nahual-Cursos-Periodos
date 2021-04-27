import React from "react";
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { eliminarSede } from "../../servicios/nodos";
import styles from "../styles.module.css";


function EliminarSede({ id }) {
    const [abierto, setAbierto] = React.useState(false);

    const onOpen = () => setAbierto(true);
    const onClose = () => setAbierto(false);

    const eliminar = (id) => {
        eliminarSede(id);
        setTimeout(() => {
            window.location.replace("/nodos");
        }, 1000);
    }
    
    return (
        <>
            <Button negative color="red" size="small" onClick={onOpen}>
                <small>Eliminar</small>
                <Icon className={styles.basurero} name='trash alternate outline' />
            </Button>
            <Confirm
                open={abierto}
                content='Se eliminará permanentemente'
                cancelButton='Cancelar'
                confirmButton='Confirmar'
                onCancel={onClose}
                onConfirm={() => eliminar(id)}
            />
        </>
    );
}

export default EliminarSede;