import React from "react";
import { Button, Table } from "semantic-ui-react";
import DetalleDeAlumne from "./DetalleDeAlumne/DetalleDeAlumne";
import { Link } from 'react-router-dom';
import Eliminar from './eliminaAlumne/Eliminar';
import EditarAlumne from './EditarAlumne';
import { Label, Message, Search, Dropdown } from 'semantic-ui-react'


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
      <EditarAlumne  id={props.item.id}  nombre={props.item.nombre} apellido={props.item.apellido}
                    celular={props.item.celular}> </EditarAlumne>
      <Eliminar  alumneId={props.item.id} curseId={props.cursoId} ></Eliminar>
			</Table.Cell>
    </Table.Row>
  );
}

export default Alumne;
