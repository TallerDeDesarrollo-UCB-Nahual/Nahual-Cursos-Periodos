import React from "react";
import NahualLogo from "../../assets/logo-proyecto-nahual.webp";

import { Container, Image, List, Segment } from "semantic-ui-react";

const PieDePagina = (props) => {
  return (
    <Segment
      inverted
      vertical
      style={{ margin: "20em 0em 0em", padding: "2em 0em" }}
    >
      <Container textAlign="center">
        <Image centered size="small" src={NahualLogo} />
        <a style={{color:"grey"}} href="https://www.nahual.com.ar/">www.nahual.com.ar</a>
      </Container>
    </Segment>
  );
};

PieDePagina.propTypes = {};

export default PieDePagina;
