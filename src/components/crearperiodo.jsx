import React, {useEffect, useState} from "react";
import styles from "./styles.module.css"
import {obtenerModulos} from "../servicios/modulos";
import { Container, Button, Form, ButtonGroup } from 'semantic-ui-react'
import CrearCurso from "./crearcurso";
import {useHistory} from "react-router-dom"
import { crearPeriodo } from "../servicios/periodos";
import { crearCurso } from "../servicios/cursos";
import ListaCursosACrear from "./listaCursosACrear";

export default function NuevoPeriodo() {
    const [modulos, setModulos] = useState([]);
    const [modalabierto, setModalabierto] = useState(false)
    const [cursos, setCursos] = useState([]);
    const [anio, setAnio] = useState(2020);
    const [periodo, setPeriodo] = useState(null);
    const [topico, setTopico] = useState(null)
    const [estadoPeriodo, setEstadoPeriodo] = useState(true);
    const [enviandSolicitud, setEnviandSolicitud] = useState(false);
    const [mostrarListaCursosAGuardar, setMostrarListaCursosAGuardar] = useState(false);
    const history = useHistory();
    function resetValores() {
        setAnio(null);
        setPeriodo(2020);
        setAnio(null);
    }
    function inicializar() {
        obtenerModulos().then(response => response.json()).then(response => {
            setModulos(response.response)
            setTopico(response.response[0].id)
        })
    }
    useEffect(() => {
        if(enviandSolicitud === false) {
            inicializar()
        }
    }, [])
    const formulariodeperiodos = <div>
        <CrearCurso aceptar={(element) => {
                setCursos([...cursos, element])
            }} estaAbierto={modalabierto} setAbierto={setModalabierto}/>
            
        <ListaCursosACrear cursos={cursos} estaAbierto={mostrarListaCursosAGuardar} setAbierto={setMostrarListaCursosAGuardar} />
        
            <div>            
                <Container>
                    <Form.Input label="Periodo" fluid type="text"onChange={(e, data) => setPeriodo(data.value)} />
                    <br/>
                    <Form.Select id="inputState" label="Topico" fluid
                    options={modulos.map(m => {
                        return {
                            key: `modulo-${m.id}`,
                            value: m.id,
                            text: m.nombre
                        }
                    })
                    }
                    onChange={(e, data) => setTopico(data.value)}/>
                    <br/>
                    <Form.Select label="Estado" fluid
                        options={[{key: "activo1", value: true, text: "Activo"}, {key: "inactivo1", value: false, text: "Inactivo"}]}
                        className={"form-control"} onChange={(e, data) => setEstadoPeriodo(data.value)}/>
                    <br/>
                    <Form.Input label="Año" type="number" fluid className={"form-control"} onChange={(x, data) => setAnio(parseInt(data.value))} />
                    <br/>
                    <div className={"actionsCrearPeriodo"}>
                        <ButtonGroup>
                            <Button color="green" onClick={() => {
                                    setEnviandSolicitud(true)
                                    crearPeriodo({
                                                anio: anio,
                                                periodo: periodo,
                                                estado: estadoPeriodo,
                                                TopicoId: parseInt(topico)
                                                })
                                    .then(response => {
                                        return cursos.forEach(c => {
                                            c.PeriodoId = response.data.result.id;
                                            crearCurso(c).then(() => {}).catch(() => setEnviandSolicitud(false))
                                        })
                                    }).then(() => {
                                        history.push("/periodos")
                                        setEnviandSolicitud(false)
                                    }).catch(() => {
                                        setEnviandSolicitud(false)
                                    })
                                }}>Crear periodo</Button>
                                <Button color="red" onClick={() => history.push("/periodos")} >Cancelar</Button>
                        </ButtonGroup>
                        <Button.Group>
                            <Button color="green" onClick={() => setModalabierto(true)}>Nuevo cursos</Button> 
                            <Button color="blue" onClick={() => {
                                setMostrarListaCursosAGuardar(true)
                                }}>Ver {cursos.length} cursos</Button>
                        </Button.Group>
                    </div>
                    
                </Container>
            </div> 
        </div>
    return ( 
        <div>
            {enviandSolicitud ? <div className={styles.loading}>
                <div className={styles.elementsloading}>
                    <div className={styles.loadingdots}>
                        <div className={"spinner-grow text-secondary"} role="status">
                            <span className={"sr-only"}>Loading...</span>
                        </div>
                        <div className={"spinner-grow text-success"} role="status">
                            <span className={"sr-only"}>Loading...</span>
                        </div>
                    </div>
                    <div>
                        <h5>Creando Periodo</h5>
                    </div>
                </div>
            </div> : formulariodeperiodos}
        </div>
    )
}
