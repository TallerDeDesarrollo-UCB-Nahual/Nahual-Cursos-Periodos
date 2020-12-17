import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import { Button, Icon, Modal, Grid, Image } from "semantic-ui-react";

import { obtenerModulos } from "../../servicios/modulos";
import { TextArea } from "semantic-ui-react";
import { Form, Dropdown, Input } from 'semantic-ui-react-form-validator';


import { crearPeriodo, obtenerPeriodoPorId } from "../../servicios/periodos";
import servicioNotificacion from "../../servicios/notificaciones";


export default function CrearPeriodo({
  estaAbierto,
  periodos,
  setPeriodos,
  enviarSolicitud,
}) {

  const [modulos, setModulos] = useState([]);
  const [anio, setAnio] = useState(2020);
  const [periodo, setPeriodo] = useState(null);
  const [topico, setTopico] = useState(null);
  const [estadoPeriodo, setEstadoPeriodo] = useState(true);
  const [mensajeDeCierre, setMensajeDeCierre] = useState(null);

  function inicializar() {
    obtenerModulos()
      .then((response) => response.json())
      .then((response) => {
        setModulos(response.response);
        setTopico(response.response[0].id);
      });
  }
  useEffect(() => {
    if (enviarSolicitud === false) {
      inicializar();
    }
  }, []);
  const formulariodeperiodos = (
    <div>
      <div>
        <Form className="ui form">
          <Input
            label="Periodo"
            id='periodo'
            fluid
            type="text"
            width={16}
            value={periodo}
            validators={['required']}
            errorMessages={['Este campo es requerido']}
            onChange={(e, data) => setPeriodo(data.value)}
          />
          <Dropdown
            id="inputState"
            label="Topico"
            fluid
            width={16}
            value={topico}
            validators={['required']}
            errorMessages={['Este campo es requerido']}
            placeholder="Topico"

            options={modulos.map((m) => {
              return {
                key: `modulo-${m.id}`,
                value: m.id,
                text: m.nombre,
              };
            })}
            onChange={(e, data) => setTopico(data.value)}
          />
          <Dropdown
            label="Estado"
            fluid
            width={16}
            value={estadoPeriodo}
            validators={['required']}
            errorMessages={['Este campo es requerido']}
            placeholder="Estado"
            options={[
              { key: "activo1", value: true, text: "Activo" },
              { key: "inactivo1", value: false, text: "Inactivo" },
            ]}
            className={"form-control"}
            onChange={(e, data) => setEstadoPeriodo(data.value)}
          />
          <Input
            label="Año"
            type="number"
            fluid
            width={16}
            value={anio}
            validators={['required']}
            errorMessages={['Este campo es requerido']}
            className={"form-control"}
            onChange={(x, data) => setAnio(parseInt(data.value))}
          />
          <Input
            label="Mensaje"
            fluid
            width={16}
            type="text"
            value={mensajeDeCierre}
            validators={['required']}
            errorMessages={['Este campo es requerido']}
            class="form-control"
            control={TextArea}
            onChange={(x, data) => setMensajeDeCierre(data.value)}
          />

          <Button className="cancelButton" onClick={() => estaAbierto(false)}>
            Cancelar <Icon name="remove" style={{ margin: "0 0 0 10px" }} />
          </Button>
          <Button
            className="confirmButton"
            onClick={() => {
              crearPeriodo({
                anio: anio,
                periodo: periodo,
                estado: estadoPeriodo,
                TopicoId: parseInt(topico),
                mensajeDeCierre: mensajeDeCierre,
              })
                .then((x) => {
                  return x.data;
                })
                .then((x) => {
                  return x.result;
                })
                .then((x) => {
                  return obtenerPeriodoPorId(x.id);
                })
                .then((x) => {
                  return x.data.response;
                })
                .then((x) => {
                  setPeriodos([...periodos, x]);
                  estaAbierto(false);
                  servicioNotificacion.mostrarMensajeExito(
                    "Periodo creado con éxito",
                    `Se creó el periodo ${x.periodo}`
                  );
                });
            }}
          >
            Crear <Icon name="checkmark" style={{ margin: "0 0 0 10px" }} />
          </Button>
        </Form>
      </div>
    </div>
  );
  return (
    <div>
      {enviarSolicitud ? (
        <div className={styles.loading}>
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
        </div>
      ) : (
          formulariodeperiodos
        )}
    </div>
  );
}
