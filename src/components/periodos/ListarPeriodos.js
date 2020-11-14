import React, { Component } from 'react'
import { Label, Table } from 'semantic-ui-react'
import '../../public/stylesheet/tabla.css';

class ListarPeriodos extends Component {
  constructor() {
    super();
    this.state = {
      listaPeriodos: []
    }
  }

  obtenerPeriodos() {
    fetch(`http://localhost:8000/api/periodos`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        let data = res;
        this.setState({
          listaPeriodos: data.response
        });
      })
  }

  componentDidMount() {
    this.obtenerPeriodos();
  }

  render() {
    return (
      <div>
        <div className="tabla">
          <p className="titulo">Lista de Periodos</p>
          <br /><br />
          <Table celled className="tarjeta-tabla">
            <Table.Header>
              <Table.Row >
                <Table.HeaderCell className="cabeceras-tabla">Año</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Periodo</Table.HeaderCell>
                <Table.HeaderCell className="cabeceras-tabla">Topico</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.listaPeriodos.map((value) => (
                <Table.Row key={value.id} >
                  <Table.Cell className="bordes-tabla">
                    <Label className="anio">{value.anio}</Label>
                  </Table.Cell >
                  <Table.Cell className="bordes-tabla">
                    <Label className="periodo">{value.periodo}</Label>
                  </Table.Cell>
                  <Table.Cell className="bordes-tabla">
                    <Label className="tarjeta-azul">•{value.nombreNodo}</Label>
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

export default ListarPeriodos