import React, { Component } from 'react';
import 'semantic-ui-css/semantic.css';
import { Dropdown, Button, Grid, GridRow, Confirm, TextArea } from 'semantic-ui-react';
import { Form, Input } from 'semantic-ui-react-form-validator';
import JTimepicker from 'reactjs-timepicker'
//import '../../public/stylesheets/Registrar.css';
import styles from './styles.module.css'
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { MensajeCrearCurso } from './mensaje/mensajeCrearCurso.js';

export class CrearCurso extends Component {
  state = {
    exito: null,
  };
  constructor(props) {
    super(props);
    this.state = {
			sedes: [],
			sede: "",
			NodoId: null,
			SedeId: null,
			horarioInicio: "",
			horarioFin: "",
			profesores: "",
			notas: "",
    };
		this.handleInitialClock=this.handleInitialClock.bind(this);
		this.handleFinalClock=this.handleFinalClock.bind(this);
		this.handleSedeYNodo=this.handleSedeYNodo.bind(this);
		this.handleProfesores=this.handleProfesores.bind(this);
		this.handleNotas=this.handleNotas.bind(this);
  }
  obtenerSedes() {
    const API_URL = `https://nahual-test.herokuapp.com/api/sedes/`;
    axios
      .get(`${API_URL}`)
      .then(response => {
        this.setState({
					sedes: response.data.response
        });
        console.log(this.state.sedes);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.obtenerSedes();
  }

  enCambio = (event) => {
    let nombre = event.target.name;
    let valor = event.target.value;
    let estadoDepurado = this.state.egresade;
    delete estadoDepurado[`${nombre}`];
    let nuevoEstado = { ...estadoDepurado, [`${nombre}`]: valor };
    this.setState({ horarioInicio: event.target });
  }

  // enConfirmacion = (evento) => {
  //   evento.preventDefault();
  //   var nombreConcatenado = this.state.egresade.nombre + " " + this.state.egresade.apellido;
  //   this.state.egresade.nombreCompleto = nombreConcatenado;
  //   this.setState({ abrirModal: true })
  // }

  // guardarEgresade() {
  //   var egresadeAEnviar = {
  //     ...this.state.egresade,
  //     nodoId: obtenerValorConvertidoDeEnvio(OpcionesDeNodo, this.state.egresade.nodo),
  //     sedeId: obtenerValorConvertidoDeEnvio(OpcionesDeSede, this.state.egresade.sede),
  //     nivelInglesId: obtenerValorConvertidoDeEnvio(OpcionesDeNivelDeIngles, this.state.egresade.nivelIngles)
  //   }
  //   egresadeAEnviar.celular = parseInt(egresadeAEnviar.celular);
  //   egresadeAEnviar.esEmpleado = OpcionesDeEstadoLaboral.filter(op => op.value === this.state.egresade.esEmpleado)[0].valueToSend;
  //   delete egresadeAEnviar.nombre;
  //   delete egresadeAEnviar.apellido;
  //   delete egresadeAEnviar.nodo;
  //   delete egresadeAEnviar.sede;
  //   delete egresadeAEnviar.nivelIngles;
  //   console.log(egresadeAEnviar);
  //   axios.put(`https://nahual-test.herokuapp.com/api/estudiantes/${egresadeAEnviar.id}`, egresadeAEnviar)
  //     .then(function (respuesta) {
  //       window.open("/listaEgresades", "_self");
  //     })
  //     .catch(function (error) {
  //       this.setState({ exito: false });
  //     }.bind(this));
  //   setTimeout(() => { this.setState({ exito: null }); }, 5000);

  // }

  handleButtonClick = () => this.setState({ abrirModal: true })

  handleCancel = () => this.setState({ abrirModal: false })

  handleConfirm = () => {
    this.setState({ abrirModal: false })
    this.guardarEgresade();
  }

  onChangeDropdown = (e, { value, name }) => {
    // let valor = this.state.egresade[name];
    // this.setState({ sede: valor })
    // valor = value;
    // this.state.egresade[name] = valor;
	}
	
	async handleInitialClock(value){
		await this.setState({horarioInicio: value});
	}

	async handleFinalClock(value){
		await this.setState({horarioFin: value});
	}

	async handleSedeYNodo(e, { value, name }){
		await this.setState({SedeId: value.SedeId,NodoId: value.NodoId});
	}

	async handleProfesores(e, { value, name }){
		await this.setState({profesores: value});
	}

	async handleNotas(e, { value, name }){
		await this.setState({notas: value});
	}

	async handlePeriodo(e, { value, name }){
		await this.setState({notas: value});
	}

  render() {

    return (
      <div className="contenedor">
				<br />
				<h2 className={styles.tituloCrearCurso}>Edición de Curso</h2>
        <Form id="myForm" onSubmit={() => {}} className="ui form">
          <Grid divided='vertically' stackable columns={2}>
            <Grid.Row >
              <Grid.Column className="centrarColumnas">
                <span className="etiquetas">
                  <label htmlFor="PeriodoId">Periodo<br /></label>
                  <Input class="ui one column stackable center aligned page grid" type="text"
                    name="PeriodoId"
                    maxLength="20"
                    placeholder="Periodo"
                    validators={['required']}
                    errormessages={'Este campo es requerido'}
                    style={{ margin: "0px 15%" }}
                    onChange={this.enCambio}
                  />
                </span>
              </Grid.Column>
							 <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="sede">Sede<br /></label>
                  <Dropdown
                    name="sede"
                    id="sede"
                    placeholder="Sede"
                    selection
                    required
                    style={{ margin: "0px 11%", minWidth: "75%" }}
                    options={this.state.sedes.map(s => {
											 return {key: s.id+'sede', value: {SedeId: s.id, NodoId: s.NodoId}, text: s.nombre +' - '+s.nodo.nombre} 
											})
										}
                    onChange={this.handleSedeYNodo}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
								<span className="etiquetas">
                  <label htmlFor="horarioInicio">Horario Inicio<br /></label>
                  <JTimepicker
										color={'#87D734'}
										size={25}
                    onChange={this.handleInitialClock}
                    style={{ margin: "0px 11%" }}
                  />
                </span>
              </Grid.Column>
							<Grid.Column>
								<span className="etiquetas">
                  <label htmlFor="horarioFin">Horario Fin<br /></label>
                  <JTimepicker
										color={'#87D734'}
										size={25}
                    onChange={this.handleFinalClock}
                    style={{ margin: "0px 11%" }}
                  />
                </span>
              </Grid.Column>
							<Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="profesores">Profesores<br /></label>
                  <Input type="text"
                    name="profesores"
                    placeholder="Profesores"
                    validators={['required']}
                    errormessages={'Este campo es requerido'}
                    style={{ margin: "0px 15%" }}
                    onChange={this.handleProfesores}
                  />
                </span>
              </Grid.Column>
              <Grid.Column>
                <span className="etiquetas">
                  <label htmlFor="notas">Notas<br /></label>
                  <TextArea
                    name="notas"
                    placeholder="Notas"
                    validators={['required']}
                    errormessages={'Este campo es requerido'}
                    style={{ margin: "0px 11%", maxWidth:"75%"}}
                    onChange={this.handleNotas}
                  />
                </span>
              </Grid.Column>
						</Grid.Row>
          </Grid>
          <Grid centered rows={1} columns={1}>
            <GridRow>
              <Link to={'/'}><Button className="ui basic negative button" style={{ margin: "0px 50px 10px 50px" }}>Cancelar</Button></Link>
              <Confirm
                header='¿Está seguro que desea guardar los cambios?'
                content="Si confirma el guardado, será redirigido a la lista principal"
                open={this.state.abrirModal}
                cancelButton='Cancelar'
                confirmButton='Confirmar'
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
              />
              <Button className="ui basic positive button" style={{ margin: "0px 50px 10px 50px", background: "rgb(129,206,50)" }}>Confirmar</Button>
            </GridRow>
          </Grid>
        </Form>
        {(this.state.exito === false) && (
          <MensajeCrearCurso encabezadoDelMensaje="Guardado no exitoso" cuerpoDelMensaje="Hubo un error al momento de guardar, intenta de nuevo más tarde" colorDeFondo="red" />)}
      </div>
    );
  }
}

export default CrearCurso;
