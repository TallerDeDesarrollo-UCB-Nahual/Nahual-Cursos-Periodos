import React from "react";
import { Button, Confirm } from "semantic-ui-react";
import axios from "axios";

function Eliminar({ alumneId, curseId}) {
    const [abierto, setAbierto] = React.useState(false);
    const onOpen = () => setAbierto(true);
    const onClose = () => setAbierto(false);
/*
    const eliminarAlumneCurseAPI = (alumneId,curseId) => {
        console.log(alumneId);
        console.log(curseId);
        const API_URL = `${process.env.REACT_APP_API_URL}`;

        axios
            .delete(`${API_URL}/cursos/${curseId}/inscriptes/${alumneId}`)
            .then(response => {
                //eliminarVista();
            })
            .catch(function (error) {
                console.log(error);
            });
        onClose();
    }*/

    const eliminarAlumneCurseAPI = (alumneId,curseId) => {
        const API_URL = `${process.env.REACT_APP_API_URL}/estudiantes/`;
        console.log(`${API_URL}${alumneId}`);
            axios
            .delete(`${API_URL}${alumneId}?curseId=${curseId}`)
            .then(response => {
                window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error);
            });
        onClose();
    }

    return (
        <>
            <Button onClick={onOpen}>
                <i className="user delete icon"></i>
                <label className="icon-delete">Eliminar</label>
            </Button>
            <Confirm
                open={abierto}
                content="Se eliminará el contenido permanentemente"
                cancelButton='Cancelar'
                confirmButton="Confirmar"
                onCancel={onClose}
                onConfirm={() => eliminarAlumneCurseAPI(alumneId,curseId)}
            />
        </>
    );
}

export default Eliminar;