import React, { Component, Fragment } from 'react';
import { Button, Modal, Grid, } from 'semantic-ui-react';
import { CSVReader} from "react-papaparse"
import "moment/locale/es";
import axios from 'axios';
import Previsualizar from './PrevisualizarTabla'

var listaNodos = [];
var listaSedes = [];
var listaEstudiantes = [];

const findNodo = (datos, nodo) => {

if (datos.find(el => el === nodo)) {
    return true
  }
  return false;
}


const findSede = (data, sede) => {
  if (data.find(el => el === sede)) {
    return true
  }
  return false;
}


const findEstudiante = (listaEstudiantes, correo, numero) => {
    if((listaEstudiantes.Mail.find(el => el === correo)) && (listaEstudiantes.numero.find(el => el === numero))) {
      return 

    }
}

const URL_Estudiantes = `${process.env.REACT_APP_API_URL}/egresades/`;
const URL_Inscriptos = `${process.env.REACT_APP_API_URL}/inscriptos/`;

class BotonImportar extends Component {
  obtenerNodosYSedes = async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}/nodos/`;
    await
      axios
        .get(`${API_URL}`)
        .then(response => {
          this.setState({
            respuestaNodos: response.data.response
          });
          this.state.respuestaNodos.forEach(function (element) {
            listaNodos.push(element.nombre)
            element.sedes.forEach(function (element) {
              listaSedes.push(element.nombre)
            });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  obtenerEstudiantes = async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}/estudiantes/`;
    await
      axios
        .get(`${API_URL}`)
        .then(response => {
          this.setState({
            respuestaEstudiantes: response.data.response
          });
          this.state.respuestaEstudiantes.forEach(function (element) {
            listaEstudiantes.push(element)
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }
    constructor(props) {
      super(props);
      this.obtenerNodosYSedes()
      this.obtenerEstudiantes()
      this.state = {
        open: false,
        inscriptes: [],
        contandorInscriptes: 0,
        mostrarLista: false,
        respuestaNodos:[]
      };
      this.mostrarTabla = this.mostrarTabla.bind(this);
    }

  abrirModal(estado) {
    this.setState({
      open: estado
    })
  }

  mostrarTabla = (data) => {
    this.setState({
      mostrarLista: true,
    });
  }
  
  getDate(date) {
    if(date){
      let splittedDate = date.split("/");
      let preparedDate = splittedDate[1] + '/' + splittedDate[0] + '/' + splittedDate[2];
      return preparedDate;
    } else {
      return null;
    }
  }


  incrementarContadorInscriptes() {
    this.setState({ contandorInscriptes: this.state.contandorInscriptes + 1 })
  }

  onSubmit = (onRegistrarCorrectamente) => {
    let lista = this.state.inscriptes
    fetch(URL_Estudiantes, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(lista).length.toString()
      },
      body: JSON.stringify(lista)
    }).then(res => {
      if (res) {
        onRegistrarCorrectamente(this.state.contandorInscriptes)
        this.state.open= false
      }
    })
      .catch(err => {
        console.log("error al leer los datos " + err)
      })
  }


  handleOnDrop = (data) => {
    data.forEach(fila => {
      var nodo = fila.data["NODO"]
      var sede = fila.data["SEDE"]
      var correo = fila.data["Mail"]
      var numero = fila.data["Numero de Celular"]

      if ((findNodo(listaNodos, nodo)) && (findSede(listaSedes, sede)) && (findEstudiante(listaEstudiantes, correo, numero))) {
        var inscripte = {
          "nombre": fila.data["Nombre"],
          "apellido": fila.data["Apellido"],
          "Estado": "Egresade",
          "fechaNacimiento": this.getDate(fila.data["Fecha de Nacimiento"]),
          "correo": fila.data["Mail"],
          "celular": fila.data["Numero de Celular"],
          "sede": fila.data["SEDE"],
          "nodo": fila.data["NODO"],
          "añoGraduacion": fila.data["Anio"],
          "cuatrimestre": fila.data["Cuatri"],
          "nivelIngles": fila.data["Ingles"] === "Básico" ? "Basico":fila.data["Ingles"],
          "nombrePrimerTrabajo": fila.data["Empresa IT primer empleo"],
          "linkedin": fila.data["Linkedin"],
          "esEmpleado": fila.data["Consiguio trabajo luego de egresar?"] === "Sí" || fila.data["Consiguio trabajo luego de egresar?"] === "Si" ? true : false,
          "modulo": fila.data["Tipo de curso del cual egreso"]
        }
        this.state.inscriptes.push(inscripte)
        this.incrementarContadorInscriptes()
      }
      else {
        this.state.inscriptes = []
        this.setState({ contandorInscriptes: 0 })
        throw null;
      }
      this.mostrarTabla()
    })
  }

  handleOnError = (err) => {
    console.log(err)
  }

  handleOnRemoveFile = () => {
    this.setState({ mostrarLista: false, inscriptes: [], contandorInscriptes: 0 });
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        onClose={() => this.abrirModal(false)}
        onOpen={() => this.abrirModal(true)}
        closeIcon
        centered={true}
        trigger={
          <Button floated="left" color="green" content="Importar" icon="upload">
          </Button>}>
        {
          <Fragment>
            <Modal.Header>
              <Grid>
                <Grid.Column>
                  <h2>Importar Inscriptes</h2>
                </Grid.Column>
              </Grid>
            </Modal.Header>

            <Modal.Content>
                <Modal.Description>
                <CSVReader
                    cssClass="csv-reader-input"
                    config={{
                      header: true,
                      skipEmptyLines: 'greedy'}}
                    onDrop={this.handleOnDrop}
                    onError={this.handleOnError}
                    addRemoveButton
                    onRemoveFile={this.handleOnRemoveFile}>
                    <span>Drop CSV file here to upload.</span>
                </CSVReader>
                </Modal.Description>
              {this.state.mostrarLista && this.state.inscriptes !== [] ?
              <Previsualizar json={this.state.inscriptes}/>
              :
              <h1 align="center">No se cargo ningun archivo</h1>}
               
            </Modal.Content>
          </Fragment>
        }
        <Modal.Actions>
          <Button className="cancelButton" onClick={() => this.abrirModal(false)}>Cerrar</Button>
          <Button className="confirmButton" onClick={() => this.onSubmit()}>Confirmar</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default BotonImportar
  