import React from "react";
import { Icon, Item, Header } from "semantic-ui-react";
import moment from 'moment';
import 'moment/locale/es';
import avatarGenerico from '../../assets/avatar-generico.png'

function convertirAMayusculas(str) {
  return str.replace(/\b\w/g, l => l.toUpperCase())
}

function Preinscripte({ preinscripte }) {
  moment.locale('es');
  const fechaConvertida = moment(preinscripte.fechaNacimiento).format('DD/MM/yyyy');
  return (
    <Item.Group>
      <Item>
        <Item.Image style={{ width: "200px", marginRight : "30px" }}
          size='medium'
          src={avatarGenerico}
        />
        <Item.Content verticalAlign='middle'>
            <div style={{ textAlign: "left" }}>
              <Header as='h1'> {convertirAMayusculas(`${preinscripte.nombre} ${preinscripte.apellido}`)} </Header><br />
              <Item.Description>
                <p> <Icon name='graduation' /> <b>Curso de Interes: </b>{preinscripte.modulo}</p>
                <p> <Icon name='mail outline' /> <b>Correo: </b>{preinscripte.correo}</p>
                <p> <Icon name='call' /> <b>Teléfono: </b>{preinscripte.celular}</p>
                <p> <Icon name='calendar outline' /><b>Fecha de nacimiento: </b>{fechaConvertida}</p>
                <p> <Icon name='map marker alternate'/><b>Zona de Residencia: </b> {preinscripte.zona}</p>
                <p> <Icon name='map marker alternate'/><b>Nodo: </b> {preinscripte.nodo}</p>
              </Item.Description>
            </div>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default Preinscripte;
