import React from "react";
import NahualLogo from "../../assets/logo-proyecto-nahual.webp";
import { Menu, Image } from "semantic-ui-react";

function Encabezado() {
  return (
    <div style={{paddingBottom: "100px"}}>
      <Menu fixed="top" secondary style={{borderBottom: "3px solid #81ce32"}} >
        <Menu.Item>
          <Image rounded size={"small"} src={NahualLogo} href="/" />
        </Menu.Item>
        <>
          <Menu.Item
            position="right"
            name="Nodos"
            href="/nodos"
          />
          <Menu.Item
            name="Períodos"
            href="/periodos"
          />
          <Menu.Item
            name="Inscripción"
            href="/lista-Preinscriptes"
          />
          <Menu.Item
          style={{marginRight:"50px"}}
          name='Alumnes'
          href="/alumnes"
          />
        </>
      </Menu>
    </div>
  );
}
export default Encabezado;
