import React from "react";
import { Button, Modal, Dropdown } from "semantic-ui-react";
import Axios from "axios";
function ModalCambioEstado(props) {
	const [open, setOpen] = React.useState(false);
	const opciones = [
		{ key: "1", text: "PreInscripte", value: "PreInscripte" },
		{ key: "3", text: "Abandonade", value: "Abandonade" },
		{ key: "5", text: "Egresade", value: "Egresade" }
	];
	const [opcionSeleccionada, setOpcionSeleccionada] = React.useState(
		opciones[2].value
	);
	const handleChange = (e, { value }) => setOpcionSeleccionada(value);
	const prepararDatos = () => {
		let estadoACambiar;
		let estudiantes = [];
		switch (opcionSeleccionada) {
			case "PreInscripte":
				estadoACambiar = 1;
				break;
			case "Abandonade":
				estadoACambiar = 3;
				break;
			case "Egresade":
				estadoACambiar = 5;
				break;
			default:
				estadoACambiar = 2;
				break;
		}
		props.alumnes.map((alumne) => {
			return estudiantes.push(alumne.estudiante);
		});
		const datos = JSON.stringify({
			estudiates: estudiantes,
			estado: estadoACambiar
		});
		return datos;
	};
	const cambiarEstado = () => {
		const API_URL = process.env.REACT_APP_API_URL;
		console.log(prepararDatos());
		// Axios.post({
		// 	method: "post",
		// 	url: `${API_URL}/estudiantes/cambiarEstadoAlumnes/`,
		// 	headers: { "Content-Type": "application/json" },
		// 	data: prepararDatos()
		// }).then((response) => {
		// 	console.log(response.data);
		// })
		var headers = {
			"Content-Type": "application/json"
		};
		Axios.post(
			`${API_URL}/estudiantes/cambiarEstadoAlumnes/`,
			prepararDatos(),
			{ headers: headers }
		).then((response) => {
			console.log("reactNativeDemo", "response get details:" + response.data);
		});
	};
	return (
		<Modal
			size="tiny"
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={<Button>Cambiar Estado</Button>}
		>
			{console.log(opcionSeleccionada)}
			{console.log(props.alumnes)}
			<Modal.Header>Cambio de Estado</Modal.Header>
			<Modal.Content style={{ textAlign: "center" }}>
				<Modal.Description>
					<Dropdown
						onChange={handleChange}
						options={opciones}
						placeholder="Elija una opcion"
						selection
						value={opcionSeleccionada}
					/>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={() => setOpen(false)}>Cancel</Button>
				<Button
					content="Confirmar Cambio"
					labelPosition="right"
					icon="checkmark"
					positive
					onClick={() => cambiarEstado()}
				/>
			</Modal.Actions>
		</Modal>
	);
}

export default ModalCambioEstado;
