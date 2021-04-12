import React, { Component, Fragment } from 'react'
import { Button, Image, Modal, Grid, Segment, Loader, Dimmer, Icon, Input , GridRow, Confirm, ModalContent } from 'semantic-ui-react';
import { Form, Dropdown } from 'semantic-ui-react-form-validator';
import styles from "../styles.module.css";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import BASE_ROUTE from "../../servicios/rutas";

import { MensajeResultante } from './tipoDeMensaje/MensajeResultante.jsx';


export class EditarAlumne extends Component {
  constructor(props) {
      super(props);
      this.state = {
          open: false,
          alumne: {
            id: this.props.id,
            nombre: props.nombre,
            apellido: props.apellido,
            correo: props.correo,
            celular: props.celular,
            fechaNacimiento: '',
    
          },
      };
  }

  abrirModal(estado) {
    this.setState({
        open: estado
    });
}
  enCambio = (event) => {
    let nombre = event.target.name;
    let valor = event.target.value;
    let estadoDepurado = this.state.alumne;
    delete estadoDepurado[`${nombre}`];
    let nuevoEstado = { ...estadoDepurado, [`${nombre}`]: valor };
    this.setState({ alumne: nuevoEstado },()=>{});
  }

  obtenerFechaNacimiento(egresade) {
    if (egresade.fechaNacimiento === new Date().toISOString().split('T')[0]) {
      egresade.fechaNacimiento = null;
    }
    return egresade;
  }

