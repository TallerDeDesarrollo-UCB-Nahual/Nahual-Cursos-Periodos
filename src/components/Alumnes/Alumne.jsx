import React from "react";
import { Table } from "semantic-ui-react";

function Alumne(props) {
	function PrimeraLetraEnMayuscula(str) {
		return str.replace(/\b\w/g, (l) => l.toUpperCase());
	}

	return (
		<Table.Row >
			<Table.Cell>{PrimeraLetraEnMayuscula(props.item.nombreCompleto)}</Table.Cell>
		</Table.Row>
	);
}

export default Alumne;
