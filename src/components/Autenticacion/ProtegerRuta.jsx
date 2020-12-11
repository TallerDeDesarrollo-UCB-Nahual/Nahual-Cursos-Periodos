import React, { useState } from "react";
import Axios from "axios";
import { Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ValidarInicioSesion from "./ValidarInicioSesion";

const ProtegerRuta = ({ component: Component, ...args }) => {
  const INTENTOS_MAXIMOS_LOGIN = 4;
  const { isAuthenticated: estaAutenticado, user: usuario } = useAuth0();
  const [estado, cambiarEstado] = useState({
    validado: false,
    intentosIniciarSesion: 0,
  });

  const ValidarTieneAcceso = () => {
    const SERVICIO_DE_VERIFICACION_API_SERVICIO_DE_DATOS =
      process.env.REACT_APP_SOLICITAR_ACCESO_URL;
    const datos = JSON.stringify({
      nombre: usuario.name,
      email: usuario.email,
      aplicacion: "Cursos-Periodos",
    });
    if (estado.intentosIniciarSesion <= INTENTOS_MAXIMOS_LOGIN) {
      Axios.post(
        `${SERVICIO_DE_VERIFICACION_API_SERVICIO_DE_DATOS}verificarAcceso`,
        datos,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((respuesta) => {
          cambiarEstado({
            validado: respuesta.data.data,
          });
        })
        .catch((error) => {
          cambiarEstado({
            intentosIniciarSesion: estado.intentosIniciarSesion + 1,
          });
          alert("Hay un error con la base de datos, status: " + error.status);
        });
    }
  };

  return (
    <Route
      {...args}
      render={(props) => {
        if (estaAutenticado) {
          if (estado.validado === true) {
            return <Component {...props} />;
          } else {
            ValidarTieneAcceso();
            return <ValidarInicioSesion />;
          }
        } else {
          return <ValidarInicioSesion />;
        }
      }}
    />
  );
};

export default ProtegerRuta;
