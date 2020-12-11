import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Axios from "axios";
import { Dimmer, Loader } from "semantic-ui-react";
import NoAutorizado from "./NoAutorizado";
import Encabezado from "../Layouts/Encabezado";
import ListarNodos from "../Nodos/listarNodos";

const ValidarAutorizacion = () => {
  const { user: usuario } = useAuth0();
  const [estado, cambiarEstado] = useState({
    validado: false,
    mostrarIconoCargando: true,
  });
  useEffect(() => {
    verificarAutorizacion();
  }, []);
  const verificarAutorizacion = () => {
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

  function iconoDeCarga() {
    return (
      estado.mostrarIconoCargando === true && (
        <Dimmer active inverted>
          <Loader>Verificando Acceso...</Loader>
        </Dimmer>
      )
    );
  }
  return (
    <div>
      {iconoDeCarga()}
      {estado.validado ? <ListarNodos /> : <NoAutorizado />}
    </div>
  );
};

export default ValidarAutorizacion;
