import React, { useEffect, useState } from "react";
import { Table, Icon } from 'semantic-ui-react'
import { obtenerNodos } from "../../servicios/nodos";
import styles from "../styles.module.css";
import ListaSedes from "./listaSedes";
import CrearNodo from "./crearNodo";
import CrearSede from "./crearSede";

export default function ListarNodos() {
    const [nodos, setNodos] = useState([]);

    const [abierto, setAbierto] = React.useState(false);

    useEffect(() => {
        obtenerNodos().then(response => response.json()).then(response => setNodos(response.response))
    }, [])

    return (
        <div className={styles.vistaPeriodos}>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nodos</Table.HeaderCell>
                        <Table.HeaderCell>Sedes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {nodos.map(nodo => {
                        return (
                            <Table.Row key={`nodo-${nodo.id}`}>
                                <Table.Cell>
                                    {nodo.nombre}
                                    <div align="right">
                                        {/* al hacer click en estos iconos se deberia agregar sedes y editar nodos */}
                                        <CrearSede open={abierto} nodoId={nodo.id} nodoNombre={nodo.nombre} />
                                        <Icon color='olive' name='add circle' />
                                        <Icon color='olive' name='edit' />
                                    </div>
                                </Table.Cell>
                                <Table.Cell verticalAlign='top'>
                                    <ListaSedes nodoId={nodo.id} nodoNombre={nodo.nombre} />
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <CrearNodo open={false} />
        </div >
    )
}