import React, { Component } from 'react'
import { Label, Button, Message, Table, Search } from 'semantic-ui-react'
import '../../public/stylesheets/Table.css';
import { Link } from 'react-router-dom';
class Listar_Modulos extends Component {
  constructor() {
    super();
    this.state = {
      api: [],
      filasEncontradas: Array(0),
      mensajeDeEstado: "",
      mostrarMensajeDeEstado: false,
      open: false
    }
    this.enRegistroExitoso = this.enRegistroExitoso.bind(this)
  }



  obtenerEgresades() {
    fetch(`http://fathomless-falls-62194.herokuapp.com/api/egresades`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        let dat = res;
        this.setState({
          api: dat.response,
          filasEncontradas: dat.response
        });
      })
  }

  eliminarEgresadesVista(id) {
    this.obtenerEgresades();
  }

  componentDidMount() {
    this.obtenerEgresades();
  }

  mostrarModal() {
    this.setState({ mostrarModal: true });
  }

  manejarProblemas = () => {
    this.setState({ mostrarMensajeDeEstado: false })
  }

  buscarPorNombre(nombre) {
    let buscado = nombre.target.value;
    let listaEgresades = this.state.api;
    let resultados = Array(0);

    if (nombre.target.value.trim() === "") {
      this.setState({
        filasEncontradas: this.state.api
      });
    }
    for (let contador = 0; contador < listaEgresades.length; contador++) {
      if (listaEgresades[contador].nombreCompleto.toLowerCase().includes(buscado.toLowerCase())) {
        resultados.push(listaEgresades[contador]);
      }
    }
    this.setState({
      filasEncontradas: resultados
    });
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
                <Table.HeaderCell className="cabeceras-tabla">Nombre y Apellido</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Nodo</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Modulo Cursado</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Acción</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.filasEncontradas.map((value) => (
                <Table.Row key={value.id} >
                  <Table.Cell className="bordes-tabla">
                    <Label className="nombre">{value.nombreCompleto}</Label><br></br>
                    <Label className="email">{value.correo}</Label>
                  </Table.Cell >
                  <Table.Cell className="bordes-tabla">
                    <Label className="tarjeta-azul">• {value.nombreNodo}</Label>
                  </Table.Cell>
                  <Table.Cell className="bordes-tabla">
                    <Label className="tarjeta-verde">• {value.modulo}</Label></Table.Cell>
                  <Table.Cell colSpan="3" className="bordes-tabla">
                    {<Link to={`/editar/${value.id}`}><Button className="view-button">
                      <i className="edit icon"></i>
                      <label className="icon-text">Editar</label>
                    </Button></Link>
                    }

                    <Modal egresadeId={value.id} open={this.state.mostrarModal} />
                    <Eliminar egresadeId={value.id} eliminarVista={() => this.eliminarEgresadesVista(value.id)}></Eliminar>
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