import React, {useEffect, useState}  from "react";
import {
  useParams
} from "react-router-dom";
import YearPicker from "react-year-picker";
import styles from "./styles.module.css"
import {obtenerModulos} from "../servicios/modulos";
import {obtenerSedes} from "../servicios/sedes";
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";
import { obtenerPeriodos } from "../servicios/periodos";
import JTimepicker from 'reactjs-timepicker'

function EditarPeriodo() {
    const [modulos, setModulos] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [modalabierto, setModalabierto] = useState(false)
    const [cursos, setCusos] = useState([]);
    const { id } = useParams();
    const [periodo, setPeriodo] = useState({})
    useEffect(() => {
        obtenerModulos().then(response => response.json()).then(response => setModulos(response.response))
        obtenerSedes().then(response => response.json()).then(response => setSedes(response.response))
        obtenerPeriodos().then(response => response.json()).then(response => setPeriodo(response.response.filter(p => p.id == id)))
    }, [])
    return ( 
        <div>
            <Modal size="lg" open={modalabierto} toggle={() => setModalabierto(!modalabierto)}>
            <ModalHeader>Editar periodo</ModalHeader>
            <ModalBody>
                <div>
                    <div class="form-group">
                        <select class="form-control" value={periodo.estado ? "Activo" : "Inactivo"}>
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
                        <Button theme="success">Agregar cursos</Button>
                        <Button theme="danger" onClick={() => setModalabierto(true)}>Cancelar</Button>  
                    </div>
                </div>
            </ModalBody>
            </Modal>
            <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputCity">Año</label>
                    <input type="text" class="form-control"/>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputState">Estado</label>
                        <select class="form-control">
                            <option>Activo</option>
                            <option>Inactivo</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Topico</label>
                        <select id="inputState" class="form-control">
                            {
                                modulos.map(m => <option key={`modulo-${m.id}`} value={m.nombre}>{m.nombre}</option>)
                            }
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Año</label>
                        <YearPicker yearIsSelected={true} selected={true} className={styles.yearinput}  onChange={(x) => console.log(x)} />
                    </div>
                </div>
                <div className={'displayFlex spacedBetween'}>
                    <Button theme="success">Crear periodo</Button>
                    <Button theme="secondary" onClick={() => setModalabierto(true)}>Crear curso</Button>  
                </div>
            </form> 
        </div>
    )
}

export default EditarPeriodo;