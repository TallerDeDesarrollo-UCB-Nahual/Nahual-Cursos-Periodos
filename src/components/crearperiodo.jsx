import React, {useEffect, useState} from "react";
import YearPicker from "react-year-picker";
import styles from "./styles.module.css";
import {obtenerModulos} from "../servicios/modulos";
import {obtenerSedes} from "../servicios/sedes";
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";
import JTimepicker from 'reactjs-timepicker';
import {Card, Container, Row, Col } from "shards-react";


export default function NuevoPeriodo() {
    const [modulos, setModulos] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [modalabierto, setModalabierto] = useState(false)
    const [cursos, setCusos] = useState([]);
    useEffect(() => {
        obtenerModulos().then(response => response.json()).then(response => setModulos(response.response))
        obtenerSedes().then(response => response.json()).then(response => setSedes(response.response))
    }, [])
    return ( 

        
        
        <div >
            <Modal size="lg" open={modalabierto} toggle={() => setModalabierto(!modalabierto)}>
            <ModalHeader>Nuevo curso</ModalHeader>
            <ModalBody>
                <div>
                    <div class="form-group">
                        <select class="form-control">
                            {
                                sedes.map(s =>  <option key={`sede-${s.id}`}>{s.nombre} - {s.nodo.nombre}</option>)
                            }
                            <option>Activo</option>
                            <option>Inactivo</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="inputCity">Inicio</label>
                        <JTimepicker
                            onChange={console.log}
                            color={"#81ce32"}
                        />
                        </div>
                        <div class="form-group col-md-6">
                        <label for="inputCity">Inicio</label>
                            <JTimepicker
                                onChange={console.log}
                                color={"#81ce32"}
                            />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label>Notas</label>
                        <input type="text" class="form-control" />
                        </div>
                        <div class="form-group col-md-6">
                        <label>Profesor</label>
                        <input type="text" class="form-control" />
                        </div>
                    </div>
                    <div className={'displayFlex spacedBetween'}>
                        <Button theme="success">Crear curso</Button>
                        <Button theme="danger" onClick={() => setModalabierto(true)}>Cancelar</Button>  
                    </div>
                </div>
            </ModalBody>
            </Modal>
            <Container className="dr-example-container" class="dr-example-container">
            <form>
                
                <div class="form-row">
                    <div class="form-group col-md-12">
                    <label for="inputCity">Año</label>
                    <input type="text" class="form-control"/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="inputState">Estado</label>
                        <select class="form-control">
                            <option>Activo</option>
                            <option>Inactivo</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label>Topico</label>
                        <select id="inputState" class="form-control">
                            {
                                modulos.map(m => <option key={`modulo-${m.id}`} value={m.nombre}>{m.nombre}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label>Año</label>
                        <YearPicker className={styles.yearinput} onChange={(x) => console.log(x)} />
                    </div>
                </div>
                <div className={'displayFlex spacedBetween'}>
                    <Button theme="success">Crear periodo</Button>
                    <Button theme="secondary" onClick={() => setModalabierto(true)}>Nuevo curso</Button>  
                </div>
            </form> 
            </Container>
            
        </div>


    )
}