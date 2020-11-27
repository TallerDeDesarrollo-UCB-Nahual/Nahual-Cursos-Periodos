import React, { useReducer } from "react";
import { Button, Confirm } from 'semantic-ui-react'
import { eliminarSede } from "../../servicios/sedes";


function EliminarSede({ id }) {
    const [abierto, setAbierto] = React.useState(false);

    const onOpen = () => setAbierto(true);
    const onClose = () => setAbierto(false);

    const eliminarSede = (id) => {
        eliminarSede(id);
        window.location.replace("/nodos");
    }

    return (
        <>
            <Button onClick={onOpen}>
                <i className="user delete icon"></i>
                <label className="icon-delete">Eliminar</label>
            </Button>
            <Confirm
                open={abierto}
                content='Se eliminará permanentemente'
                cancelButton='Cancelar'
                confirmButton="Confirmar"
                onCancel={onClose}
                onConfirm={() => eliminarSede(id)}
            />
        </>
    );
}

export default EliminarSede;