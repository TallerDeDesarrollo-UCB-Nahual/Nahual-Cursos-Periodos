import React, { useEffect, useState } from "react";
import { Table, Icon } from 'semantic-ui-react'
import { obtenerNodos } from "../../servicios/nodos";
import styles from "../styles.module.css";
import ListaSedes from "./listaSedes";

export default function ListarNodos() {
    const [nodos, setNodos] = useState([]);

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
                                        <Icon color='olive' name='add circle' />
                                        <Icon color='olive' name='edit' />
                                    </div>
                                </Table.Cell>
                                <Table.Cell verticalAlign='top'>
                                    <ListaSedes nodoId={nodo.id} />
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div >
    )
}