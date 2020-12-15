import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ValidarAutorizacion from "./ValidarAutorizacion";
import IniciarSesion from "./IniciarSesion";

const ValidarInicioSesion = () => {
  const { isAuthenticated: estaAutenticado } = useAuth0();
  return estaAutenticado ? <ValidarAutorizacion /> : <IniciarSesion />;
};

export default ValidarInicioSesion;
