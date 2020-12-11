import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Header, Icon, Segment, Button } from "semantic-ui-react";
import Navbar from "../Layouts/Encabezado";

const IniciarSesion = () => {
  const { loginWithRedirect: iniciarSesion } = useAuth0();
  return (
    <>
      <Navbar />
      <Segment vertical textAlign="center" style={{ marginTop: "20vh" }}>
        <Header icon textAlign="center" size="huge">
          <Icon name="hand point down outline" />
          ¡Bienvenido!
          <Header.Subheader>
            Para continuar debe iniciar sesión.
          </Header.Subheader>
        </Header>
        <Button
          size="big"
          style={{ marginTop: "30px", backgroundColor: "#87D734" }}
          onClick={() => iniciarSesion()}
        >
          Iniciar Sesión
          <Icon name="right arrow" />
        </Button>
      </Segment>
    </>
  );
};

export default IniciarSesion;
