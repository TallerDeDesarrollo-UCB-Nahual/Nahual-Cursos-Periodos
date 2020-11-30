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
        window.location.replace("/nodos");
    }
    
    return (
        <>
            <Button className={styles.botonBasurero} onClick={onOpen}>
                <Icon color="red" className={styles.basurero} name='trash alternate outline' />
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