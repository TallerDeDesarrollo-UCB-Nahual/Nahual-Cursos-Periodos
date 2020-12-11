import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CerrarSesion from "../Layouts/CerrarSesion";
import {
  Grid,
  Reveal,
  Image,
  Segment,
  Header,
  Icon,
  Button,
} from "semantic-ui-react";

const NoAutorizado = () => {
  const { user: usuario, logout: cerrarSesion } = useAuth0();
  return (
    <>
      <CerrarSesion />
      <Grid centered style={{ marginTop: 120 }}>
        <Reveal animated="small fade" instant>
          <Reveal.Content visible>
            <Image circular size="small" src={usuario.picture} />
          </Reveal.Content>
          <Reveal.Content hidden>
            <Image size="tiny" />
          </Reveal.Content>
        </Reveal>
      </Grid>
      <Header
        style={{ marginTop: "45px" }}
        textAlign="center"
        as="h2"
        content={usuario.name}
        subheader="No tienes acceso para ingresar a esta página"
      />
      <Segment placeholder style={{ marginLeft: 100, marginRight: 100 }}>
        <Grid columns={2} stackable textAlign="center">
          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Header icon>
                <Icon name="sign out" />
                Cambiar a una cuenta con acceso
              </Header>
              <Button onClick={() => cerrarSesion()} color="grey">
                Cerrar Sesión
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

export default NoAutorizado;
