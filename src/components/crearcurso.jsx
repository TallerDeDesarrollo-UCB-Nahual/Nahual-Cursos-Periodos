import React, {useEffect, useState} from "react";
import { Button, Modal, Form } from 'semantic-ui-react'
import {obtenerSedes} from "../servicios/sedes"
import JTimepicker from 'reactjs-timepicker'

export default function CrearCurso({aceptar, estaAbierto, setAbierto}) {
    const [sedes, setSedes] = useState([]);
    const [horaFin, setHoraFin] = useState("00:00")
    const [horaInicio, setHoraInicio] = useState("00:00");
    const [sedeNodo, setSedeNodo] = useState(null)
    const [nota, setNota] = useState("");
    const [profesor, setProfesor] = useState("")
    function inicializarSedes () {
        obtenerSedes().then(response => response.json()).then(response => {
            setSedes(response.response)
            setSedeNodo({"SedeId": response.response[0].id, "NodoId": response.response[0].NodoId})
        })
    }

    function resetValores() {
        setHoraInicio("00:00")
        setHoraFin("00:00")
        inicializarSedes()
        setNota("");
        setProfesor("");
        setAbierto(!estaAbierto);
    }
    useEffect(()=>{
        inicializarSedes();
    }, [])
    return (            
        <Modal open={estaAbierto} onClose={() => setAbierto(!estaAbierto)}>
            <Modal.Header>Nuevo curso</Modal.Header>
            <Modal.Content>
                <div>
                    <div class="form-group">
                        <Form.Select fluid label="Sede - Nodo"
                        options={sedes.map(s => {
                            return {
                                key: `sede-${s.id}`,
                                value: [s.nodo.id, s.id],
                                text: s.nombre + " - " + s.nodo.nombre
                            }
                        })}
                        onChange={(e, data) =>{
                            const selected = data.value
                            setSedeNodo({"SedeId": selected[1], "NodoId": selected[0]})
                        } 
                        }/>
                    </div>
                    <div class="fullHeight forceFlex columnGap">
                        <div className={"dosentradasformulario"}>
                            <label>Inicio</label>
                            <JTimepicker
                                onChange={setHoraInicio}
                                color={"#81ce32"}
                            />
                        </div>
                        <div className={"dosentradasformulario"}>
                            <label>Fin</label>
                            <JTimepicker
                                onChange={setHoraFin}
                                color={"#81ce32"}
                            />
                        </div>
                    </div>
                    <div class="forceFlex columnGap">
                        <div className={"dosentradasformulario"}>
                            <Form.Input label="Notas" fluid type="text" class="form-control" onChange={(x, data) => setNota(data.value)} />
                        </div>
                        <div className={"dosentradasformulario"}>
                            <Form.Input label="Profesor" fluid type="text" class="form-control" onChange={(x, data) => setProfesor(data.value)} />
                        </div>
                    </div>
                    <br/>
                    <Modal.Actions>
                        <div className={'displayFlex spacedBetween'}>
                            <Button color="green" onClick={()=> {
                                aceptar(
                                    {
                                        horarioInicio: horaInicio,
                                        horarioFin: horaFin,
                                        ...sedeNodo,
                                        notas: nota,
                                        profesores: profesor
                                    }
                                )
                                resetValores()
                            }
                            }>Crear curso</Button>
                            <Button theme="danger" onClick={() => {
                                resetValores()
                                setAbierto(!estaAbierto)
                                }}>Cancelar</Button>  
                        </div>
                    </Modal.Actions>
                </div>
            </Modal.Content>
        </Modal>)
}