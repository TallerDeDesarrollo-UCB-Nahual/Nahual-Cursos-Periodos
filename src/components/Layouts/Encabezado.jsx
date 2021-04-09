import React from "react";
import NahualLogo from "../../assets/logo-proyecto-nahual.webp";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

function Encabezado() {
  const {
    user: usuario,
    isAuthenticated: estaAutenticado,
    logout: cerrarSesion,
  } = useAuth0();
  return (
    <div style={{ paddingBottom: "100px" }}>
      <Menu
        fixed="top"
        secondary
        style={{ borderBottom: "3px solid #81ce32", backgroundColor: "white" }}
      >
        <Menu.Item>
          <Image rounded size={"small"} src={NahualLogo} href="/nodos" />
        </Menu.Item>
        <>
          {estaAutenticado && (
            <>
              <Menu.Item position="right">
                {" "}
                <NavLink
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#81ce32",
                  }}
                  style={{ color: "black" }}
                  to="/nodos"
                >
                  Nodos & Sedes
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                {" "}
                <NavLink
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#81ce32",
                  }}
                  style={{ color: "black" }}
                  to="/periodos"
                >
                  Periodos
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                {" "}
                <NavLink
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#81ce32",
                  }}
                  style={{ color: "black" }}
                  to="/lista-Preinscriptes"
                >
                  Inscripción
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                {" "}
                <NavLink
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#81ce32",
                  }}
                  style={{ color: "black" }}
                  to="/alumnes"
                >
                  Alumnes
                </NavLink>
              </Menu.Item>

              <Menu.Item style={{ marginRight: "50px" }}>
                {" "}
                <NavLink
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#81ce32",
                  }}
                  style={{ color: "black" }}
                  to="/topicos"
                >
                  Topicos
                </NavLink>
              </Menu.Item>

              <Menu.Item position="right">
                <Dropdown
                  trigger={
                    <span>
                      <Image src={usuario.picture} avatar />
                      {usuario.name}
                    </span>
                  }
                  options={[
                    {
                      key: "cerrar-sesion",
                      text: "Cerrar Sesión",
                      icon: "sign out",
                    },
                  ]}
                  pointing="top left"
                  onChange={() => cerrarSesion()}
                />
              </Menu.Item>
            </>
          )}
        </>
      </Menu>
    </div>
  );
}
export default Encabezado;
