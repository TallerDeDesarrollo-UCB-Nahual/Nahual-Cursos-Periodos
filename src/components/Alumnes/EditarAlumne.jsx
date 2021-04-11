import React, { Component } from 'react'
import { Button, Grid, GridRow, Confirm } from 'semantic-ui-react';
import { Form, Input, Dropdown } from 'semantic-ui-react-form-validator';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { MensajeResultante } from './tipoDeMensaje/MensajeResultante.jsx';

export const OpcionesDeNivelDeIngles = [
  {
      key: 'Basico',
      text: 'Basico',
      value: 'Basico',
      valueToSend : 1
  },
  {
      key: 'Intermedio',
      text: 'Intermedio',
      value: 'Intermedio',
      valueToSend : 2
  },
  {
      key: 'Avanzado',
      text: 'Avanzado',
      value: 'Avanzado',
      valueToSend : 3
  }
];

class EditarAlumne extends Component {
  state = {}
  constructor(props) {
    super(props);
    this.state = {
      alumne: {
        nombre: '',
        apellido: '',
        correo: '',
        celular: '',
        fechaNacimiento: '',
        nivelIngles: '',
        sedes: [],
        nodos: [],
        isVisibleErrorMessage: false,
        isVisibleSuccessMessage: false
      },
    };
    //this.handleConfirm = this.handleConfirm.bind(this);
    //this.handleConfirmEdition = this.handleConfirmEdition.bind(this);
  }
  handleChange = (e, { value }) => this.setState({ value })
  handleCancelEdition() {
    this.setState({ abrirModal: true });
  }
  handleCancel = () => { this.setState({ abrirModal: false }) }

  handleConfirm() {
    this.setState({ abrirModal: false })
    this.props.history.push("/listaEgresades");
  }

  enCambio = (event) => {
    let nombre = event.target.name;
    let valor = event.target.value;
    let estadoDepurado = this.state.alumne;
    delete estadoDepurado[`${nombre}`];
    let nuevoEstado = { ...estadoDepurado, [`${nombre}`]: valor };
    this.setState({ alumne: nuevoEstado });
  }
  obtenerNuevaFecha() {
    if(this.state.alumne.fechaNacimiento == undefined || this.state.egresade.fechaNacimiento == ""){
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
    if(fecha != "" && fecha != null){
      nuevoEstado = { ...estadoDepurado, [`fechaNacimiento`]: fecha.toISOString().split('T')[0]};
    }
    this.setState({ alumne: nuevoEstado });
  }
  onChangeDropdown = (e, { value, name }) => {
    let valor = this.state.alumne[name];
    this.setState({ selectedType: valor })
    valor = value;
    this.state.alumne[name] = valor;
  }
  onChangeDropdownNodo = (e, { value, name }) => {
    let valor = this.state.alumne[name];
    this.setState({ selectedType: valor })
    this.state.alumne['sede'] = null;
    valor = value;
    this.state.alumne[name] = valor;
  }

  obtenerSede(nodo) {
    if (this.state.nodos === undefined) {
      return null;
    }
    else {
      let nodoEscogido = this.state.nodos.filter(value => value.nombre === nodo)[0];
      let sedesEscogidas = nodoEscogido.sedes
      return sedesEscogidas;
    }
  }

  render() {
    const { isVisibleErrorMessage, isVisibleSuccessMessage, alumne } = this.state;
    return (
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


              <Grid.Column>
                <span className="Nodo">
                  <label htmlFor="nodo">Nodo<br /></label>
                  <Dropdown
                    name="nodo"
                    id="nodo"
                    placeholder={this.state.alumne.nodo}
                    selection
                    required
                    style={{ margin: "0px 15%" }}
                    options={this.state.nodos}
                    value={this.state.alumne.nodo}
                    onChange={this.onChangeDropdownNodo}
                  />
                </span>
              </Grid.Column>
            </Grid.Row>
              <Grid.Column className="centrarColumnas">
                <span className="etiquetas">
                  <label htmlFor="Sede">Sede<br /></label>
                  <Dropdown
                    name="sede"
                    id="sede"
                    placeholder={this.state.alumne.sede}
                    selection
                    validators={['required']}
                    errorMessages={['Este campo es requerido, porfavor seleccione otro nodo']}
                    style={{ margin: "0px 15%" }}
                    options={this.obtenerSede(this.state.alumne.nodo)}
                    value={this.state.alumne.sede}
                    onChange={this.onChangeDropdown}
                  />
                </span>
              </Grid.Column>
    
            
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
    )
  }
}

export default EditarAlumne