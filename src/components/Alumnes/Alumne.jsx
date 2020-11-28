import React from "react";
import { Table } from "semantic-ui-react";

function Alumne(props) {
  function PrimeraLetraEnMayuscula(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase());
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
        {PrimeraLetraEnMayuscula(props.item.nombreCompleto)}
      </Table.Cell>
    </Table.Row>
  );
}

export default Alumne;
