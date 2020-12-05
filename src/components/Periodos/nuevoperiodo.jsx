import React, { useState } from "react";
import { Button, Icon, Modal, Grid, Image } from "semantic-ui-react";
import { crearPeriodo, obtenerPeriodoPorId } from "../../servicios/periodos";
import CrearPeriodo from "../Periodos/crearperiodo";
import LogoNahual from "../../assets/logo-proyecto-nahual.webp";
import servicioNotificacion from "../../servicios/notificaciones";

export default function NuevoPeriodo({
  estaAbierto,
  abierto,
  periodos,
  setPeriodos,
}) {
  const [modulos, setModulos] = useState([]);
  const [anio, setAnio] = useState(2020);
  const [periodo, setPeriodo] = useState(null);
  const [topico, setTopico] = useState(null);
  const [estadoPeriodo, setEstadoPeriodo] = useState(true);
  return (
    <Modal
      closeIcon
      open={abierto}
      onClose={() => estaAbierto(false)}
      onOpen={() => estaAbierto(true)}
    >
      <Modal.Header>
        <Grid columns="equal">
          <Grid.Column>
            <Image src={LogoNahual} size="small" />
          </Grid.Column>
          <Grid.Column>Nuevo Periodo</Grid.Column>
        </Grid>
      </Modal.Header>
      <Modal.Content>
        <CrearPeriodo
          setPeriodo={setPeriodo}
          setEstadoPeriodo={setEstadoPeriodo}
          setTopico={setTopico}
          setAnio={setAnio}
          setEnviarSolicitud={(x) => {}}
          enviarSolicitud={false}
          anio={anio}
          periodo={periodo}
          topico={topico}
          estadoPeriodo={estadoPeriodo}
          modulos={modulos}
          setModulos={setModulos}
        ></CrearPeriodo>
      </Modal.Content>
      <Modal.Actions>
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
                  "Periodo creado con exito",
                  `Se creo el periodo ${x.periodo}`
                );
              });
          }}
        >
          Crear <Icon name="checkmark" style={{ margin: "0 0 0 10px" }} />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
