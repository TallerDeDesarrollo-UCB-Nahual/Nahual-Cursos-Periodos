import React from "react";
import NahualLogo from "../../assets/logo-proyecto-nahual.webp";
import { Menu, Image } from "semantic-ui-react";

function Encabezado() {
  return (
    <div style={{ paddingBottom: "100px" }}>
      <Menu fixed="top" secondary style={{ borderBottom: "3px solid #81ce32" }}>
        <Menu.Item>
          <Image rounded size={"small"} src={NahualLogo} href="/" />
        </Menu.Item>
        <>
          <Menu.Item position="right" href="/nodos">
            Nodos & Sedes
          </Menu.Item>
          <Menu.Item href="/periodos">Períodos</Menu.Item>
          <Menu.Item href="/lista-Preinscriptes">Inscripción</Menu.Item>
          <Menu.Item style={{ marginRight: "50px" }} href="/alumnes">
            Alumnes
          </Menu.Item>
        </>
      </Menu>
    </div>
  );
}
export default Encabezado;
