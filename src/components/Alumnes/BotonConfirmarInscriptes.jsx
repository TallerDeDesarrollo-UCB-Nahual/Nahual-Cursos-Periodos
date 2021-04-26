import React from 'react'
import { Button, Confirm  } from 'semantic-ui-react';

class BotonConfirmarInscriptes extends React.Component {
  state = { open: false}

  show = () => this.setState({ open: true })
  handleConfirm = () =>{
    this.props.onRegister("confirmed");
    this.setState({open: false });
  }
  handleCancel = () =>{
    this.props.onRegister("cancelled");
    this.setState({open: false });
  } 
  render() {
    const { open } = this.state

    return (
      <div>
        <Button className="confirmButton" onClick={this.show}>Confirmar</Button>
        <Confirm
          content={"¿Esta seguro que desea importar un nuevo csv?, se eliminaran los alumnes previamente inscritos."}
          open={open}
          header={"Alerta!"}
          cancelButton={"Cancelar"}
          confirmButton={"Confirmar"}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }
}

export default BotonConfirmarInscriptes