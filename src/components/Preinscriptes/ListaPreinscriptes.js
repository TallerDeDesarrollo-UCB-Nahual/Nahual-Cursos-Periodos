import Axios from 'axios';
import React, { Component } from 'react';
import {Button, Container, Dimmer, Dropdown, Header, Icon, Loader, Message, Table} from "semantic-ui-react";
import iconoPreinscripte from '../../assets/reading-book.png';
import GenericModal from '../Modal/GenericModal';
import ElegirCurso from './ElegirCurso';
import Preinscripte from './Preinscripte';
import BASE_ROUTE from "../../servicios/rutas";
import Exportar from './Exportar';


class ListaPreinscriptes extends Component {

    headers = ['Nombre Completo','Zona','Información'];
    URL_Preinscriptes = `${process.env.REACT_APP_API_URL}/estudiantes/DTO?estadoId=1`;
    URL_Periodos = `${process.env.REACT_APP_API_URL}/periodos?estado=true`;
    URL_Cursos = `${process.env.REACT_APP_API_URL}/cursos`;

    constructor(){
        super();
        this.state = {  
            abierto: false,
            preInscriptes: Array(0),
            preinscriptesSeleccionados: Array(0),
            periodos: [],
            periodoSeleccionado: {
                id: null,
            },
            cursos: [],
            estaCargando: false,
            mensaje: '',
            deshabilitar:true
        }
    }

    async obtenerPeriodos(){
        let periodosList = Array(0);
        try {
            let res = await Axios.get(this.URL_Periodos);
            periodosList = res.data.response.map(periodo => {
                return {
                    key: periodo.id,
                    value: periodo.id,
                    text: periodo.anio + ' - ' + periodo.periodo + ' - ' + periodo.topico.nombre
                };
            });
            this.setState({ periodoSeleccionado: { id: periodosList[0].value }, periodos: periodosList });
            return periodosList[0].text;
        } catch (error) {
            throw error;
        }
       
    }

    async obtenerPreinscriptes(modulo) {
        try {
            var res = await Axios.get(this.URL_Preinscriptes+`&modulo=${modulo}`);
            this.setState({ preInscriptes: res.data.response, estaCargando: false });
        } catch (error) {
            throw error;
        }
    }

    async cargarDatos(){
        this.setState({ estaCargando: true });
        try {
            var primerModulo = await this.obtenerPeriodos();
            await this.obtenerPreinscriptes(primerModulo);
        } catch (error) {
            console.log(error);
            this.setState({ estaCargando: false, mensaje: "Oops..algo malo pasó" });
        }
        
    }

    componentDidMount(){
        this.cargarDatos();
    }

    componentDidUpdate(prevProps,prevState){
        if (prevState.preinscriptesSeleccionados !== this.state.preinscriptesSeleccionados) {
            this.validarPreinscriptes();
        }
    }

    obtenerPreinscripte(preinscripte){
        return(
            <GenericModal 
                trigger={<Button circular basic color="green" icon><Icon color="black" name="eye"></Icon></Button>}
            >
                <Preinscripte preinscripte={preinscripte} />
            </GenericModal>
        );
    }

    seleccionarPreinscripte(preinscripte,event){
        if (event.target.checked) {
            this.setState({
              preinscriptesSeleccionados: this.state.preinscriptesSeleccionados.concat(
                preinscripte
              )
            });
          } else {
            this.state.preinscriptesSeleccionados.map(() => {
              return this.setState({
                  preinscriptesSeleccionados: this.state.preinscriptesSeleccionados.filter(
                  (e) => e.id !== preinscripte.id
                )
              });
            });
        }
    }

    seleccionarTodosPreinscriptes(event){
        this.cambiarEstadoCheckBoxes(event.target.checked);
        if(event.target.checked){
            this.setState({ preinscriptesSeleccionados: this.state.preInscriptes });
        }
        else{
            this.setState({ preinscriptesSeleccionados: Array(0) });
        }
    }

    cambiarEstadoCheckBoxes(estado){
        var checkboxes = Array.from(document.getElementsByName("checkBox"));
        checkboxes.map((checkbox) => checkbox.checked=estado);
    }

