import React, { Component } from "react";
import { Button, Modal, Image, Segment, Loader, Dimmer, Icon } from 'semantic-ui-react'
import CuerpoModal from './CuerpoModal';
import axios from "axios";

class DetalleDeAlumne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abierto: false
    };
  }

  obtenerAPIDeEgresade() {
    const API_URL = process.env.REACT_APP_API_URL;
    axios
      .get(`${API_URL}/estudiantes/${this.props.id}/DTO`)
      .then(respuesta => {
        this.setState({
          egresade : respuesta.data.response
        });
      })
      .catch(function (error) {
      alert("Error en la base de datos.")
      });
  }

  mostrarModal (state) {
    this.setState({
      abierto: state
    });
  }

  render() {
    return (
      <Modal
        open={this.state.abierto}
        onClose={() => this.mostrarModal (false)}
        onOpen={() => this.mostrarModal (true)}
        size="small"
        closeIcon
        trigger={<Button circular basic color="green" icon onClick={() => (this.obtenerAPIDeEgresade(this.props.id))}><Icon color="black" name="eye"></Icon> </Button>}
      >
        {
          this.state.egresade ?
            <CuerpoModal egresade={this.state.egresade } cerrarModal={() => (this.mostrarModal (false))} />
            :
            <Segment>
              <Dimmer active inverted>
                <Loader inverted>Cargando</Loader>
              </Dimmer>
              <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>
        }
      </Modal>
    )
  }
}

export default DetalleDeAlumne;
