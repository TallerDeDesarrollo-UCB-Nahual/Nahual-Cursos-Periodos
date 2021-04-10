import Axios from "axios";
import React, { Component } from "react";
import OpcionesDeCurso from "./OpcionesDeCurso";
import {Dimmer,Header,Loader,Message,Table} from "semantic-ui-react";
import Alumne from "./Alumne";
import ModalCambioEstado from "./ModalCambioEstado.jsx";
import BotonExportar from "./BotonExportar";
import BotonImportar from "./BotonImportar";

class ListaDeAlumnesPorCurso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnes: [],
      curso: 1,
      mostrarBotonDeCarga: true,
      alumnesSeleccionados:[]
    };
  }

  async componentDidMount() {
    this.obtenerAlumnes(1);
  }

  obtenerAlumnes(idCurso) {
    this.setState({
      mostrarBotonDeCarga: true
    });
    const API_URL = process.env.REACT_APP_API_URL;
    Axios.get(`${API_URL}/cursos/${idCurso}/inscriptes`)
      .then(respuesta => {
        this.setState({
          mostrarBotonDeCarga: false,
          alumnes: respuesta.data.response,
          alumnesSeleccionados:[]
          
        });
      })
      .catch(() => {
        this.setState({
          mostrarBotonDeCarga: false
        });
        console.log("Error al cargar la base de datos")
      });
  }

  enviarDatosAlEstado(data) {
    this.setState({
      curso: data,
      alumnesSeleccionados:[]
    });
    this.cambiarEstadoSeleccionable(true);
  }

  cuandoCambiaElCurso = data => {
    this.enviarDatosAlEstado(data);
    this.obtenerAlumnes(data);
  };

  iconoDeCarga() {
    return (
      this.state.mostrarBotonDeCarga === true && (
        <Dimmer active inverted>
          <Loader inverted>Cargando</Loader>
        </Dimmer>
      )
    );
  }

  listaAlumnes() {
    return this.mapeoListaAlumnes(this.state.alumnes);
  }

  filtrarAlumneDeLaLista = (id) => {
    let alumnesFiltrado = this.state.alumnes.filter(
      (alumne) => alumne.estudiante.id !== id
    );
    this.setState({
      alumnes: alumnesFiltrado,
      alumnesSeleccionados:[]
    });
  };

  mapeoListaAlumnes(listaAlumnes) {
    return listaAlumnes.map((alumne,contador) => {
      return <Alumne item={alumne.estudiante} filtrarAlumne={(id) => this.filtrarAlumneDeLaLista(id)} key={alumne.estudiante.id} seleccionarAlumne={this.seleccionarAlumne} numeracion={contador+1}/>;
    });
  }

  listaVacia() {
    return this.state.alumnes.length === 0 ? (
      <Message
        icon="warning sign"
        warning
        header={"Lo sentimos, por el momento no tenemos alumnes disponibles."}
        content={"Intenta mas tarde. Gracias"}
      />
    ) : (
      <div>
      <BotonExportar
        seleccionados={this.state.alumnesSeleccionados}
        deseleccionarAlumnes={() => {
          this.cambiarEstadoSeleccionable(true);
          this.setState({ alumnesSeleccionados: [] });
        }}
      />


      </div>
    );
  }

seleccionarTodosLosAlumes(){
  let seleccionable = this.cambiarEstadoSeleccionable(false);
  if(seleccionable[0].checked){
    this.setState({
      alumnesSeleccionados: this.state.alumnes
    })
  }else{
    this.setState({
      alumnesSeleccionados:[]
    })
  }
}

cambiarEstadoSeleccionable=(cambioCurso)=>{
  let checkboxes = Array.from(document.getElementsByName("checkbox"));
    checkboxes.map((checkbox) => {
      return cambioCurso
        ? (checkbox.checked = false)
        : (checkbox.checked = checkboxes[0].checked);
    });
    return checkboxes;
}

seleccionarAlumne = (alumne,estaSeleccionado)=>{
  let checkboxes = Array.from(document.getElementsByName("checkbox"));
  checkboxes[0].checked=false;
  if (estaSeleccionado) {
    this.setState({
      alumnesSeleccionados:this.state.alumnesSeleccionados.concat(alumne)
    })
  }
  else{
    this.state.alumnesSeleccionados.map(() => {
        return this.setState({
          alumnesSeleccionados: this.state.alumnesSeleccionados.filter(
            (a) => a.estudiante.id !== alumne.estudiante.id
          )
        });
      })
  }
}

  render() {
    return (

      <div>
        {this.iconoDeCarga()}
        <Header as="h2" textAlign="center" content="Lista Alumnes" />
        <OpcionesDeCurso cuandoCambiaElCurso={this.cuandoCambiaElCurso} />
        <div style={{ overflowX: "auto" }}>
          <Table singleLine selectable striped unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">
                  <input
                    type="checkbox"
                    name="checkbox"
                    onClick= {()=>this.seleccionarTodosLosAlumes()}
                    style={{ transform: "scale(1.4)" }}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell>NOMBRE Y APELLIDO</Table.HeaderCell>
                <Table.HeaderCell textAlign="center"></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.listaAlumnes()}</Table.Body>
          </Table>
          {this.listaVacia()}
          <BotonImportar json={this.state.curso}/>
          <ModalCambioEstado alumnes={this.state.alumnesSeleccionados} cambiarEstadoSeleccionable={this.cambiarEstadoSeleccionable} filtrarAlumneDeLaLista={this.filtrarAlumneDeLaLista} />
        </div>
      </div>
    );
  }
}
export default ListaDeAlumnesPorCurso;