    cambiarPeriodo(periodoId){
        this.setState({ periodoSeleccionado: { id: periodoId }, estaCargando: true });
        const modulo = this.state.periodos.find(periodo => periodo.value === periodoId).text;
        this.obtenerPreinscriptes(modulo);
    }

    mostrarMensaje(){
        if(this.state.mensaje === "" && this.state.preInscriptes.length === 0){
            this.setState({ mensaje: `Actualmente no existen personas registradas en este curso.` });
        }
        return(
            this.state.preInscriptes.length === 0 &&
            <Message
            icon="warning sign"
            warning
            header={this.state.mensaje}
            content={`Intenta mas tarde.`}
            />
        );
    }

    async conseguirCursos(PeriodoId){
        let cursos = [];
        try {
            const res = await Axios.get(this.URL_Cursos+`?PeriodoId=${PeriodoId}`);
            cursos = res.data.response.map(curso => {
                return {
                    key: curso.id,
                    value: curso.id,
                    text: `${curso.nodo.nombre} - ${curso.sede.nombre} - ${curso.profesores} ; ${curso.horario}`
                }
            });
        } catch (error) {
            console.log(error);
            this.setState({ estaCargando: false, mensaje: "Oops..algo malo pasó" });
        }
        this.setState({ cursos });
    }

    handleChange = (e, { value }) => this.cambiarPeriodo(value);

    validarPreinscriptes(){
        if(this.state.preinscriptesSeleccionados.length===0){
            this.setState({deshabilitar:true});
        }else{
            this.setState({deshabilitar:false});
        }
    }

    render(){
        const preinscripteFilas = this.state.preInscriptes.map((preinscripte)=>
        <Table.Row key={preinscripte.id}>
            <Table.Cell textAlign='center' >
                <input
                    type="checkbox"
                    name="checkBox"
                    id={preinscripte.id}
                    style={{ transform: "scale(1.4)" }}
                    onClick={(e) => this.seleccionarPreinscripte(preinscripte,e)}
                />
            </Table.Cell>
            <Table.Cell>{ `${preinscripte.nombre}  ${preinscripte.apellido}` }</Table.Cell>
            <Table.Cell>{ preinscripte.zona }</Table.Cell>
            <Table.Cell>{ this.obtenerPreinscripte(preinscripte) }</Table.Cell>
        </Table.Row>
    );
        return(
        <Container>
            {this.state.estaCargando &&
                <Dimmer active inverted>
                    <Loader inverted>Cargando</Loader>
                </Dimmer>
            }
            
            <Header center="true" as='h1' image={iconoPreinscripte} textAlign="center" content='Lista de Pre-Inscriptes'/>
            <Container textAlign="center">
            <Dropdown
                selection
                options = { this.state.periodos }
                onChange = { this.handleChange }
                value = { this.state.periodoSeleccionado.id }
            />
            </Container>
            <Table singleLine selectable striped unstackable>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign="center">
                        <input
                            type="checkbox"
                            name="checkBox"
                            onClick={(e) => this.seleccionarTodosPreinscriptes(e)}
                            style={{ transform: "scale(1.4)" }}
                        />
                    </Table.HeaderCell>
                    {this.headers.map((data,index)=>
                        <Table.HeaderCell key={index} >{data}</Table.HeaderCell>
                    )}
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    { preinscripteFilas }
                </Table.Body>

            </Table>
            {this.mostrarMensaje()}
            { this.state.preInscriptes.length > 0 && (
                <>
                <Exportar 
                deseleccionarPreinscriptes={()=>{
                     console.log("rntta");
                     this.setState({ preinscriptesSeleccionados: Array(0) });
                     this.cambiarEstadoCheckBoxes(false);
                 }} 
                 seleccionados={this.state.preinscriptesSeleccionados}/>
                <GenericModal
                 Header ={<Header as='h2'>
                 { "Inscribir en Curso"}
                </Header>}
                 trigger = { <Button disabled={this.state.deshabilitar} color='green' onClick={() => this.conseguirCursos(this.state.periodoSeleccionado.id)} floated='right'>Inscribir</Button>}>
                    <ElegirCurso opciones={ this.state.cursos } preinscrites={ this.state.preinscriptesSeleccionados }></ElegirCurso>
                </GenericModal>
                </>
            ) }
            </Container>
            )
        }
}

export default ListaPreinscriptes;