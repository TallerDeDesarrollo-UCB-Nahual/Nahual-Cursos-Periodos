import React from "react";
import NahualLogo from "../../assets/logo-proyecto-nahual.webp";

import { Container, Image, List, Segment } from "semantic-ui-react";

const PieDePagina = (props) => {
  return (
    <Segment
      inverted
      vertical
      style={{ margin: "20em 0em 0em", padding: "3em 0em" }}
    >
      <Container textAlign="center">
        <Image centered size="small" src={NahualLogo} />
        <List horizontal divided link size="small">
          <List.Item as="a" href="https://www.nahual.com.ar/">
            Nahual Argentina
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
};

PieDePagina.propTypes = {};

export default PieDePagina;
