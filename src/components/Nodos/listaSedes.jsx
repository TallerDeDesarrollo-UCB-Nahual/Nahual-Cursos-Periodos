import React, { useEffect, useState } from "react";
import { obtenerSedesPorIdNodo } from "../../servicios/nodos";
import EliminarSede from "./eliminarSede";
import EditarSede from "./editarSede";
import { Label, Table } from 'semantic-ui-react'
import styles from "../styles.module.css";

export default function ListaSedes({ nodoId, nodoNombre }) {
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
                        <EditarSede id={sede.id} nombre={sede.nombre} nodoNombre={nodoNombre} nodoId={nodoId}/>
                    </Table.Cell>
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