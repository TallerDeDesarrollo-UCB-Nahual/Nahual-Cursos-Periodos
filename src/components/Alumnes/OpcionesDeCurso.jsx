import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import Axios from "axios";

class OpcionesDeCurso extends Component{
  constructor (props){
    super(props)
		this.state = {
      valor: '',
      opcionesDeCurso: [],
      textoDropdown:''
    };
  }

  componentDidMount() {
    this.obtenerCursos();
  }

  obtenerCursos(){
    const API_URL = process.env.REACT_APP_API_URL;
    Axios.get(`${API_URL}/cursos`)
      .then((respuesta) => {
        this.agregarOpcionesDeFiltrado(respuesta.data.response);
        this.props.cuandoCambiaElCurso(respuesta.data.response[0].id);
        this.setState({
          //textoMenu:respuesta.data.response[0].nodo.nombre +" - "+respuesta.data.response[0].sede.nombre + " - " + respuesta.data.response[0].profesores + " - " + respuesta.data.response[0].horario
          textoMenu:respuesta.data.response[0].nodo.nombre +" - " + respuesta.data.response[0].profesores + " - " + respuesta.data.response[0].horario
        });
      })
      .catch(() => {
        alert("Error en la base de datos.");
      });
  }

  agregarOpcionesDeFiltrado(respuesta) {
    const opcionesDeCurso = [];
    respuesta.forEach(opcionDeCurso => {
      opcionDeCurso = {
        key: opcionDeCurso.id,
        //text: opcionDeCurso.nodo.nombre + " - "+opcionDeCurso.sede.nombre + " - " + opcionDeCurso.profesores + " - " + opcionDeCurso.horario,
        text: opcionDeCurso.nodo.nombre  + " - " + opcionDeCurso.profesores + " - " + opcionDeCurso.horario,
        value: opcionDeCurso.id,
      }
      opcionesDeCurso.push(opcionDeCurso);
    });
    this.setState({opcionesDeCurso:opcionesDeCurso})
  }
  
  manejarEvento(opcionSeleccionada){
    this.setState({
       valor: opcionSeleccionada.key,
       textoMenu: opcionSeleccionada.text
      });
    this.props.cuandoCambiaElCurso(opcionSeleccionada.key);
  }  

  opcionesDeFiltro(){
     return (
      <Dropdown.Menu >
        {this.state.opcionesDeCurso.map((opcionSeleccionada) => (
          <Dropdown.Item 
            active={opcionSeleccionada.value === this.state.valor}
            key={opcionSeleccionada.key}
            value={opcionSeleccionada.value}
            text={opcionSeleccionada.text}
            {... opcionSeleccionada}
            onClick={() => this.manejarEvento(opcionSeleccionada)}
          />
        ))}
      </Dropdown.Menu>
      )
  }

  render(){
    return  (
     <span>
        Curso: {' '}
        <Dropdown
          inline
          compact
          text={this.state.textoMenu} 
          pointing='left' 
          className='link item'
          placeholder= 'Seleccionar curso'
        >
          {this.opcionesDeFiltro()}
        </Dropdown>
      </span> 
    );
  }
}

export default OpcionesDeCurso;