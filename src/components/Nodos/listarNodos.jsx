import React, { useEffect, useState } from "react";
import { Table, Icon } from 'semantic-ui-react'
import { obtenerNodos, obtenerSedesPorIdNodo } from "../../servicios/nodos";
import styles from "../styles.module.css";



export default function ListarNodos() {

    const [nodos, setNodos] = useState([]);
    const [sedes, setSedes] = useState([]);

    useEffect(() => {
        obtenerNodos().then(
            response => response.json()
            ).then(
                response => 
                setNodos(response.response)
            )
    }, [])
    return (
        <div className={styles.vistaPeriodos}>

            <h1>Periodos</h1>

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
                            <Table.Row key={`periodo-${nodo.id}`}>
                                <Table.Cell>
                                    {nodo.nombre}
                                    <div align="right">
                                        {/* al hacer click en estos iconos se deberia agregar sedes y editar nodos */}
                                        <Icon color='olive' name='add circle' />
                                        <Icon color='olive' name='edit' />
                                    </div>
                                </Table.Cell>
                                <Table.Cell verticalAlign='top'>
                                    {obtenerSedesPorIdNodo(nodo.id).then(sedeNodo => {
                                        return sedeNodo.json()
                                    }).then(sedeNodo => {
                                        setSedes(sedeNodo.response)
                                    })
                                    }
                                    <ul>{
                                       sedes.map(sede => {
                                        return(
                     
                                            <l1>{sede.nombre}</l1>
                                        )
                                    })
                                }</ul>
                                    {/* <div className={'displayFlex centered columnGap'}>
                                        <Button color="green" onClick={x => {
                                            obtenerCursosPorIdPeriodo(nodo.id).then(cursoperiodo => {
                                                return cursoperiodo.json()
                                            }).then(cursoperiodo => {
                                                setCursosAMostrar(cursoperiodo.response)
                                                setInformacionListaCursos(true)
                                                setIdPeriodo(p.id);
                                            })
                                        }} >Ver cursos</Button>
                                        <Eliminar egresadeId={p.id}></Eliminar>
                                    </div> */}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}