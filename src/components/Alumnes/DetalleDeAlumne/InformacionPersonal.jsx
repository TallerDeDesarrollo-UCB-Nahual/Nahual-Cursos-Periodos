import React from "react";
import { Icon, Item, Header } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/es";
import avatarGenerico from "../../../assets/avatar-generico.png";

function convertirAMayusculas(palabras) {
  return palabras.replace(/\b\w/g, (l) => l.toUpperCase());
}

function InformacionPersonal({ alumne }) {
  moment.locale("es");
  const fecha_convertida = moment(alumne.fechaNacimiento).add('days',1).format("DD/MM/YYYY");
  return (
    <Item.Group>
      <Item>
        <Item.Image
          style={{ width: "200px", marginRight: "30px" }}
          size="medium"
          src={avatarGenerico}
        />
        <Item.Content verticalAlign="middle">
          <div style={{ textAlign: "left" }}>
            <Header as="h1">
              {convertirAMayusculas(alumne.nombre + " " + alumne.apellido)}
            </Header>
            <br />
            <Item.Description>
              <p>
                <Icon name="mail outline" /> <b>Correo: </b>
                {alumne.correo}
              </p>
              <p>
                <Icon name="call" /> <b>Teléfono: </b>
                {alumne.celular}
              </p>
              <p>
                <Icon name="calendar outline" />
                <b>Fecha de nacimiento: </b>
                {fecha_convertida}
              </p>
              <p>
                <Icon name="level up alternate" />
                <b>Nivel de inglés: </b>
                {alumne.nivelIngles}
              </p>
              <p>
                <Icon name="map marker alternate" />
                <b>Sede: </b> {alumne.sede}
              </p>
              <p>
                <Icon name="map outline" />
                <b>Nodo: </b>
                {alumne.nodo}
              </p>
            </Item.Description>
          </div>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default InformacionPersonal;
