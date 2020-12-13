import React from 'react'
import LogoNahual from '../../assets/logo-proyecto-nahual.webp'
import { Button, Modal, Image, Grid } from 'semantic-ui-react'

import "./modal.css"

const GenericModal = (props) => {

  const [abierto, mostrarModal] = React.useState(false)


  return (
        <Modal
          open={abierto}
          onClose={() => mostrarModal(false)}
          onOpen={() =>mostrarModal(true)}
          size="small"
          closeIcon
          trigger={props.trigger}
          >
              <Modal.Header>
                <Image style={{display:"inline-block"}} inline src={LogoNahual} size='small' />
               <span class="headerModal"> {props.Header}</span> 
              </Modal.Header>
              <Modal.Content>
                <Grid divided='vertically' centered>
                  {props.children}
                </Grid>
              </Modal.Content>
              <Modal.Actions>
                <Button basic color="grey" onClick={() => mostrarModal(false)} >
                  Cerrar
                </Button>
              </Modal.Actions> 
      </Modal>)
}

export default GenericModal;
