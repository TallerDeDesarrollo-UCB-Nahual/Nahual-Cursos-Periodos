import React, { useState, useEffect } from "react";
import { Button, Icon, Modal, Grid, Image, Form, Input } from "semantic-ui-react";
import LogoNahual from "../../assets/logo-proyecto-nahual.webp";
import {editarTopico} from './../../servicios/topicos';
import servicioNotificacion from "../../servicios/notificaciones";

export default function EditAlum({id,nombre,apellido,correo,celular,isOpenModal,
    setIsOpenModal}) {

   const [id, setId] = useState(id);
   const [nombre, setNombre] = useState(nombre);
   const [apellido, setApellido] = useState(apellido);
   const [correo, setCorreo] = useState(correo);
   const [celular, setCelular] = useState(celular);
   const [fechaNacimiento, setFechaNacimiento] = useState("");


    return (
        <Modal
            closeIcon
            open={isOpenModal}
            onClose={() => {setIsOpenModal(false);}}
            onOpen={() => {}}
        >
            <Modal.Header>
            <Grid columns="equal">
          <Grid.Column>
            <Image src={LogoNahual} size="small" />
          </Grid.Column>
          <Grid.Column>Fecha</Grid.Column>
        </Grid>
            </Modal.Header>
            <Modal.Content>
            <Grid divided='vertically' stackable columns={2}>
                    <Grid.Row >
                        {
                            <span className="etiquetas"  >
                            <label htmlFor="fechaNacimiento">Fecha de Nacimiento (dd/mm/aaaa)</label>
                            <div style={{ margin: "0px 12%" }}>
                            <DatePicker
                                dateFormat={"dd/MM/yyyy"}
                                selected={this.obtenerNuevaFecha()}
                                onChange={this.editarFecha} />
                            </div>
                        </span>
                        }
                
                    </Grid.Row >

                <Button className="cancelButton" style={{ margin: "20px 0 0 10px" }} onClick={() => {setIsOpenModal(false);}}>
                    Cancelar <Icon name="remove" style={{ margin: "0 0 0 10px" }} />
                </Button>
                <Button style={{ margin: "20px 0 0 10px" }}
                    className="confirmButton"
                    onClick={() => {}}
                >
                    Crear <Icon name="checkmark" style={{ margin: "0 0 0 10px" }} />
                </Button>
                </Grid>

            </Modal.Content>
            <Modal.Actions>
            
            </Modal.Actions>
        </Modal>
  );
    
}
