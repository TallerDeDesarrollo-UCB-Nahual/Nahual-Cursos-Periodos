import React, { useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { crearPeriodo, obtenerPeriodoPorId } from "../../servicios/periodos";
import CrearPeriodo from "../Periodos/crearperiodo";

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
      <Header icon="plus" content="Nuevo periodo" />
      <Modal.Content>
        <CrearPeriodo
          setPeriodo={setPeriodo}
          setEstadoPeriodo={setEstadoPeriodo}
          setTopico={setTopico}
          setAnio={setAnio}
          setEnviarSolicitud={(x) => { }}
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
          <Icon name="remove" /> No
        </Button>
        <Button className="confirmButton"
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
              });
          }}
        >
          <Icon name="checkmark" /> Si
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
