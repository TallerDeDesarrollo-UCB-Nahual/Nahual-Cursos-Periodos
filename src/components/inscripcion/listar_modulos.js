import React, { Component } from 'react'
import { Label, Button, Message, Table, Search } from 'semantic-ui-react'
import '../../public/stylesheet/listar_modulos.css';
import { Link } from 'react-router-dom';
class Listar_Modulos extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      filasEncontradas: [],
      mensajeDeEstado: "",
      open: false
    }
}
  componentDidMount(){
    this.obtenerPeriodos().then(response => response.json()).then(response => this.setState({filasEncontradas: response.response}));
  }
  obtenerPeriodos() {
    return fetch(`https://nahual-datos-estudiantes.herokuapp.com/api/periodos`);
  }
  manejarProblemas = () => {
    this.setState({ mostrarMensajeDeEstado: false })
  }

  render() {
    return (
      <div>
        <div className="tabla">
          <p className="titulo">Lista de Modulos</p>
          <div className="linea"></div>
          <br /><br />
          <Table celled className="tarjeta-tabla">
            <Table.Header>
              <Table.Row >
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.filasEncontradas.map((value) => (
                <Table.Row key={value.id} >
                  <Table.Cell className="bordes-tabla">
                    <Label className="tarjeta-verde">{value.topico.nombre}</Label></Table.Cell>
                    <Table.Cell colSpan="3" className="bordes-tabla">
                    {<Link to={`/formulario/${value.topico.nombre}`}><Button className="view-button">
                      <i className="plus icon"></i>
                      <label className="icon-text">INSCRIBIRME</label>
                    </Button></Link>
                    }
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='4' className="no-border">
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>

        </div>
      </div>)

  }

}
export default Listar_Modulos