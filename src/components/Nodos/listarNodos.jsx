import React, { useEffect, useState } from "react";
import { Table, Grid, GridColumn, Header, Icon } from 'semantic-ui-react'
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
        <Grid centered columns={2}>
            <GridColumn>
                <div className={styles.vistaCursos}>
                <Header as='h1' icon textAlign='center'>
                    <Icon name='map signs' size='tiny' circular  />
                    <Header.Content>Lista de Nodos - Sedes</Header.Content>
                </Header>
                    <div className={styles.crearNodoButton}>
                        <CrearNodo open={false} />
                    </div>
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
                                            <Grid columns='equal'>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        {nodo.nombre}
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <CrearSede open={abierto} nodoId={nodo.id} nodoNombre={nodo.nombre} />
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Table.Cell>
                                        <Table.Cell verticalAlign='top'>
                                            <ListaSedes nodoId={nodo.id} nodoNombre={nodo.nombre} />
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>

                    </Table>
                </div >
            </GridColumn>
        </Grid>
    )
}