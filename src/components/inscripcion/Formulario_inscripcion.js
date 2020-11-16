import React, { Component } from 'react';
import 'semantic-ui-css/semantic.css';
import { Dropdown, Button, Grid, GridRow, Confirm } from 'semantic-ui-react';
import { Form, Input } from 'semantic-ui-react-form-validator';
import '../../public/stylesheet/formulario_inscripciones.css';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { NIVELES_INGLES } from './opciones/niveles_ingles.js';
//import { OPCION_CURSOS} from './opciones/opcion_cursos.js';
import { MensajeResultante } from './mensaje/mensaje.js';

export class Formulario_inscripcion extends Component {
    state = {
      exito: null,
    };
    constructor(props) {
      super(props);
      this.state = {
        inscrite: {
        },
      };
      console.log("test type",this.props.match.params.nombre)
    }
      enCambio = (event) => {
          let nombre = event.target.name;
          let valor = event.target.value;
          let estadoDepurado = this.state.inscrite;
          delete estadoDepurado[`${nombre}`];
          let nuevoEstado = { ...estadoDepurado, [`${nombre}`]: valor };
          this.setState({ inscrite: nuevoEstado });
        }
      guardarEgresade() {
          var egresadeAEnviar = this.state.inscrite;
          egresadeAEnviar.celular = parseInt(egresadeAEnviar.celular);
          delete egresadeAEnviar.nombre;
          delete egresadeAEnviar.apellido;
          egresadeAEnviar.estadoId=1
          egresadeAEnviar.esEmpleado="false"
          egresadeAEnviar.modulo=this.query.modulo
          axios.post(`https://nahual-datos-estudiantes.herokuapp.com/api/estudiantes/`, egresadeAEnviar)
            .then(function (respuesta) {
              window.open("/", "_self");
            })
            .catch(function (error) {
              this.setState({ exito: false });
            }.bind(this));
          setTimeout(() => { this.setState({ exito: null }); }, 5000);
        }


      enConfirmacion = (evento) => {
        evento.preventDefault();
        var nombreConcatenado = this.state.inscrite.nombre + " " + this.state.inscrite.apellido;
        this.state.inscrite.nombreCompleto = nombreConcatenado;
        this.setState({ abrirModal: true })
        console.log(this.state);
      }
      handleButtonClick = () => this.setState({ abrirModal: true })

  handleCancel = () => this.setState({ abrirModal: false })

  handleConfirm = () => {
    this.setState({ abrirModal: false })
    this.guardarEgresade();
  }
  onChangeDropdown = (e, { value, name }) => {
    console.log(name);
    let valor = this.state.inscrite[name];
    this.setState({ selectedType: valor })
    valor = value;
    this.state.inscrite[name] = valor;
  }
render() {
    return (
      <div>
          <div class="titulo">
                <h1>Elegiste el curso {this.props.match.params.nombre}. Déjanos tus datos</h1>
                <div className="linea"></div>
          </div>
        <div className="contenedor">
        <Form id="myForm" onSubmit={this.enConfirmacion} className="ui form">
          <Grid divided='vertically' stackable columns={2}>
            <Grid.Row>
              <Grid.Column className="centrarColumnas">
                <span className="etiquetas">
                  <label htmlFor="nombre">Nombre<br /></label>
                  <Input class="ui one column stackable center aligned page grid" type="text"
                    name="nombre"
                    maxLength="20"
                    placeholder="Nombre"
                    value={this.state.inscrite.nombre}
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
                    value={this.state.inscrite.apellido}
                    validators={['required', 'matchRegexp:^[A-Za-z ]+$']}
                    errorMessages={['Este campo es requerido', 'El campo no acepta valores numéricos']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="fechaNacimiento">Fecha de Nacimiento<br /></label>
                  <Input type="date"
                    name="fechaNacimiento"
                    pattern="[0-9]*"
                    placeholder="Fecha de Nacimiento"
                    value={this.state.inscrite.fechaNacimiento}
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    style={{ margin: "0px 15%" }}
                    min="1960-01-01"
                    max="2020-01-01"
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="telefono">Teléfono de Contacto<br /></label>
                  <Input type="text"
                    maxLength="10"
                    name="celular"
                    placeholder="Celular"
                    value={this.state.inscrite.celular}
                    validators={['required', 'matchRegexp:^[0-9]+$']}
                    errorMessages={['Este campo es requerido', 'El campo sólo acepta números']}
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
                    value={this.state.inscrite.correo}
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="nivelIngles">Nivel de Ingles<br /></label>
                  <Dropdown type="text"
                    name="nivelInglesId"
                    placeholder="Nivel de Ingles"
                    value={this.state.inscrite.nivelInglesId}
                    onChange={this.onChangeDropdown}
                    options={NIVELES_INGLES}
                    style={{ margin: "0px 11%" }}
                    selection
                    required
                  />
                </span>
              </Grid.Column>

              <Grid.Column>
                <span className="etiquetas">
                  <label for="añoGraduacion">Zona<br /></label>
                  <Input type="text"
                    name="zona"
                    maxLength="30"
                    placeholder="Zona"
                    value={this.state.inscrite.zona}
                    validators={['required']}
                    errorMessages={['Este campo es requerido']}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>

            </Grid.Row>
          </Grid>
          <Grid centered rows={1} columns={1}>
            <GridRow>
              <Link to={'/'}><Button class="ui grey button" style={{color:"white", margin: "0px 50px 10px 50px",background:"hsl(0, 0%, 50%)" }}>Cancelar</Button></Link>
              <Confirm
                header='¿Está seguro que desea guardar los cambios?'
                content="Si confirma el guardado, será redirigido a la lista principal"
                open={this.state.abrirModal}
                cancelButton='Cancelar'
                confirmButton='Confirmar'
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
              />
              <Button class="ui green button" style={{ color:"white",margin: "0px 50px 10px 50px", background: "rgb(129,206,50)" }}>Confirmar</Button>
            </GridRow>

          </Grid>
        </Form>
        {(this.state.exito === false) && (
          <MensajeResultante encabezadoDelMensaje="Guardado no exitoso" cuerpoDelMensaje="Hubo un error al momento de guardar, intenta de nuevo más tarde" colorDeFondo="red" />)}
      </div>

      </div>
          );
  }
}
export default Formulario_inscripcion;


