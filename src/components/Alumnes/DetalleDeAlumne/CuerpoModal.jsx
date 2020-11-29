import React, { useState } from "react";
import InformacionPersonal from "./InformacionPersonal";
import LogoNahual from "../../../assets/logo-proyecto-nahual.webp";
import {
  Button,
  Modal,
  Image,
  Dropdown,
  Grid,
  Dimmer,
  Loader
} from "semantic-ui-react";
import Axios from "axios";

const CuerpoModal = ({ alumne, cerrarModal, filtrarAlumne }) => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  const iconoDeCarga = () => {
    return (
      cargando === true && (
        <Dimmer active inverted>
          <Loader inverted>Cargando</Loader>
        </Dimmer>
      )
    );
  };
  const cambiarEstadoDeInscrpte = (id) => {
    let datos = {
      estudiantes: [alumne],
      estado: id
    };
    const API_URL = process.env.REACT_APP_API_URL;
    setCargando(true);
    Axios({
      method: "post",
      url: `${API_URL}/estudiantes/cambiarEstadoAlumnes`,
      headers: { "Content-Type": "application/json" },
      data: datos
    })
      .then(() => {
        setCargando(false);
        cerrarModal();
        filtrarAlumne(alumne.id);
      })
      .catch((error) => {
        setCargando(false);
        setError(true);
      });
  };

  return (
    <>
      <Modal.Header>
        <Image src={LogoNahual} size="small" />
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid divided="vertically" centered>
          <InformacionPersonal alumne={alumne} />
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="grey" onClick={cerrarModal}>
          Cerrar
        </Button>

        <Dropdown
          text="Cambiar Estado"
          icon="exchange"
          floating
          labeled
          button
          className="icon"
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => cambiarEstadoDeInscrpte(1)}>
              Des-inscribir
            </Dropdown.Item>
            <Dropdown.Item onClick={() => cambiarEstadoDeInscrpte(6)}>
              Abandono{" "}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => cambiarEstadoDeInscrpte(4)}>
              Egreso
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Actions>
      {iconoDeCarga()}
    </>
  );
};

export default CuerpoModal;
