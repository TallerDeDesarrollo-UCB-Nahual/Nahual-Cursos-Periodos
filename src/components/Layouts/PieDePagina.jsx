import React from "react";
import NahualLogo from "../../assets/logo-proyecto-nahual.webp";

import { Container, Image, List, Segment } from "semantic-ui-react";

const PieDePagina = () => {
  return (
    <div style={{ position:"fixed" , width:"100%", bottom:0}}>
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
    </div>
  );
};

export default PieDePagina;
