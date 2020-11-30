import Axios from "axios";
import React, { Component } from "react";
import {
  Dimmer,
  Form,
  Header,
  Loader,
  Message,
  Table
} from "semantic-ui-react";
import Alumne from "./Alumne";

class ListaDeAlumnesPorCurso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnes: [],
      curso: 1,
      mostrarBotonDeCarga: true
    };
  }

  componentDidMount() {
    this.obtenerAlumnes();
  }

  obtenerAlumnes() {
    this.setState({
      mostrarBotonDeCarga: true
    });
    const API_URL = process.env.REACT_APP_API_URL;
    Axios.get(`${API_URL}/cursos/${this.state.curso}/inscriptes`)
      .then((respuesta) => {
        this.setState({
          mostrarBotonDeCarga: false,
          alumnes: respuesta.data.response
        });
      })
      .catch(() => {
        this.setState({
          mostrarBotonDeCarga: false
        });
        alert("Error en la base de datos.");
      });
  }

  cuandoCambiaElCurso() {
    this.obtenerAlumnes();
  }

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

  mapeoListaAlumnes(listaAlumnes) {
    return listaAlumnes.map((alumne) => {
      return <Alumne item={alumne.estudiante} key={alumne.estudiante.id} />;
    });
  }

  listaVacia() {
    return (
      this.state.alumnes.length === 0 && (
        <Message
          icon="warning sign"
          warning
          header={"Lo sentimos, por el momento no tenemos alumnes disponibles."}
          content={"Intenta mas tarde. Gracias"}
        />
      )
    );
  }

  render() {
    return (
      <div>
        <Form onSubmit={() => this.cuandoCambiaElCurso()}>
          <Form.Group>
            <Form.Input
              placeholder="Curso"
              name="curso"
              onChange={(e, { value }) => {
                this.setState({ curso: value });
              }}
              value={this.state.curso}
            />
            <Form.Button content="Cambiar" />
          </Form.Group>
        </Form>
        {this.iconoDeCarga()}
        <Header as="h2" textAlign="center" content="Lista Alumnes" />
        <div style={{ overflowX: "auto" }}>
          <Table singleLine selectable striped unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>NOMBRE Y APELLIDO</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.listaAlumnes()}</Table.Body>
          </Table>
        </div>
        {this.listaVacia()}
      </div>
    );
  }
}

export default ListaDeAlumnesPorCurso;
