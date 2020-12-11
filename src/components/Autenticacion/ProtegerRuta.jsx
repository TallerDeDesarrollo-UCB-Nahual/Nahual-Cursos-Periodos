import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Redirect, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ValidarInicioSesion from "./ValidarInicioSesion";

const ProtegerRuta = ({ component: Component, ...args }) => {
  const { isAuthenticated: estaAutenticado, user: usuario } = useAuth0();
  const [estado, cambiarEstado] = useState({
    validado: false,
    mostrarIconoCargando: true,
  });
  const ValidarTieneAcceso = (usuario) => {
    const SERVICIO_DE_VERIFICACION_API_SERVICIO_DE_DATOS =
      process.env.REACT_APP_SOLICITAR_ACCESO_URL;
    const datos = JSON.stringify({
      nombre: usuario.name,
      email: usuario.email,
      aplicacion: "Cursos-Periodos",
    });
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
          mostrarIconoCargando: false,
        });
      })
      .catch((error) => {
        cambiarEstado({
          mostrarIconoCargando: false,
        });
        alert("Hay un error con la base de datos, status: " + error.status);
      });
  };

  return (
    <Route
      {...args}
      render={(props) => {
        if (estaAutenticado) {
          console.log(estado.validado)
          if (estado.validado === true) {
            return <Component {...props} />;
          } else {
            ValidarTieneAcceso(usuario);
            return (
              <Redirect to = {{
                pathname: "/"
              }}/>
            )
          }
        } else {
          return <ValidarInicioSesion />;
        }
      }}
    />
  );
};

export default ProtegerRuta;
