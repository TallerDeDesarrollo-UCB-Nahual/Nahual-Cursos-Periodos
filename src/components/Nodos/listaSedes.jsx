import React, { useEffect, useState } from "react";
import { obtenerSedesPorIdNodo } from "../../servicios/nodos";
import EliminarSede from "./eliminarSede";
import { Label, Table } from 'semantic-ui-react'
import styles from "../styles.module.css";

export default function ListaSedes({ nodoId }) {
    const [sedes, setSedes] = useState([]);

    const obtener = () => {
        obtenerSedesPorIdNodo(nodoId).then(sedeNodo => {
            return sedeNodo.json();
        }).then(sedeNodo => {
            setSedes(sedeNodo.response);
        })
    }
    useEffect(() => {
        obtener();
    }, []);

    const listaDeSedes = <div>
        {sedes.map(sede => {
            return (

                <div>
                    <Table.Cell >
                        <Label className={styles.sede}>• {sede.nombre}</Label>
                    </Table.Cell>

                    <Table.Cell align="right">
                        <EliminarSede id={sede.id}/>
                    </Table.Cell>

                    {/* <Label className={styles.tarjetaAzul}>• {sede.nombre}</Label>
                    { sede.nombre}
                    <Button color="red" size="small" onClick={() => eliminarCursoDeAPI(idPeriodo, idCurso)}>Eliminar</Button>
                    <Icon color='red' name='trash alternate outline' /> */}
                </div>
            )
        })}
    </div>;
    return (
        <div>
            {sedes.length > 0 ? listaDeSedes : <h2>El nodo no tiene sedes</h2>}
        </div>
    )
}