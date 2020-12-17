import React, { useState, useEffect } from "react";
import { Button, Icon, Modal, Grid, Image } from "semantic-ui-react";
import { crearPeriodo, obtenerPeriodoPorId } from "../../servicios/periodos";
import CrearPeriodo from "../Periodos/crearperiodo";
import LogoNahual from "../../assets/logo-proyecto-nahual.webp";
import servicioNotificacion from "../../servicios/notificaciones";
import {  TextArea } from "semantic-ui-react";
import { Form, Input, Dropdown } from 'semantic-ui-react-form-validator';
import { obtenerModulos } from "../../servicios/modulos";


export default function NuevoPeriodo({
  estaAbierto,
  abierto,
  periodos,
  setPeriodos,
})

{
  function inicializar() {
    obtenerModulos()
      .then((response) => response.json())
      .then((response) => {
        setModulos(response.response);
        setTopico(response.response[0].id);
      });
  }

  const [modulos, setModulos] = useState([]);
  const [anio, setAnio] = useState(2020);
  const [periodo, setPeriodo] = useState(null);
  const [topico, setTopico] = useState(null);
  const [estadoPeriodo, setEstadoPeriodo] = useState(true);
  const [mensajeDeCierre, setMensajeDeCierre] = useState(null);
  var enviarSolicitud=false;
  useEffect(() => {
    if (enviarSolicitud === false) {
      inicializar();
    }
  }, []);
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
          setEnviarSolicitud={(x) => {}}
          enviarSolicitud={false}
          periodos = {periodos}
          estaAbierto={estaAbierto}
          setPeriodos={setPeriodos}
          
        ></CrearPeriodo> 
      </Modal.Content>
      <Modal.Actions>
      
      </Modal.Actions>
    </Modal>
  );
}
