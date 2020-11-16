import React, {useEffect, useState} from "react";
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";
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
        <Modal size="lg" open={estaAbierto} toggle={() => setAbierto(!estaAbierto)}>
            <ModalHeader>Nuevo curso</ModalHeader>
            <ModalBody>
                <div>
                    <div class="form-group">
                        <select class="form-control" onChange={(e) =>{
                            const selected = e.target.value.split(",");
                            setSedeNodo({"SedeId": selected[1], "NodoId": selected[0]})
                        } 
                        }>
                            {
                                sedes.map(s =>  <option key={`sede-${s.id}`} value={[s.nodo.id, s.id]}>{s.nombre} - {s.nodo.nombre}</option>)
                            }11
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label>Inicio</label>
                        <JTimepicker
                            onChange={setHoraInicio}
                            color={"#81ce32"}
                        />
                        </div>
                        <div class="form-group col-md-6">
                        <label>Fin</label>
                            <JTimepicker
                                onChange={setHoraFin}
                                color={"#81ce32"}
                            />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label>Notas</label>
                        <input type="text" class="form-control" onChange={x => setNota(x.target.value)} />
                        </div>
                        <div class="form-group col-md-6">
                        <label>Profesor</label>
                        <input type="text" class="form-control" onChange={x => setProfesor(x.target.value)} />
                        </div>
                    </div>
                    <div className={'displayFlex spacedBetween'}>
                        <Button theme="danger" onClick={() => {
                            resetValores()
                            setAbierto(!estaAbierto)
                            }}>Cancelar</Button>  
                        <Button theme="success" onClick={()=> {
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
                        
                    </div>
                </div>
            </ModalBody>
        </Modal>)
}