  enConfirmacion() {
    console.log(this.state);
    
    var alumne = { nombre: this.state.alumne.nombre, apellido: this.state.alumne.apellido,correo:this.state.alumne.correo, celular: this.state.alumne.celular};
    alumne = this.obtenerFechaNacimiento(alumne);  
    alumne.fechaNacimiento = alumne.fechaNacimiento === "" ? null :  alumne.fechaNacimiento;
    console.log(alumne);
    console.log(`${BASE_ROUTE}/estudiantes/${this.state.alumne.id}`);
    axios.put(`${BASE_ROUTE}/estudiantes/${this.state.alumne.id}`, alumne)
          .then(function (respuesta) {
              this.setState({ open: false });
              window.location.reload(false);
           }.bind(this))
              .catch(function (error) {
                  console.log(error)
                })
  }

 
  obtenerNuevaFecha() {
    if(this.state.alumne.fechaNacimiento === undefined || this.state.alumne.fechaNacimiento === ""){
      return null;
    }else {
      const mes = this.state.alumne.fechaNacimiento.substring(5,7);
      const dia = this.state.alumne.fechaNacimiento.substring(8,10);
      const anio = this.state.alumne.fechaNacimiento.substring(0,4);
      const hora = 'T00:00:00';
      const fecha = anio+'-'+mes+'-'+dia+hora;
      return new Date(fecha);
    }
  }
  editarFecha=fecha=>{
    let estadoDepurado = this.state.alumne;
    delete estadoDepurado[`fechaNacimiento`];
    let nuevoEstado = { ...estadoDepurado, [`fechaNacimiento`]: ""};
    if(fecha !== "" && fecha !== null){
      nuevoEstado = { ...estadoDepurado, [`fechaNacimiento`]: fecha.toISOString().split('T')[0]};
    }
    this.setState({ alumne: nuevoEstado });
  }
  onChangeDropdown = (e, { value, name }) => {
    let valor = this.state.alumne[name];
    this.setState({ selectedType: valor },()=>{})
    valor = value;
    this.state.alumne[name] = valor;
  }
  render() {
    return (
     <>
      <Modal open={this.state.open}
        onClose={() => this.abrirModal(false)}
        onOpen={() => this.abrirModal(true)}
        size="mini"
        closeIcon
        trigger={
          <Button color='green' className={styles.botonBasurero}>
            <Icon className={styles.editar} name='edit outline' />
          </Button>}>
            {
                this.state.alumne.nombre ?
                <Fragment>
                   <Modal.Header>
                      <Grid>
                        <Grid.Column>
                            <h2>Editar Alumne</h2>
                        </Grid.Column>
                      </Grid>
                    </Modal.Header>
                
                    <ModalContent>
                        <Grid divided='vertically' stackable columns={2}>
                              <Grid.Row >
                                <Grid.Column className="centrarColumnas">
                                  <span className="etiquetas">
                                    <label htmlFor="nombre">Nombre<br /></label>
                                    <Input class="ui one column stackable center aligned page grid" type="text"
                                      name="nombre"
                                      maxLength="20"
                                      placeholder="Nombre"
                                      value={this.state.alumne.nombre}
                                      validators={['required', 'matchRegexp:^[A-Za-z ]+$']}
                                      errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']}
                                      style={{ margin: "0px 15%" }}
                                      onChange={this.enCambio}
                                    />
                                  </span>
                                </Grid.Column>
                                <Grid.Column>
                                  <span className="etiquetas">
                                    <label htmlFor="apellido">Apellidos<br /></label>
                                    <Input type="text"
                                      name="apellido"
                                      maxLength="30"
                                      placeholder="Apellido"
                                      value={this.state.alumne.apellido}
                                      validators={['required', 'matchRegexp:^[A-Za-z ]+$']}
                                      errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']}
                                      style={{ margin: "0px 15%" }}
                                      onChange={this.enCambio}
                                    />
                                  </span>
                                </Grid.Column>
                                <Grid.Column>
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
                                </Grid.Column>
                                <Grid.Column>
                                  <span className="etiquetas">
                                    <label htmlFor="telefono">Teléfono de Contacto<br /></label>
                                    <Input type="text"
                                      maxLength="50"
                                      name="celular"
                                      placeholder="Celular"
                                      value={this.state.alumne.celular}
                                      //  validators={['matchRegexp:^[0-9]+$']}
                                      errorMessages={['Solo se permite 50 caracteres como maximo']}
                                      style={{ margin: "0px 15%" }}
                                      onChange={this.enCambio}
                                    />
                                  </span>
                                </Grid.Column>
                                <Grid.Column>
                                  <span className="etiquetas">
                                    <label htmlFor="correo">Correo Electrónico<br /></label>
                                    <Input type="email"
                                      name="correo"
                                      placeholder="Correo Electrónico"
                                      value={this.state.alumne.correo}
                                      style={{ margin: "0px 15%" }}
                                      onChange={this.enCambio}
                                    />
                                  </span>
                                </Grid.Column>

                                
                              </Grid.Row>`
                          </Grid>
                    </ModalContent>
                </Fragment>
                :
                <Segment>
                    <Dimmer active inverted>
                        <Loader inverted>Cargando...</Loader>
                    </Dimmer>
                    <Image src='https://react.semantic-ui.com/imagenes/wireframe/short-paragraph.png' />
                </Segment>
            }
            <Modal.Actions>
                <Button className="cancelButton" onClick={() => this.abrirModal(false)}>Cerrar</Button>
                <Button className="confirmButton" onClick={() => this.enConfirmacion()}>Editar</Button>
            </Modal.Actions>
      </Modal>
     </>
    )
  }
}export default EditarAlumne

/*
 <div className="contenedor">
        <Form id="myForm" onSubmit={() => this.handleConfirmEdition()} className="ui form">
          <Grid divided='vertically' stackable columns={2}>
            <Grid.Row >
              <Grid.Column className="centrarColumnas">
                <span className="etiquetas">
                  <label htmlFor="nombre">Nombre<br /></label>
                  <Input class="ui one column stackable center aligned page grid" type="text"
                    name="nombre"
                    maxLength="20"
                    placeholder="Nombre"
                    value={this.state.alumne.nombre}
                    validators={['required', 'matchRegexp:^[A-Za-z ]+$']}
                    errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="apellido">Apellidos<br /></label>
                  <Input type="text"
                    name="apellido"
                    maxLength="30"
                    placeholder="Apellido"
                    value={this.state.alumne.apellido}
                    validators={['required', 'matchRegexp:^[A-Za-z ]+$']}
                    errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
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
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="telefono">Teléfono de Contacto<br /></label>
                  <Input type="text"
                    maxLength="50"
                    name="celular"
                    placeholder="Celular"
                    value={this.state.alumne.celular}
                    //  validators={['matchRegexp:^[0-9]+$']}
                    errorMessages={['Solo se permite 50 caracteres como maximo']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="correo">Correo Electrónico<br /></label>
                  <Input type="email"
                    name="correo"
                    placeholder="Correo Electrónico"
                    value={this.state.alumne.correo}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>

              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="nivelIngles">Nivel de Ingles<br /></label>
                  <Dropdown type="text"
                    name="nivelIngles"
                    placeholder="Nivel de Inglés"
                    value={this.state.alumne.nivelIngles}
                    onChange={this.onChangeDropdown}
                    options={OpcionesDeNivelDeIngles}
                    style={{ margin: "0px 15%" }}
                    selection
                    required
                  />
                </span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid centered rows={1} columns={1}>
            <GridRow>
              <Button type="button" onClick={() => this.handleCancelEdition()} className="ui basic negative button" style={{ margin: "0px 50px 10px 50px" }}>Cancelar</Button>
              {(this.state.abrirModal) && <Confirm
                header='¿Está seguro que desea cancelar los cambios?'
                content="Si acepta la cancelacion del guardado, será redirigido a la lista principal sin guardar sus cambios"
                open={this.state.abrirModal}
                cancelButton='Cancelar'
                confirmButton='Confirmar'
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
              />}
              <Button type="Submit" className="ui basic positive button" style={{ margin: "0px 50px 10px 50px", background: "rgb(129,206,50)" }}>Confirmar</Button>
            </GridRow>
          </Grid>
        </Form>
        {isVisibleErrorMessage && (
          <MensajeResultante encabezadoDelMensaje="Guardado no exitoso" cuerpoDelMensaje="Hubo un error al momento de guardar, intenta de nuevo más tarde" colorDeFondo="red" />)}
        {isVisibleSuccessMessage && (
          <MensajeResultante encabezadoDelMensaje="Guardado exitoso" cuerpoDelMensaje="Se guardo exitosamente" colorDeFondo="green" />)}
      </div>
      */