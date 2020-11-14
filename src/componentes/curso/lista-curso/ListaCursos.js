
import React, { Component } from 'react';
import '../../../estilos/Tabla.css';
import { Table } from "semantic-ui-react";

export default class ListaCursos extends Component{
  
  constructor(props){
    super(props);
    
    };
  

  obtenerCursos() {
    
  }

  render() {
    return(
    	
    	<div className="tabla">
    		<p className="titulo">Cursos del Período: 2021 - C1 - Testing Funcional</p>
    		<div className="linea"></div>

    		<Table celled className="tarjeta-tabla">
	            <Table.Header>
	              <Table.Row >
	                <Table.HeaderCell className="cabeceras-tabla">Nombre</Table.HeaderCell>
	                <Table.HeaderCell className="cabeceras-tabla">Empresa</Table.HeaderCell>
	                <Table.HeaderCell className="cabeceras-tabla">Turno</Table.HeaderCell>
	                <Table.HeaderCell className="cabeceras-tabla">Horario</Table.HeaderCell>
	                <Table.HeaderCell className="cabeceras-tabla">Acción</Table.HeaderCell>
	              </Table.Row>
	            </Table.Header>

	            <Table.Body>
	              
	            </Table.Body>

	            <Table.Footer>
	              
	            </Table.Footer>

        </Table>
          
    	</div>
      
    );
  }
}