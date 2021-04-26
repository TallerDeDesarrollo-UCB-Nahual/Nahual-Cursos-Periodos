import React from 'react'
import { Button, Modal} from 'semantic-ui-react';
import axios from 'axios';
const URL_Inscriptos = `${process.env.REACT_APP_API_URL}/inscriptos/`;
class BotonConfirmarInscriptes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmacion:this.props.callback,
      active: true,
      inscriptes:this.props.inscriptes,
      curso:this.props.cursoActual
    }
    console.log(this.props.cursoActual);
  }

  onCloseModal(estado) {
    this.setState({
      open: estado
    });
  }
  onSubmit = async (onRegistrarCorrectamente) =>{
    let curso = this.props.cursoActual;
    let lista = this.state.inscriptes;
    let listaNueva = [];
    console.log(lista);

    const API_URL = `${process.env.REACT_APP_API_URL}/cursos/${curso}/inscriptes`;
    await
    axios
      .get(`${API_URL}`)
      .then(response => {
        listaNueva = response.data.response;
        listaNueva.forEach(inscripte => {
          axios
          .delete(`${process.env.REACT_APP_API_URL}/estudiantes/${inscripte.estudiante.id}?curseId=${curso}`)
       })
      })
      .catch(function (error) {
        console.log(error);
      });
    lista.forEach(inscripte => {
      var nuevoInscripte = {
        "estudianteId": inscripte.id,
        "cursoId": curso
      }
      fetch(`${URL_Inscriptos}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': JSON.stringify(nuevoInscripte).length.toString()
        },
        body: JSON.stringify(nuevoInscripte)
      })
    });
    this.onCloseModal(false)
    // window.location.href = window.location.href;
  }

  render() {
    return (
      <div>
        <Modal
          onClose={() => this.onCloseModal(false)}
          onOpen={() => this.onCloseModal(true)}
          open={this.state.open}
          trigger={<Button className="confirmButton">Confirmar</Button>}
        >
          <Modal.Header>Alerta!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>
                Esta seguro que desea subir un nuevo csv, se eliminara los alumnes incritos actuales.
			  </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button className="cancelButton" onClick={() => this.onCloseModal(false)}>
              Cancelar
			</Button>
            <Button className="confirmButton"
              content="Confimar"
              labelPosition='right'
              onClick={() => this.onSubmit()}
              positive
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}


// const URL_Inscriptos = `${process.env.REACT_APP_API_URL}/inscriptos/`;
// async function onSubmit(onRegistrarCorrectamente){
//     // let curso = 1;
//     // let lista = this.state.inscriptes;
//     // let listaNueva = [];
//     // const API_URL = `${process.env.REACT_APP_API_URL}/cursos/${curso}/inscriptes`;
//     // await
//     // axios
//     //   .get(`${API_URL}`)
//     //   .then(response => {
//     //     listaNueva = response.data.response;
//     //     listaNueva.forEach(inscripte => {
//     //       axios
//     //       .delete(`${process.env.REACT_APP_API_URL}/estudiantes/${inscripte.estudiante.id}?curseId=${curso}`)
//     //    })
//     //   })
//     //   .catch(function (error) {
//     //     console.log(error);
//     //   });
//     // lista.forEach(inscripte => {
//     //   var nuevoInscripte = {
//     //     "estudianteId": inscripte.id,
//     //     "cursoId": curso
//     //   }
//     //   fetch(`${URL_Inscriptos}`, {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //       'Content-Length': JSON.stringify(nuevoInscripte).length.toString()
//     //     },
//     //     body: JSON.stringify(nuevoInscripte)
//     //   })
//     // });
//     // this.setOpen(false);
// }

// function ModalExampleShorthand() {
// 	const [open, setOpen] = React.useState(false)
// 	return (
// 		<Modal
// 		  onClose={() => setOpen(false)}
// 		  onOpen={() => setOpen(true)}
// 		  open={open}
// 		  trigger={<Button className="confirmButton">Confirmar</Button>}
// 		>
// 		  <Modal.Header>Alerta!</Modal.Header>
// 		  <Modal.Content>
// 			<Modal.Description>
// 			  <p>
// 				Esta seguro que desea subir un nuevo csv, se eliminara los alumnes incritos actuales.
// 			  </p>
// 			</Modal.Description>
// 		  </Modal.Content>
// 		  <Modal.Actions>
// 			<Button className="cancelButton" onClick={() => setOpen(false)}>
// 			  Cancelar
// 			</Button>
// 			<Button className="confirmButton"
// 			  content="Confimar"
// 			  labelPosition='right'
// 			  onClick= {onSubmit()}
// 			  positive
// 			/>
// 		  </Modal.Actions>
// 		</Modal>
// 	  )
// 	}

export default BotonConfirmarInscriptes