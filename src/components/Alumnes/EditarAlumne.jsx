import React, { Component, Fragment } from 'react'
import { Button, Image, Modal, Grid, Segment, Loader, Dimmer, Icon, Input , GridRow, Confirm, ModalContent } from 'semantic-ui-react';
import { Form, Dropdown } from 'semantic-ui-react-form-validator';
import styles from "../../public/stylesheet/formulario_inscripciones.css";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import BASE_ROUTE from "../../servicios/rutas";



export class EditarAlumne extends Component {
  constructor(props) {
      super(props);
      this.state = {
          open: false,
          alumne: {
            id: props.id,
            nombre: props.nombre,
            apellido: props.apellido,
            correo: props.correo,
            celular: props.celular,
            fechaNacimiento: props.fechaNacimiento,
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
  obtenerFechaNacimiento(alumne) {
    if (alumne.fechaNacimiento === new Date().toISOString().split('T')[0]) {
      alumne.fechaNacimiento = null;
    }
    return alumne;
  }
  enConfirmacion() {
    console.log(this.state.alumne);
    var alumne = { nombre: this.state.alumne.nombre, apellido: this.state.alumne.apellido,correo:this.state.alumne.correo, celular: this.state.alumne.celular, fechaNacimiento: this.state.alumne.fechaNacimiento};
    alumne.fechaNacimiento = alumne.fechaNacimiento==="" ? null :  alumne.fechaNacimiento;
    
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
    if(this.state.alumne.fechaNacimiento === undefined || this.state.alumne.fechaNacimiento === "" || this.state.alumne.fechaNacimiento===null){
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
    let estadoDepurado=this.state.alumne;
    estadoDepurado.fechaNacimiento=fecha.toISOString().split('T')[0];
    this.setState({alumne : estadoDepurado});
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
        size="lg"
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
                                      <div style={{ margin: "8px 12%"}}>
                                        <DatePicker
                                          dateFormat={"dd/MM/yyyy"}
                                          selected={this.obtenerNuevaFecha()}
                                          onChange={this.editarFecha} class="ui input"/>
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
}
export default EditarAlumne