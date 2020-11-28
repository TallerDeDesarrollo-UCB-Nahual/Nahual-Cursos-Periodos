import React, { Component, Fragment } from "react";
import { Button, Image, Modal, Grid, Segment, Loader, Dimmer, Icon, Input } from 'semantic-ui-react';
import axios from 'axios';
import styles from "../styles.module.css";

export class EditarSede extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            nombreSede: props.nombre,
            nodoId: props.nodoId,
            nodoNombre: props.nodoNombre,
            id: this.props.id
        };
        console.log(props);
    }

    abrirModal(estado) {
        this.setState({
            open: estado
        });
    }

    enCambio = (event) => {
        let valor = event.target.value;
        this.setState({ nombreSede: valor });
    }

    enConfirmacion() {
        if (this.state.nombreSede === "") {
            alert("Los datos no pueden viajar vacios!");
        } else {
            console.log(this.state);
            const API_URL = `http://localhost:8000/api/nodos`;
            var sede = { nombre: this.state.nombreSede, NodoId: this.state.nodoId }
            axios.put(`${API_URL}/sedes/${this.state.id}`, sede)
                .then(function (respuesta) {
                    this.setState({ open: false });
                    window.location.reload(false);
                }.bind(this))
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

    componentDidMount() {
        // obtenerSede().then(response => response.json()).then(response => {
        //     var datos = response.response;
        //     this.setState({ open: false, nodos: datos })
        // });
    }

    render() {
        return (
            <>
                {/* <Button onClick={this.abrirModal}>
                    <Icon color='olive' name='edit' />
                </Button> */}

                <Modal
                    open={this.state.open}
                    onClose={() => this.abrirModal(false)}
                    onOpen={() => this.abrirModal(true)}
                    size="mini"
                    closeIcon
                    trigger={
                        <Button color='green' className={styles.botonBasurero}>
                            <Icon color='olive' name='edit' />
                        </Button>
                    }
                >
                    {
                        this.state.nombreSede ?
                            <Fragment>
                                <Modal.Header>
                                    <Grid>
                                        <Grid.Column>
                                            <h2>Editar Sede</h2>
                                        </Grid.Column>
                                    </Grid>
                                </Modal.Header>

                                <Modal.Content>
                                    <Grid>
                                        <Grid.Column width={4}>
                                            <h3 style={{ margin: "10px 0 0 0" }}>Nodo</h3>
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            <Input
                                                disabled
                                                type="text"
                                                name="nodo"
                                                value={this.state.nodoNombre}
                                                validators={['required']}
                                                errorMessages={['Este campo es requerido']}
                                                disabled
                                            />
                                        </Grid.Column>
                                    </Grid>
                                    <Grid>
                                        <Grid.Column width={4}>
                                            <h3 style={{ margin: "10px 0 0 0" }}>Sede</h3>
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            <Input
                                                type="text"
                                                name="nodo"
                                                value={this.state.nombreSede}
                                                onChange={this.enCambio}
                                            />
                                        </Grid.Column>
                                    </Grid>
                                </Modal.Content>
                            </Fragment>
                            : <Segment>
                                <Dimmer active inverted>
                                    <Loader inverted>Cargando...</Loader>
                                </Dimmer>
                                <Image src='https://react.semantic-ui.com/imagenes/wireframe/short-paragraph.png' />
                            </Segment>
                    }
                    <Modal.Actions>
                        <Button color="green" onClick={() => this.enConfirmacion()}>
                            Editar
          </Button>
                        <Button color="red" onClick={() => this.abrirModal(false)}>
                            Cerrar
        </Button>
                    </Modal.Actions>
                </Modal>

            </>




        )
    }
}

export default EditarSede;

