import React from "react";
import { Table } from "semantic-ui-react";

function Alumne(props) {
	function PrimeraLetraEnMayuscula(palabras) {
		return palabras.replace(/\b\w/g, (l) => l.toUpperCase());
	}

	return (
		<Table.Row >
			<Table.Cell>{PrimeraLetraEnMayuscula(props.item.nombre+props.item.apellido)}</Table.Cell>
		</Table.Row>
	);
}

export default Alumne;
