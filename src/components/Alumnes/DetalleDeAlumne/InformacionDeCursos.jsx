import React from "react";
import { Icon, Grid, Header } from "semantic-ui-react";
import Curso from "./Curso";

function InformacionDeCursos({ egresade }) {
  return (
    <Grid.Row>
      <Grid.Column>
        <Header as='h3'> <Icon name='graduation' />Cursos Realizados</Header>
        <Grid>
          <Grid.Row>
            <Curso egresade={egresade} />
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  );
}

export default InformacionDeCursos;
