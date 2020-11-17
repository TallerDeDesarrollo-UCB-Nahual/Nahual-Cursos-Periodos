import React from 'react'
import LogoNahual from '../../assets/logo-proyecto-nahual.webp'
import { Button, Modal, Image, Grid } from 'semantic-ui-react'

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
                <Image src={LogoNahual} size='small' />
              </Modal.Header>
              <Modal.Content scrolling>
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
