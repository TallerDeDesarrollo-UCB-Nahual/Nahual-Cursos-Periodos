import React from "react";
import DetalleDeAlumne from "./DetalleDeAlumne/DetalleDeAlumne";
import EditarAlumne from "./EditarAlumne";
import { Link } from 'react-router-dom';
import { Label, Button, Message, Table, Search, Dropdown } from 'semantic-ui-react'

function Alumne(props) {
  function PrimeraLetraEnMayuscula(nombreCompleto) {
    return nombreCompleto.replace(/\b\w/g, l => l.toUpperCase());
  }
  
  function seleccionarUnAlumne(alumne){
    let checkboxes = Array.from(document.getElementsByName("checkbox"));
    const estudiante={
      estudiante:alumne
    }
    props.seleccionarAlumne(estudiante, checkboxes[props.numeracion].checked);
  }  

  return (
    <Table.Row>
      <Table.Cell style={{ textAlign: "center" }}>
        <input
          type="checkbox"
          name="checkbox"
          style={{ transform: "scale(1.4)" }}
          onClick={()=>seleccionarUnAlumne(props.item)}
        />
      </Table.Cell>
      <Table.Cell>
        {PrimeraLetraEnMayuscula(props.item.nombre+" "+props.item.apellido)}
      </Table.Cell>
      <Table.Cell textAlign='center'>
				<DetalleDeAlumne id={props.item.id} filtrarAlumne={(id)=> props.filtrarAlumne(id)} ></DetalleDeAlumne>
			</Table.Cell>
      <Table.Cell textAlign='center'>
      {<Link to={`/alumne/${props.item.id}`}><Button className="view-button">
                      <i className="edit icon"></i>
                      <label className="icon-text">Editar</label>
                    </Button></Link>
                    }
			</Table.Cell>
    </Table.Row>
  );
}

export default Alumne;
