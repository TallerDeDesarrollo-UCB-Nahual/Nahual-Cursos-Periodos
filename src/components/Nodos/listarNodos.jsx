import React, { Component } from "react";
import { Table, Icon } from 'semantic-ui-react'
import { obtenerNodos } from "../../servicios/nodos";
import styles from "../styles.module.css";
import ListaSedes from "./listaSedes";
import CrearNodo from "./crearNodo";
import CrearSede from "./crearSede";

export class ListarNodos extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            nodos: []
        }
      }
    
    componentDidMount(){
        obtenerNodos().then(response => response.json()).then(response => {
            var datos = response.response;
            this.setState({open: false, nodos: datos})});
    }
    render() {
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
                        {this.state.nodos.map(nodo => {
                            return (
                                <Table.Row key={`nodo-${nodo.id}`}>
                                    <Table.Cell>
                                        {nodo.nombre}
                                        <div align="right">
                                            {/* al hacer click en estos iconos se deberia agregar sedes y editar nodos */}
                                            <CrearSede open={false} nodoId={nodo.id} nodoNombre={nodo.nombre} />
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
                <CrearNodo open={false} />
            </div >
        )
    }
}

export default ListarNodos

