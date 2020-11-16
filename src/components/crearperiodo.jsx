import React, {useEffect, useState} from "react";
import styles from "./styles.module.css"
import {obtenerModulos} from "../servicios/modulos";
import { Button } from "shards-react";
import CrearCurso from "./crearcurso";
import {useHistory} from "react-router-dom"
import { crearPeriodo } from "../servicios/periodos";
import { crearCurso, obtenerCursos } from "../servicios/cursos";


export default function NuevoPeriodo() {
    const [modulos, setModulos] = useState([]);
    const [modalabierto, setModalabierto] = useState(false)
    const [cursos, setCursos] = useState([]);
    const [anio, setAnio] = useState(2020);
    const [periodo, setPeriodo] = useState(null);
    const [topico, setTopico] = useState(null)
    const [estadoPeriodo, setEstadoPeriodo] = useState(true);
    const [enviandSolicitud, setEnviandSolicitud] = useState(false);
    const history = useHistory();
    function resetValores(){
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
            <div>
                <div className={"form-row"}>
                    <div className={"form-group col-md-6"}>
                    <label>Nombre del periodo</label>
                    <input type="text" className={"form-control"} onChange={(e) => setPeriodo(e.target.value)} />
                    </div>
                    <div className={"form-group col-md-6"}>
                        <label >Estado</label>
                        <select className={"form-control"} onChange={(e) => setEstadoPeriodo(e.target.value)}>
                            <option value={true}>Activo</option>
                            <option value={false}>Inactivo</option>
                        </select>
                    </div>
                </div>
                <div className={"form-row"}>
                    <div className={"form-group col-md-6"}>
                        <label>Topico</label>
                        <select id="inputState" className={"form-control"} onChange={(e) => setTopico(e.target.value)}>
                            {
                                modulos.map(m => <option key={`modulo-${m.id}`} value={m.id}>{m.nombre}</option>)
                            }
                        </select>
                    </div>
                    <div className={"form-group col-md-6"}>
                        <label>Año</label>
                        <input type="number" onChange={(x) => setAnio(parseInt(x.target.value))} />
                    </div>
                </div>
                <div className={'displayFlex spacedBetween'}>
                    <Button theme="success" onClick={() => {
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
                                crearCurso(c).then(x => console.log(x)).catch(() => setEnviandSolicitud(false))
                            })
                        }).then(() => {
                            history.push("/periodos")
                            setEnviandSolicitud(false)
                        }).catch(() => {
                            setEnviandSolicitud(false)
                        })
                    }}>Crear periodo</Button>
                    <Button theme="secondary" onClick={() => setModalabierto(true)}>Nuevo cursos</Button>  
                </div>
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
