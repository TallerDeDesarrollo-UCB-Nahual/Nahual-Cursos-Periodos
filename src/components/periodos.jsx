import React, {useEffect, useState} from "react";
import { Button } from "shards-react";
import { obtenerPeriodos } from "../servicios/periodos";
import {Link } from "react-router-dom"

export default function Periodos() {
    const [periodos, setPeriodos] = useState([])
    const [filtroEstado, setFiltroEstado] = useState(true);
    useEffect(() => {
        obtenerPeriodos().then(response => response.json()).then(response => setPeriodos(response.response))
    }, [])
    return (
        <div>
            <div className={'opcionesPeriodo'}>
                <div className={"selectBar"}>
                    <select className={"custom-select"} onChange={(x) => {setFiltroEstado(x.target.value === 'true')}}>
                        <option value={true}>Activo</option>
                        <option value={false}>Inactivo</option>
                    </select>   
                </div>

            <Link to="/formulario-registro-periodo" className={'linkElement'}>Nuevo</Link>
            </div>

            <table className={"table"}>
                    <thead className={"thead-dark"}>
                        <tr>
                        <th scope="col">Periodo</th>
                        <th scope="col">Año</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Topico</th>
                        <th scope="col"><div className={'displayFlex centered'}>Acciones</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {periodos.map(p => {
                            if (p.estado == filtroEstado){
                                return (
                                <tr key={`periodo-${p.id}`}>
                                    <td>{p.periodo}</td>
                                    <td>{p.anio}</td>
                                    <td>{p.estado ? 'Activo':'Inactivo'}</td>
                                    <td>{p.topico.nombre}</td>
                                    <td>
                                        <div className={'displayFlex centered columnGap'}>
                                                <Button theme="success">Editar</Button>
                                                <Button theme="danger">Eliminar</Button>
                                        </div>
                                    </td>
                                </tr>
                                )
                            }
                        })}
                    </tbody>
            </table>
        </div>
    )
}