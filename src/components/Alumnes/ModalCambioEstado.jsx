import React from 'react'
import { Button, Header, Modal, Dropdown } from 'semantic-ui-react'

function ModalCambioEstado() {
  const [open, setOpen] = React.useState(false)
  const [opcionSeleccionada, setOpcionSeleccionada] = React.useState({estadoId: 5,
  nombre: "Egresade"})
  
  const stateOptions = [
  { key: '1', text: 'PreInscripte', value: 'PreInscripte' },
  { key: '3', text: 'Abandonade', value: 'Abandonade' },
  { key: '5', text: 'Egresade', value: 'Egresade' }
]
  
  function opcionSeleccionado(option){
    setOpcionSeleccionada({
        estadoId: stateOptions.key,
        nombre: stateOptions.value
    })
  }

  
  return (
    <Modal
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Cambiar Estado</Button>}
    >
    {console.log(opcionSeleccionada)}
      <Modal.Header>Cambio de Estado</Modal.Header>
      <Modal.Content style={{textAlign:"center"}}>
        <Modal.Description>
        <Dropdown          
          text={opcionSeleccionada.value} 
          placeholder= 'Seleccionar curso'
          defaultValue={stateOptions[1].value}
        >
        <Dropdown.Menu defaultValue="Egresade">
          {stateOptions.map((option) => (
            <Dropdown.Item 
            key={option.key}
            value={option.value}
            text={option.text}
            {... option}
            onClick={() => this.opcionSeleccionado(option)}
            />
          ))}
        </Dropdown.Menu>
        </Dropdown>
        
        
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Confirmar Cambio"
          labelPosition='right'
          icon='checkmark'
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default ModalCambioEstado

